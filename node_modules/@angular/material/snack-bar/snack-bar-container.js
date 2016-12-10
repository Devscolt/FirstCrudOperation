var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, trigger, state, style, transition, animate, NgZone } from '@angular/core';
import { BasePortalHost, PortalHostDirective } from '../core';
import { MdSnackBarContentAlreadyAttached } from './snack-bar-errors';
import { Subject } from 'rxjs/Subject';
// TODO(jelbourn): we can't use constants from animation.ts here because you can't use
// a text interpolation in anything that is analyzed statically with ngc (for AoT compile).
export var SHOW_ANIMATION = '225ms cubic-bezier(0.4,0.0,1,1)';
export var HIDE_ANIMATION = '195ms cubic-bezier(0.0,0.0,0.2,1)';
/**
 * Internal component that wraps user-provided snack bar content.
 */
export var MdSnackBarContainer = (function (_super) {
    __extends(MdSnackBarContainer, _super);
    function MdSnackBarContainer(_ngZone) {
        _super.call(this);
        this._ngZone = _ngZone;
        /** Subject for notifying that the snack bar has exited from view. */
        this._onExit = new Subject();
        /** The state of the snack bar animations. */
        this.animationState = 'initial';
    }
    /** Attach a component portal as content to this snack bar container. */
    MdSnackBarContainer.prototype.attachComponentPortal = function (portal) {
        if (this._portalHost.hasAttached()) {
            throw new MdSnackBarContentAlreadyAttached();
        }
        return this._portalHost.attachComponentPortal(portal);
    };
    /** Attach a template portal as content to this snack bar container. */
    MdSnackBarContainer.prototype.attachTemplatePortal = function (portal) {
        throw Error('Not yet implemented');
    };
    /** Begin animation of the snack bar exiting from view. */
    MdSnackBarContainer.prototype.exit = function () {
        this.animationState = 'complete';
        return this._onExit.asObservable();
    };
    /** Mark snack bar as exited from the view. */
    MdSnackBarContainer.prototype.markAsExited = function (event) {
        var _this = this;
        if (event.toState === 'void' || event.toState === 'complete') {
            this._ngZone.run(function () {
                _this._onExit.next();
                _this._onExit.complete();
            });
        }
    };
    /** Begin animation of snack bar entrance into view. */
    MdSnackBarContainer.prototype.enter = function () {
        this.animationState = 'visible';
    };
    __decorate([
        ViewChild(PortalHostDirective), 
        __metadata('design:type', PortalHostDirective)
    ], MdSnackBarContainer.prototype, "_portalHost", void 0);
    MdSnackBarContainer = __decorate([
        Component({selector: 'snack-bar-container',
            template: "<template portalHost></template>",
            styles: [":host { box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12); background: #323232; border-radius: 2px; box-sizing: content-box; display: block; height: 20px; max-width: 568px; min-width: 288px; overflow: hidden; padding: 14px 24px; transform: translateY(100%); } /*# sourceMappingURL=snack-bar-container.css.map */ "],
            host: {
                'role': 'alert',
                '[@state]': 'animationState',
                '(@state.done)': 'markAsExited($event)'
            },
            animations: [
                trigger('state', [
                    state('initial', style({ transform: 'translateY(100%)' })),
                    state('visible', style({ transform: 'translateY(0%)' })),
                    state('complete', style({ transform: 'translateY(100%)' })),
                    transition('visible => complete', animate(HIDE_ANIMATION)),
                    transition('initial => visible, void => visible', animate(SHOW_ANIMATION)),
                ])
            ],
        }), 
        __metadata('design:paramtypes', [NgZone])
    ], MdSnackBarContainer);
    return MdSnackBarContainer;
}(BasePortalHost));

//# sourceMappingURL=snack-bar-container.js.map
