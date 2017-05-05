export default {
  entry: './release/index.js',
  dest: './release/bundles/store.umd.js',
  format: 'umd',
  moduleName: 'ngState.store',
  globals: {
    '@angular/core': 'ng.core',
    '@angular/common': 'ng.common',
    '@angular/router': 'ng.router',
    'immutable': 'Immutable',
    'rxjs': 'Rx',
    'rxjs/Observable': 'Rx',
    'rxjs/BehaviorSubject': 'Rx',
    'rxjs/Subscriber': 'Rx',
    'immutable/contrib/cursor': '_Cursor',
    'rxjs/operator/distinctUntilChanged': 'Rx.Observable.prototype',
    'rxjs/operator/map': 'Rx.Observable',
    'rxjs/operator/do': 'Rx.Observable.prototype',
  }
}