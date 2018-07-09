# ng-state
RxJS and ImmutableJs powered nested state management for Angular 2 applications inspired by [ @ngrx/store](https://github.com/ngrx/store).

[![npm version](https://badge.fury.io/js/ng-state.svg)](https://badge.fury.io/js/ng-state)

# Table of Contents
1. [Introduction](#introduction)
2. [Main differences](#differences)
3. [Installation](#installation)
4. [Examples](#examples)
5. [Main idea](#main-idea)
6. [Configuration](#configuration)
7. [ngOnChanges hook](#ngOnChanges)
8. [InjectStore decorator](#inject-store)
9. [Wiring things together](#together)
10. [Subscribe stright to store](#subscribe-to-store)
11. [When item details on different page](#details-on-different-page)
12. [Dispatcher](#dispatcher)
13. [Debuging](#debugging)
14. [IsProd](#isprod)
15. [Server Side Rendering and TransferState](#ssr)
16. [Time travel](#time-travel)
17. [Flow diagram](#flow)
18. [Testing](#testing)
19. [Contributing](#contributing)

## Introduction
<a name="introduction"></a>

ng-state is a controlled nested state container designed to help write performant, consistent applications
on top of Angular 2. Core tenets:
- State is a single immutable data structure
- Each component gets its own peace of nested state
- State accessed with ```actions``` variable under component or the `Store`, an observable of state and an observer of global state

These core principles enable building components that can use the `OnPush` change detection strategy
giving you [intelligent, performant change detection](http://blog.thoughtram.io/angular/2016/02/22/angular-2-change-detection-explained.html#smarter-change-detection)
throughout your application.

## Main differences from other RxJs store based state managements solutions
<a name="differences"></a>

- Developers do not need to rememebr long nested paths to access store
- Decoples / Hides paths to state from components
- Uses Redux like pure functions - actions to interact with state
- Less boilerplate

## Installation
<a name="installation"></a>
Install ng-state from npm:
```bash
npm install ng-state --save
```

## Examples
<a name="examples"></a>
- [Official ng-state/example-app](https://github.com/ng-state/example-app) is an officially maintained example application showcasing possibilities of @ng-state


## Main idea
<a name="main-idea"></a>
In order to work with peace of state, current state path (statePath) and current lits item index (stateIndex) is passed down to child components and are received in state actions.
Or absolute pats are set in state actions. (see explanation image at the bottom)

## Configuration
<a name="configuration"></a>
In your app's main module, register store with initial state by using `StoreModule.provideStore(initialState)`
( where initialState is simple object ) function to provide it to Angular's injector:

```ts
import { NgModule } from '@angular/core'
import { StoreModule } from 'ng-state';

@NgModule({
  imports: [
    BrowserModule,
    StoreModule.provideStore(initialState)
  ]
})
export class AppModule {}
```

```ts
let initialState = {
  todos: [],
  interpolationTest: 'initial'
};

export { initialState };
```

Then create actions for each component state by decorating class with @InjectStore decorator and HasStore inheritance.
This action will receive only that peace of nested state wich is provided as first parameter.

```ts
import * as Immutable from 'immutable';
import { HasStore, InjectStore } from "../../react-state/decorators/inject-store.decorator";
import { Store } from "../../react-state/store/store";
import { TodoModel } from "./todo.model";

@InjectStore('todos')
export class TodosStateActions extends HasStore<Immutable<List<any>>> {
    addTodo(item: TodoModel) {
        this.store.update(state => {
            state.push(Immutable.fromJS(item));
        })
    }

    deleteTodo(index: number) {
        this.store.update(state => {
            state.delete(index);
        }, false);
    }

    get todos() {
        return this.store.map((state) => {
            return state.toArray();
        });
    }

    /// OR

    get todos() {
      return this.state.toArray();
    }
}
```
<i>To reflect data in component retrieved stright from ```this.state``` you need to pass ```ChengeDetectorRef``` to ```HasStateActions``` class which is extended by components.</i>

<i>Be aware that from version 1.2.5 simple getters that returns Observable are converted to properties to get better performance by reducing calls to functions.</i>


## ngOnChanges hook
<a name="ngOnChanges"></a>
Starting from version 3.2.0 ngOnChanges is not called before actions not initialized (before ngOnInit). This behaviour can be disabled passing `true` as a second param to `ComponentState` decorator.

## InjectStore decorator
<a name="inject-store"></a>

### first parameter is path
- if added between single quotes '' it counts as absolute path
- if added in array [], final path will be merrged with path passed from parent ([statePath]="statePath"):
```['b'] -> ['a', 'b']```
- if state is part of the list, ${stateIndex} param should be passed from the parent component and new path will look like:
```['b', '${stateIndex}'] -> ['a', 'b', 0]```
- stateIndex param can be used in absolute path as well: ```'a/b/${statePath}' -> ['a', 'b', 0]```
- stateIndex can be an array of indexes so state path can have multiple ${stateIndex}: ```['${stateIndex}', 'some_other_path', '${stateIndex}']```
- there can be usecases when actions can be shared because of identical states keeping in different locations. In this case there can be anonymus function passed as a first parameter:


```ts
@InjectStore((currentPath: string[]) => {
    return currentPath.indexOf('search') >= 0
        ? ['entities', '${stateIndex}']
        : ['${stateIndex}'];
})
```

### second parameter is initial state:
this is optional parameter and can add default state for that path
```ts
export const FooInitialState = {
    loading: false,
    entities: [],
};
```

## Wiring things together
<a name="together"></a>

Now you can inject state actions by marking component with @ComponentState decorator and inheriting from IComponentState interface.
Notice that statePath and stateIndex parameters are passed from ```todos``` to ```todo-description``` in order to use relative path in ```todo-description``` state actions.

```ts
@ComponentState(TodosStateActions)
@Component({
  selector: 'todos',
  templateUrl: './todos.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosComponent extends HasStateActions<TodosStateActions> {
  constructor(cd: ChangeDetectorRef){
    super(cd)
  }
  // actions available here
}
```

```html
<tr *ngFor="let todo of actions.todos | async; let i = index;">
  <th scope="row">{{ i + 1 }}</th>
  <td>{{ todo.name }}</td>
  <td>
    <todo-description [statePath]="statePath" [stateIndex]="i"></todo-description>
  </td>
  <td><button (click)="deleteItem(i)">X</button></td>
</tr>
```

statePath and stateIndex properties are created in decorator and injected into Angular component to avoid boilerplate @Input's.

@ComponentState may take state actions object or anonymous function to select an object for creating instance:
```ts
@ComponentState(TodosStateActions)

OR

@ComponentState((component: TodosComponent) => {
  return component.isFromCollection
    ? A_StateActions
    : B_StateActions;
})
```

You can also inject the `Store` service into your components and services. Use `store.select` to
_select_ slice(s) of state:

```ts
import { Store } from 'ng-state';

interface AppState {
  counter: number;
}

@Component({
  selector: 'my-app',
  template: `
    <div>todos: {{ (todos | async)?.getIn([0]) }}</div>
  `
})
class MyAppComponent {
  todos: Observable<number>;

  constructor(private store: Store<AppState>){
    this.todos = store.select(['todos']);
  }
}
```

## Subscribe stright to store
<a name="subscribe-to-store"></a>
also you can avoid having async pipe by subscribing to state change. But then you will be responsible for subscription management. Hence it is recommended to leave this for Angular.

```ts
@Component({
  selector: 'my-app',
  template: `
    <div>todos: {{ todos.getIn([0]) }}</div>
  `
})
class MyAppComponent {
  todos: Observable<number>;
  counterSubscription: Rx.Subscription;

  constructor(private store: Store<AppState>) implements OnDestroy {
    this.counterSubscription = store.select(['todos'])
      .subscribe(state => {
        this.todos = state;
      });
  }

  ngOnDestroy(){
    this.counterSubscription.unsubscribe();
  }
}
```

## When item details on different page
<a name="details-on-different-page"></a>

There can be situation when list item is on page and its details on another. So question is how to deal with ```stateIndex```. For this case you can pass list item index along with url params
```html
<a href="#" [routerLink]="['/dictionaries', i]" class="card-link">Go To Values</a>
```
and on target component catch it and assign to stateIndex
```ts
constructor(private route: ActivatedRoute, private router: Router) {
    super();
    this.route.params.subscribe((params: Params) => {
      this.stateIndex = params.id;
    });
  }
```
and it will be passed to actions automatically.

## Dispatcher
<a name="dispatcher"></a>

There are cases when states of not related components, which has different places in state tree, should change e.g: when list item is selected filter should collapse. This is where dispatcher kicks in. Dispatcher is design to send and receive messages between components.

```ts
/* Child A */
export class UpdateMessage extends Message {
  constructor(payload?: any) {
    super('MessageName', payload);
  }
}

dispatcher.subscribe(UpdateMessage, (payload: any) => {
  this.actions.update....
});

/* Child B */
dispatcher.publish(new UpdateMessage('payload'));
```

Or, by using overload, even more simpler
```ts
/* Child A */
dispatcher.subscribe('UPDATE_MESSAGE', (payload: any) => {
  this.actions.update....
});

/* Child B */
dispatcher.publish('UPDATE_MESSAGE', 'payload');
```

## Debuging
<a name="debugging"></a>
It is easy to debug latest state changes. Just write in console ```window.state.startDebugging()``` and latest state will be printed in console each time it changes. Usually developers need to debug some deeply nested state and it is anoying to enter path each time. For this reason you can pass state path to ```window.state.startDebugging(['todos', 0])``` and only changes of this peace will be reflected.

To stop debug mode simply call ```window.state.stopDebugging()```

Another way to debug is to add third parameter ```true``` on you InjectStore decorator. Console will start to show component state that uses those actions.

## Production
<a name="isprod"></a>
From version 2.6 boolean flag can be passed to StoreModule.forRoot method. When production is enabled:
- All manipulations with state from ```window``` object are not allowed
- State is disconnected from ```window``` object
- Warnings are disabled

However for custom manipulations state and its manipulations can be accessed from injected StateHistory service.

## Server Side Rendering and TransferState
<a name="ssr"></a>
In most of cases Angular TransferState HTTP interceptor does the job but sometimes you need to set your state explicitlu when client takes over.
For this situation from version 4.2.0 boolean flag can be passed to StoreModule.forRoot method to restore state from TransferState instead of initialState.
This can be used like this:
Save state on server side in your ```app.module.ts``` like:
```ts
export class AppModule {
    constructor(store: Store<any>, platform: PlatformService, transferState: TransferState) {
        if (!platform.isBrowser) {
            store
            .pipe(
                takeWhile(() => !platform.isBrowser)
            )
            .subscribe(state => {
                transferState.set(makeStateKey<TransferHttpResponse>(TRANSFER_STATE_KEY),  state.toJS());
            });
        }
    }
}
```

and pass ```true``` to StoreModule

```ts
StoreModule.provideStore(initialState, environment.production, true)
```

On app load state that were added in AppModule on server side will be added instead of intiialState

## Time travel
<a name="time-travel"></a>

@ng-state allows you to time travel. To enable this you have to add StateHistoryComponent to your app file

```
<state-history></state-history>
```

and from console run ```window.state.showHistory()```. While you in the time travel mode history is not collected. To exit mode run ```window.state.hideHistory()``` command from the console.
You can also view current state in ```window.state.CURRENT_STATE``` and whole history in ```window.state.HISTORY```. This allows you to debug or write your own time travel component if necessary.

History collecting can be disabled by passing ```false``` to ```StoreModule.provideStore``` second parameter.
By default 100 history steps are stored in memory but it can be modified by passing third parameter to ```StoreModule.provideStore```.

## Flow diagram
<a name="flow"></a>
![flow](/ng-state-flow.png)

## Testing
<a name="testing"></a>
Unit testing is important part of every software. For this reason ng-state has simplified test bed setup. In order to setup unit test you need to make few simple actions

Tell ng-state that actions are going to run in testing mode:
```ts
beforeAll(() => {
    NgStateTestBed.setTestEnvironment();
});
```

actions can be tested by calling ```NgStateTestBed.createActions``` method. `createActions` has required param `actions` and two params with default values: `initialState` with value `{}` and `statePath` with value `[]`. This means that for most of situations we can pass just actions type and test application in localized state. But for more complex scenarios we can pass initial state and path.
```ts
 it('should return actions', () => {
    const initialState = { todos: [] };
    initialState.todos.push({ description: 'test description' });

    const actions = NgStateTestBed.createActions<TestActions>(TestActions); // in this case actions will be created with state = {};
    // OR
    const actions = NgStateTestBed.createActions(TestActions, initialState, ['todos', 0]) as TestActions;
    expect(actions.todoDescription).toEqual('test description');
});
```
where
- first param is ```initialState``` is object or class
- second param is ```statePath``` to bind actions to
- third param is ```actions``` class

In order to test components with actions you need to call ```NgStateTestBed.setActionsToComponent``` method with ```actions``` and instance of ```component```. Same like in example above just add
```ts
component: TodoComponent;

beforeAll(() => {
    NgStateTestBed.setTestEnvironment();
});

beforeEach(() => {
    component = new TodoComponent();
});
```
```ts
...
actions = ...

NgStateTestBed.setActionsToComponent(actions, component);

expect(component.actions.todoDescription).toEqual('test description');
```

that simple :)


## Contributing
<a name="contributing"></a>
Please read [contributing guidelines here](https://github.com/ng-state/store/blob/master/CONTRIBUTING.md).
