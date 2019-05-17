/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { BehaviorSubject } from 'rxjs';
/**
 * @template T
 */
export class State extends BehaviorSubject {
    /**
     * @param {?} initialState
     * @param {?} dataStrategy
     */
    constructor(initialState, dataStrategy) {
        dataStrategy.overrideContructor(initialState);
        super(dataStrategy.fromJS(initialState));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmctc3RhdGUvc3RvcmUvIiwic291cmNlcyI6WyJsaWIvc3RhdGUvc3RhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7Ozs7QUFHdkMsTUFBTSxPQUFPLEtBQVMsU0FBUSxlQUFrQjs7Ozs7SUFDOUMsWUFBWSxZQUFlLEVBQUUsWUFBMEI7UUFDckQsWUFBWSxDQUFDLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzlDLEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7SUFDM0MsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IERhdGFTdHJhdGVneSB9IGZyb20gJ0BuZy1zdGF0ZS9kYXRhLXN0cmF0ZWd5JztcclxuXHJcbmV4cG9ydCBjbGFzcyBTdGF0ZTxUPiBleHRlbmRzIEJlaGF2aW9yU3ViamVjdDxUPiB7XHJcbiAgY29uc3RydWN0b3IoaW5pdGlhbFN0YXRlOiBULCBkYXRhU3RyYXRlZ3k6IERhdGFTdHJhdGVneSkge1xyXG4gICAgZGF0YVN0cmF0ZWd5Lm92ZXJyaWRlQ29udHJ1Y3Rvcihpbml0aWFsU3RhdGUpO1xyXG4gICAgc3VwZXIoZGF0YVN0cmF0ZWd5LmZyb21KUyhpbml0aWFsU3RhdGUpKTtcclxuICB9XHJcbn0iXX0=