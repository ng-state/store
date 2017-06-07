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
