### 9.7.1
- fixes memory leak when binding form manager multiple times

### 9.7.0
- added possibility to track separate property changes to form manager ```this.actions.store.form.bind(this.form, {emitEvent: true}).onPropertyChange('prop', (currentValue, prevValue) => void)```. This is done to avoid using ```.onChange``` and keep property comparison inside

### immer data strategy 3.3.0
- fixed a bug with .reset() introduced in #3.2.0

### immer data strategy 3.2.0
- is improved allowing to extend parent state with child object. Previously in, in this case, all parent object properties would be lost leaving only child object

### 9.5.0
- Introduced new actions decorator ```WithStore``` in order to follow separation of concerns and to have more cleaner approach

### 9.4.0
- ```createStoreFull``` was introduced. All params are optional meaning that you can still define them in ```InjectStore``` decorator.

### 9.3.1
- bug fix with .restore()

### 9.2.0
- Introduced ```publishMemorized``` and ```listenToMemorized``` in Dispatcher.

### 9.1.2
- Fixed memory leak

### 9.1.0
- Added injectable actions. You can now use any Angular Injectable services in actions 🔥
- Simplified testing

### 9.0.0
- Updated to Angular 18+
- Added signal action ```actions = signalActions(TodoActions);```
- Reduced boilerplate when working with signal actions

### 8.0.0
- Updated to Angular 16+
- Added Signals support
- Migrated to latest (4.3.0) ImmutableJs

### 7.5.0
- Added ```onChangePairwise``` to form bind options to be able to get state pairwise (old one and current one).

### 7.4.0
- Added ```snapshot``` function to store. Now you can do ```const value = store.select(['layout', 'test']).snapshot();``` which will return state value.

### 7.3.0
 - Fixed infinite loop which was caused by setting initial value to form after bind with ```emitEvent: true```
### 7.2.0
- Updated SSR restore functionality
- Improved merging for immer data strategy to create state object if not exists to prevent errors while merging

### 7.0.0
- Updated to Angular 13.3.10
- Updated all libraries like rxjs, immer etc.
### 6.9.3
- Added small fix to not crash when trying to load state from storage which is not available
- Fixed bug with observable notification timing when saving, loading, clearing persistent storage

### 6.9.0
- Fixed bug with dynamic state initialization when setting initial state via ```@InjectStore([], {prop: 'val'})```. Wrong store was returned on second initialization (when returning to component).

### 6.8.12
- Angular version bump
- Added StoreModule as a generic parameter for Ivy compiler

### 6.8.9
- Fixed reset functionlaity
- Fixed immutability issues with immer
- Fixed in-InjectStore decorator initialization

### 6.8.1
- Added window object initialization for platforms that does not have it (nativescript).

### 6.8.0
- Removed `@angular/platform-browser` dependency. No in order to load state from server you need to pass `TransferState` and `makeStateKey` to `restoreFromServerOptions`;

### 6.7.0
- fixed infinite loop with `emitEvent` when using form plugin. This loop was caused by updating forms state manually from code. Keep in mind that if you update state manually forms hooks `shouldUpdateState` and `onChange` will not be triggered.

### 6.6.0
- added `listenTo` method to `Dispatcher`. It returns Observable and can be used with `takeUntil` and other RxJs functions

### 6.5.0
- migrated to Angular 8
- added Ivy support
- added Angular TestBed support
- added optional type(T) notation to `select` operator in order to remove explicite type setting in subscription: `...select<{somestate: string}>(...).subscribe(state => state.somestate...)`
- added immer 5.0.0 as peer dependency

### 6.4.0
- fixed `clear` operator

### 6.3.0

- immutable data stratgey retruned to optional `withMutations` strategy in order fix the bug when working with lists. Only limited amount of operators can be applied when used withMutations. Read more about it on: (immutable documentation)(https://immutable-js.github.io/immutable-js). To use `withMutations` you need to add last argument in `store.update` function like: `this.store.update(...action, {}, { withMutations: true } as ImmutableUpdateActionAdditionalSettings)`. In order to get this fix applied please upgrade `@ng-state/store` and `@ng-state/immutablejs-data-strategy`

### 6.2.0
- made library compatible with any compile targets like es2015...esnext

### 6.1.0
- Added optimistic updates API. Can be accessed via: ```store.optimisticUpdates.```

### 6.0.0
- Intorduced immer support

##### BREAKING CHANGES
- In order to use ng-state now you have to import `@ng-state/store` instead of `ng-state` and immer of immutable strategy module: `ImmerDataStrategyModule` or `ImmutableJsDataStrategyModule`
- Also for test bed you need to place `NgStateTestBed.setTestEnvironment(new ImmerDataStrategy());` to beforeEach and provide immer or immutable data strategy.

### 5.2.2
- Added type to state

### 5.2.0
- Improved information of history items
- Redux DevTools `maxAge` now is set from `storeHistoryItems` property

### 5.1.0
- Simplified code and code test coverage

### 5.0.0
- Added integration with Redux DevTools - [documentation](https://vytautas.gitbook.io/ng-state/debugging/redux-devtools)
- Improved debugging experience

##### BREAKING CHANGES
- Removed clear operator. Instead use immutable operator ```store.update(state => state.clear())```. Previouse functionality of clear operator was moved to ```reset``` to avoid confusion
- Time travel was removed because of integration with Redux DevTools. You do not need to include ```<state-history></state-history>``` to your app.component.ts file.


### 4.4.0
- persist state plugin return observable on `save`, `load`, `removeItem`, `clear` actions.
- `onChange` and `shouldUpdateState` hooks are added to form manager plugin

### 4.3.4
- fixed bug which di dnot allow to set default storage

### 4.3.0
- Added new Reset operator
- Added store.form.bind plugin for binding to reactive forms
- Added ability to store state to external storagies like localStorage or async storagies like IndexDB

### 4.2.2
- Fixed bug with inheritacne.
- Switched to ng build

### 4.2.0
Added transfer state support for Server Side Rendering

### 4.0.0
- Migrated to Angular 6 and RxJs 6.

### 3.3.2
- Added createStore method to NgStateTestBed

### 3.3.0
- Fixed bug with related to AOT. ngOnInit, ngOnDestory and ngOnChanges hooks were not hitted when compiled with AOT during to Angular limitations. This was not an issue with JIT. this issue relates to: https://github.com/Microsoft/vscode/issues/25853

### 3.2.2
- Simplified TestBed. Now `initial state` and `statePath` are optional and has defult values of `{}` and `[]`. More info in Readme.

### 3.2.0
- ngOnChanges is not called before actions not initialized (before ngOnInit). This behaviour can be disabled passing `true` as a second param to `ComponentState` decorator.

### 3.1.1
- Added IS_TEST provider.

### 3.1.0
- Improved constructor ovveride by ovveriding prototype but not instance constructor.

### 3.0.0
- Added ```NgStateTestBed``` for simplified actions and components unit testing.

### 2.7.0
- Upgraded to Angular 5.0.0
- Upgraded RxJs to ^5.5.0
- Upgraded Zone.js to ^0.8.18
- Upgraded immutable-cursor to ^2.0.0
- Upgraded core-js Angular ^2.5.0

### 2.6.1
- AOT fixes

### 2.6.0
- store.clear() added
- disableWarnings renamed to isProd
- when isProd all manipulations with state from ```window``` object are not allowed.
- simplified initial state declaration from function to simple object:
```ts
export const initialState = {
  todos: [],
  interpolationTest: 'initial'
};
```

### 2.5.0
- added posbiity to return state from actions without store ```get todos() { return this.state.get('todos'); }```. Because of this functionality all components that extend ```HasStateActions``` should pass ```ChangeDetecotrRef``` to its constructor. Otherways only store has to be used in actions. State update should be still done through store.update.
- if component extends ```HasStateActions``` but does not have constructor and do not pass ```ChangeDetecotrRef``` warning will be shown in console. To suppress it new variable ```disableWarnings``` was added to ```StoreModule```
- debuging was simplyfied. Added ```startDebugging``` and ```stopDebugging``` methods to window.state. ```startDebugging``` takes optional array parameter ```statePath``` to watch over some state part.
Also additional param ```debug = true / false``` was added to InjectStore decorator. When set to ```true``` console will show state part of the component that uses those actions.
- ```currentState``` getter was added to injectable ```StateHistory``` to avoid using ```window.state.CURRENT_STATE``` in code

### 2.4.0
- added <strong>readonly</strong> ```stateIndex``` to HasStateActions. This is usefull when you want to edit list item on different route for instance and want to pass list index not via params but via route.
- Added readonly ```state``` to actions. Now it is up to developer to use observable store or static state. But since it is readonly ```state.set``` and other update methods will not have any effect.
- Fixed bug compilation error on first startup
- Initial state, that is passed to StoreModule, is not longer a function but simple object

### 2.3.0
- Introduced classes HasStateActions<T> and HasStore<T> to reduce boilerplate in components and actions. There is no more need to introduce actions, state and store in each component or store in actions.

```ts
export class TodoDescription extends HasStateActions<TodoStateActions> {
    // this.actions is available
}

export class TodosStateActions extends HasStore<Immutable.List<any>> {
    // this.store is available
}
```

### 2.2.0
- `state` has been removed due to perfrmance and consistency issues.

### V.2.0.0

- Renamed 'state' to 'actions' in components to keep consistant with react library version
- Improved errors handling
- Added optional parameter to store.update - wrapToWithMutations because wrapping everything to immutable.withMutations causes unexected behaviour when working with Immutable.List. E.g. state.delete(1) returns empty list but not list without second element. Findout more in http://facebook.github.io/immutable-js/docs/#/List -> delete()
- Fixed variuos bugs

### V.1.2.5
- Improved performance by converting getters to properties
