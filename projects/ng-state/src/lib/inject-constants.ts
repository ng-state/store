import { InjectionToken } from '@angular/core';

export const TRANSFER_STATE_KEY = 'state';
export const INITIAL_STATE = new InjectionToken('INITIAL_STATE');
export const NG_STATE_OPTIONS = new InjectionToken('NG_STATE_OPTIONS');
export const IS_PROD = new InjectionToken('IS_PROD');
export const IS_TEST = new InjectionToken('IS_TEST');