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
