const resolve = require('rollup-plugin-node-resolve');
const sourcemaps = require('rollup-plugin-sourcemaps');

const globals = {
    '@angular/core': 'ng.core',
    '@angular/common': 'ng.common',
    '@angular/router': 'ng.router',
    'immutable': 'Immutable',
    'rxjs': 'Rx',
    'rxjs/Observable': 'Rx',
    'rxjs/BehaviorSubject': 'Rx',
    'rxjs/Subscriber': 'Rx',
    'immutable-cursor': 'Cursor',
    'rxjs/operator/distinctUntilChanged': 'Rx.Observable.prototype',
    'rxjs/operator/map': 'Rx.Observable',
    'rxjs/operator/do': 'Rx.Observable.prototype'
  };

export default {
  entry: './release/index.js',
  dest: './release/bundles/store.umd.js',
  format: 'umd',
  moduleName: 'ngState.store',
  exports: 'named',
  plugins: [resolve(), sourcemaps()],
  globals: globals,
  external: Object.keys(globals),
}