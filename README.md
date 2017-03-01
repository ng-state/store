# ng-state
RxJS and ImmutableJs powered nested state management for Angular 2 applications inspired by @ngrx/store.

[![npm version](https://badge.fury.io/js/ng-state.svg)](https://badge.fury.io/js/ng-state)

ng-state is a controlled nested state container designed to help write performant, consistent applications
on top of Angular 2. Core tenets:
- State is a single immutable data structure
- Each component gets its own peace of nested state
- State accessed with state variable under component or the `Store`, an observable of state and an observer of global state

These core principles enable building components that can use the `OnPush` change detection strategy
giving you [intelligent, performant change detection](http://blog.thoughtram.io/angular/2016/02/22/angular-2-change-detection-explained.html#smarter-change-detection)
throughout your application.


### Installation
Install ng-state from npm:
```bash
npm install ng-state --save
```

### Examples
- [Official ng-state/example-app](https://github.com/ng-state/example-app) is an officially maintained example application showcasing possibilities of @ng-state


## Main idea

In order to work with peace of state, current state path (statePath) and current lits item index (stateIndex) is passed down to child components and are received in state actions.
Or absolute pats are set in state actions.

### Configuration

In your app's main module, register store with initial state by using `StoreModule.provideStore(initialState)`
( where initialState is imported function returing plain object ) function to provide them to Angular's injector:

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
export function initialState() {
  return {
    books: {
      collection: []
    },
    layout: {
      showSidenav: false
    }
  };
}
```

Then create actions for each component state by decorating class with @InjectStore decorator and HasStore inheritance.
This action will receive only that peace of nested state wich is provided as first parameter.

```ts
import { BookSearchInitialState } from './book-search.initial.state';
import { InjectStore, HasStore, Store } from 'ng-state';
import * as Immutable from 'immutable';

@InjectStore('books/search', BookSearchInitialState)
export class BooksSearchStateActions implements HasStore {
    store: Store<Immutable.Map<any, any>>;

    get loading() {
        return this.store.map(state => state.get('loading'));
    }

    get books() {
        return this.store.map(state => state.get('entities'));
    }

    getBook(id) {
        return this.books.map(books => books.find(book => book.get('id') === id));
    }

    toggleLoading(isLoading) {
        this.store.update(state => {
            state.set('loading', isLoading);
        });
    }

    clearBooks() {
        this.store.update(state => {
            state.set('entities', Immutable.fromJS([]));
        });
    }
}
```

### InjectStore first parameter is path:
- if added between single quotes '' it counts as absolute path
- if added in array [], final path will be merrged with path passed from parent ([statePath]="statePath"):
```['search'] -> ['books', 'search']```
- if state is part of the list, ${stateIndex} param should be passed from the parent component and new path will look like:
```['collection', '${stateIndex}'] -> ['books', 'collection', 0]```
- stateIndex param can be used in absolute path as well: ```'books/collection/${statePath}' -> ['books', 'collection', 0]```
- stateIndex can be an array of indexes so state path can have multiple ${stateIndex}: ```['${stateIndex}', 'some_other_path', '${stateIndex}']```
- there can be usecases when actions can be shared because of identical states keeping in different locations. In this case there can be anonymus function passed as a first parameter:


```ts
@InjectStore((currentPath: string[]) => {
    return currentPath.indexOf('search') >= 0
        ? ['entities', '${stateIndex}']
        : ['${stateIndex}'];
})
```

### InjectStore second parameter is initial state:
this is optional parameter and can be provided here or in global initial state when StoreModule is initialized
```ts
export const BookSearchInitialState = {
    loading: false,
    entities: [],
};

OR

export function initialState() {
  return {
    books: {
      loading: false,
      entities: [],
      collection: []
    },
    layout: {
      showSidenav: false
    }
  };
}
```

Now you can inject state actions by marking component with @ComponentState decorator and inheriting from IComponentState interface.
Notice that statePath parameter is passed to ```bc-book-prveiw-list``` in order to use relative path in ```bc-book-preview-list``` state actions.

```ts
@ComponentState(CollectionStateActions)
@Component({
  selector: 'bc-collection-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <md-card>
      <md-card-title>My Collection</md-card-title>
    </md-card>
	{{ state.getBooks | async }}
    <bc-book-preview-list [statePath]="statePath" [isFromCollection]="true"></bc-book-preview-list>
  `,
  styles: [`
    md-card-title {
      display: flex;
      justify-content: center;
    }
  `]
})
export class CollectionPageComponent implements IComponentStateActions<CollectionStateActions> {
  state: CollectionStateActions;
}
```

In the same manner stateIndex can be passed when iterating with *ngFor

```ts
 <bc-book-preview
      *ngFor="let book of state.books | async; let i = index;"
      [statePath]="statePath" [stateIndex]="i"
      [isFromCollection]="isFromCollection">
</bc-book-preview>
```
statePath and stateIndex properties are created in decorator and injected into Angular component to avoid boilerplate @Input's.

@ComponentState may take instance of state actions object or anonymous function to select an instance:
```ts
@ComponentState((component: BookPreviewListComponent) => {
  return component.isFromCollection ? CollectionStateActions : BooksSearchStateActions;
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
		<div>Searching: {{ (books | async)?.get('loading') }}</div>
	`
})
class MyAppComponent {
	books: Observable<number>;

	constructor(private store: Store<AppState>){
		this.counter = store.select(['books']);
	}
}
```

@ng-state allows you to time travel. To enable this you have to add StateHistoryComponent to your app file

```
<state-history></state-history>
```

and from console run ```window.state.showHistory()```. While you in the time travel mode history is not collected. To exit mode run ```window.state.hideHistory()``` command from the console.
You can also view current state in ```window.state.CURRENT_STATE``` and whole history in ```window.state.HISTORY```. This allows you to debug or write your own time travel component if necessary.

History collecting can be disabled by passing ```false``` to ```StoreModule.provideStore``` second parameter.
By default 100 history steps are stored in memory but it can be modified by passing third parameter to ```StoreModule.provideStore```.

## Contributing
Please read [contributing guidelines here](https://github.com/ng-state/store/blob/master/CONTRIBUTING.md).
