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
