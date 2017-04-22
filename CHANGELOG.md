### V.2.0.0

- Renamed 'state' to 'actions' in components to keep consistant with react library version
- Improved errors handling
- Added optional parameter to store.update - wrapToWithMutations because wrapping everything to immutable.withMutations causes unexected behaviour when working with Immutable.List. E.g. state.delete(1) returns empty list but not list without second element. Findout more in http://facebook.github.io/immutable-js/docs/#/List -> delete()
- Fixed variuos bugs

### V.1.2.5
- Improved performance by converting getters to properties
