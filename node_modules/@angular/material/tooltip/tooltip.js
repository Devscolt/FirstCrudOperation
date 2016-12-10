var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule, Component, Directive, Input, ElementRef, ViewContainerRef, style, trigger, state, transition, animate, NgZone } from '@angular/core';
import { Overlay, OverlayState, OverlayModule, ComponentPortal, OVERLAY_PROVIDERS } from '../core';
import { Subject } from 'rxjs/Subject';
/** Time in ms to delay before changing the tooltip visibility to hidden */
export var TOOLTIP_HIDE_DELAY = 1500;
/**
 * Directive that attaches a material design tooltip to the host element. Animates the showing and
 * hiding of a tooltip provided position (defaults to below the element).
 *
 * https://material.google.com/components/tooltips.html
 */
export var MdTooltip = (function () {
    function MdTooltip(_overlay, _elementRef, _viewContainerRef, _ngZone) {
        this._overlay = _overlay;
        this._elementRef = _elementRef;
        this._viewContainerRef = _viewContainerRef;
        this._ngZone = _ngZone;
        /** Allows the user to define the position of the tooltip relative to the parent element */
        this._position = 'below';
    }
    Object.defineProperty(MdTooltip.prototype, "position", {
        get: function () {
            return this._position;
        },
        set: function (value) {
            if (value !== this._position) {
                this._position = value;
                // TODO(andrewjs): When the overlay's position can be dynamically changed, do not destroy
                // the tooltip.
                if (this._tooltipInstance) {
                    this._disposeTooltip();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdTooltip.prototype, "message", {
        get: function () {
            return this._message;
        },
        set: function (value) {
            this._message = value;
            if (this._tooltipInstance) {
                this._setTooltipMessage(this._message);
            }
        },
        enumerable: true,
        configurable: true
    });
    /** Dispose the tooltip when destroyed */
    MdTooltip.prototype.ngOnDestroy = function () {
        if (this._tooltipInstance) {
            this._disposeTooltip();
        }
    };
    /** Shows the tooltip */
    MdTooltip.prototype.show = function () {
        if (!this._tooltipInstance) {
            this._createTooltip();
        }
        this._setTooltipMessage(this._message);
        this._tooltipInstance.show(this._position);
    };
    /**
     * Create the overlay config and position strategy
     * Hides the tooltip after the provided delay in ms. Defaults the delay to the material design
     * prescribed delay time
     */
    MdTooltip.prototype.hide = function (delay) {
        if (delay === void 0) { delay = TOOLTIP_HIDE_DELAY; }
        if (this._tooltipInstance) {
            this._tooltipInstance.hide(delay);
        }
    };
    /** Shows/hides the tooltip */
    MdTooltip.prototype.toggle = function () {
        this._isTooltipVisible() ? this.hide() : this.show();
    };
    /** Returns true if the tooltip is currently visible to the user */
    MdTooltip.prototype._isTooltipVisible = function () {
        return this._tooltipInstance && this._tooltipInstance.isVisible();
    };
    /** Create the tooltip to display */
    MdTooltip.prototype._createTooltip = function () {
        var _this = this;
        this._createOverlay();
        var portal = new ComponentPortal(TooltipComponent, this._viewContainerRef);
        this._tooltipInstance = this._overlayRef.attach(portal).instance;
        // Dispose the overlay when finished the shown tooltip.
        this._tooltipInstance.afterHidden().subscribe(function () {
            _this._disposeTooltip();
        });
    };
    /** Create the overlay config and position strategy */
    MdTooltip.prototype._createOverlay = function () {
        var origin = this._getOrigin();
        var position = this._getOverlayPosition();
        var strategy = this._overlay.position().connectedTo(this._elementRef, origin, position);
        var config = new OverlayState();
        config.positionStrategy = strategy;
        this._overlayRef = this._overlay.create(config);
    };
    /** Disposes the current tooltip and the overlay it is attached to */
    MdTooltip.prototype._disposeTooltip = function () {
        this._overlayRef.dispose();
        this._overlayRef = null;
        this._tooltipInstance = null;
    };
    /** Returns the origin position based on the user's position preference */
    MdTooltip.prototype._getOrigin = function () {
        switch (this.position) {
            case 'before': return { originX: 'start', originY: 'center' };
            case 'after': return { originX: 'end', originY: 'center' };
            case 'above': return { originX: 'center', originY: 'top' };
            case 'below': return { originX: 'center', originY: 'bottom' };
        }
    };
    /** Returns the overlay position based on the user's preference */
    MdTooltip.prototype._getOverlayPosition = function () {
        switch (this.position) {
            case 'before': return { overlayX: 'end', overlayY: 'center' };
            case 'after': return { overlayX: 'start', overlayY: 'center' };
            case 'above': return { overlayX: 'center', overlayY: 'bottom' };
            case 'below': return { overlayX: 'center', overlayY: 'top' };
        }
    };
    /** Updates the tooltip message and repositions the overlay according to the new message length */
    MdTooltip.prototype._setTooltipMessage = function (message) {
        var _this = this;
        // Must wait for the message to be painted to the tooltip so that the overlay can properly
        // calculate the correct positioning based on the size of the text.
        this._tooltipInstance.message = message;
        this._ngZone.onMicrotaskEmpty.first().subscribe(function () {
            if (_this._tooltipInstance) {
                _this._overlayRef.updatePosition();
            }
        });
    };
    __decorate([
        Input('tooltip-position'), 
        __metadata('design:type', String)
    ], MdTooltip.prototype, "position", null);
    __decorate([
        Input('md-tooltip'), 
        __metadata('design:type', Object)
    ], MdTooltip.prototype, "message", null);
    MdTooltip = __decorate([
        Directive({
            selector: '[md-tooltip]',
            host: {
                '(mouseenter)': 'show()',
                '(mouseleave)': 'hide()',
            },
            exportAs: 'mdTooltip',
        }), 
        __metadata('design:paramtypes', [Overlay, ElementRef, ViewContainerRef, NgZone])
    ], MdTooltip);
    return MdTooltip;
}());
export var TooltipComponent = (function () {
    function TooltipComponent() {
        /** Whether interactions on the page should close the tooltip */
        this._closeOnInteraction = false;
        /** The transform origin used in the animation for showing and hiding the tooltip */
        this._transformOrigin = 'bottom';
        /** Subject for notifying that the tooltip has been hidden from the view */
        this._onHide = new Subject();
    }
    /** Shows the tooltip with an animation originating from the provided origin */
    TooltipComponent.prototype.show = function (position) {
        var _this = this;
        this._closeOnInteraction = false;
        this._visibility = 'visible';
        this._setTransformOrigin(position);
        // Cancel the delayed hide if it is scheduled
        if (this._hideTimeoutId) {
            clearTimeout(this._hideTimeoutId);
        }
        // If this was set to true immediately, then the body click would trigger interaction and
        // close the tooltip right after it was displayed.
        setTimeout(function () { _this._closeOnInteraction = true; }, 0);
    };
    /** Begins the animation to hide the tooltip after the provided delay in ms */
    TooltipComponent.prototype.hide = function (delay) {
        var _this = this;
        this._hideTimeoutId = setTimeout(function () {
            _this._visibility = 'hidden';
            _this._closeOnInteraction = false;
        }, delay);
    };
    /** Returns an observable that notifies when the tooltip has been hidden from view */
    TooltipComponent.prototype.afterHidden = function () {
        return this._onHide.asObservable();
    };
    /** Whether the tooltip is being displayed */
    TooltipComponent.prototype.isVisible = function () {
        return this._visibility === 'visible';
    };
    /** Sets the tooltip transform origin according to the tooltip position */
    TooltipComponent.prototype._setTransformOrigin = function (value) {
        switch (value) {
            case 'before':
                this._transformOrigin = 'right';
                break;
            case 'after':
                this._transformOrigin = 'left';
                break;
            case 'above':
                this._transformOrigin = 'bottom';
                break;
            case 'below':
                this._transformOrigin = 'top';
                break;
        }
    };
    TooltipComponent.prototype._afterVisibilityAnimation = function (e) {
        if (e.toState === 'hidden' && !this.isVisible()) {
            this._onHide.next();
        }
    };
    /**
     * Interactions on the HTML body should close the tooltip immediately as defined in the
     * material design spec.
     * https://material.google.com/components/tooltips.html#tooltips-interaction
     */
    TooltipComponent.prototype._handleBodyInteraction = function () {
        if (this._closeOnInteraction) {
            this.hide(0);
        }
    };
    TooltipComponent = __decorate([
        Component({selector: 'md-tooltip-component',
            template: "<div class=\"md-tooltip\" [style.transform-origin]=\"_transformOrigin\" [@state]=\"_visibility\" (@state.done)=\"this._afterVisibilityAnimation($event)\"> {{message}} </div>",
            styles: [":host { pointer-events: none; } .md-tooltip { color: white; padding: 0 8px; border-radius: 2px; font-family: Roboto, \"Helvetica Neue\", sans-serif; font-size: 10px; margin: 14px; height: 22px; line-height: 22px; } /*# sourceMappingURL=tooltip.css.map */ "],
            animations: [
                trigger('state', [
                    state('void', style({ transform: 'scale(0)' })),
                    state('visible', style({ transform: 'scale(1)' })),
                    state('hidden', style({ transform: 'scale(0)' })),
                    transition('* => visible', animate('150ms cubic-bezier(0.0, 0.0, 0.2, 1)')),
                    transition('* => hidden', animate('150ms cubic-bezier(0.4, 0.0, 1, 1)')),
                ])
            ],
            host: {
                '(body:click)': 'this._handleBodyInteraction()'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], TooltipComponent);
    return TooltipComponent;
}());
export var MdTooltipModule = (function () {
    function MdTooltipModule() {
    }
    MdTooltipModule.forRoot = function () {
        return {
            ngModule: MdTooltipModule,
            providers: OVERLAY_PROVIDERS,
        };
    };
    MdTooltipModule = __decorate([
        NgModule({
            imports: [OverlayModule],
            exports: [MdTooltip, TooltipComponent],
            declarations: [MdTooltip, TooltipComponent],
            entryComponents: [TooltipComponent],
        }), 
        __metadata('design:paramtypes', [])
    ], MdTooltipModule);
    return MdTooltipModule;
}());

//# sourceMappingURL=tooltip.js.map
