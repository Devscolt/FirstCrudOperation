var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule, Component, ElementRef, Input, Output, ViewEncapsulation, forwardRef, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { MdGestureConfig, coerceBooleanProperty, coerceNumberProperty } from '../core';
/**
 * Visually, a 30px separation between tick marks looks best. This is very subjective but it is
 * the default separation we chose.
 */
var MIN_AUTO_TICK_SEPARATION = 30;
/**
 * Provider Expression that allows md-slider to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)] and [formControl].
 */
export var MD_SLIDER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return MdSlider; }),
    multi: true
};
/** A simple change event emitted by the MdSlider component. */
export var MdSliderChange = (function () {
    function MdSliderChange() {
    }
    return MdSliderChange;
}());
export var MdSlider = (function () {
    function MdSlider(elementRef) {
        /** A renderer to handle updating the slider's thumb and fill track. */
        this._renderer = null;
        /** The dimensions of the slider. */
        this._sliderDimensions = null;
        /** Whether or not the slider is disabled. */
        this._disabled = false;
        /** Whether or not to show the thumb label. */
        this._thumbLabel = false;
        this._controlValueAccessorChangeFn = function () { };
        /** The last value for which a change event was emitted. */
        this._lastEmittedValue = null;
        /** onTouch function registered via registerOnTouch (ControlValueAccessor). */
        this.onTouched = function () { };
        /**
         * Whether or not the thumb is sliding.
         * Used to determine if there should be a transition for the thumb and fill track.
         */
        this._isSliding = false;
        /**
         * Whether or not the slider is active (clicked or sliding).
         * Used to shrink and grow the thumb as according to the Material Design spec.
         */
        this._isActive = false;
        /** The values at which the thumb will snap. */
        this._step = 1;
        /**
         * How often to show ticks. Relative to the step so that a tick always appears on a step.
         * Ex: Tick interval of 4 with a step of 3 will draw a tick every 4 steps (every 12 values).
         */
        this._tickInterval = 0;
        /** The size of a tick interval as a percentage of the size of the track. */
        this._tickIntervalPercent = 0;
        /** The percentage of the slider that coincides with the value. */
        this._percent = 0;
        /** Value of the slider. */
        this._value = null;
        /** The miniumum value that the slider can have. */
        this._min = 0;
        /** The maximum value that the slider can have. */
        this._max = 100;
        this.change = new EventEmitter();
        this._renderer = new SliderRenderer(elementRef);
    }
    Object.defineProperty(MdSlider.prototype, "disabled", {
        get: function () { return this._disabled; },
        set: function (value) { this._disabled = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSlider.prototype, "thumbLabel", {
        get: function () { return this._thumbLabel; },
        set: function (value) { this._thumbLabel = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSlider.prototype, "step", {
        get: function () { return this._step; },
        set: function (v) { this._step = coerceNumberProperty(v, this._step); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSlider.prototype, "tickInterval", {
        get: function () { return this._tickInterval; },
        set: function (v) {
            this._tickInterval = (v == 'auto') ? v : coerceNumberProperty(v, this._tickInterval);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSlider.prototype, "tickIntervalPercent", {
        get: function () { return this._tickIntervalPercent; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSlider.prototype, "percent", {
        get: function () { return this._clamp(this._percent); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSlider.prototype, "value", {
        get: function () {
            // If the value needs to be read and it is still uninitialized, initialize it to the min.
            if (this._value === null) {
                this.value = this._min;
            }
            return this._value;
        },
        set: function (v) {
            this._value = coerceNumberProperty(v, this._value);
            this._percent = this._calculatePercentage(this._value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSlider.prototype, "min", {
        get: function () {
            return this._min;
        },
        set: function (v) {
            this._min = coerceNumberProperty(v, this._min);
            // If the value wasn't explicitly set by the user, set it to the min.
            if (this._value === null) {
                this.value = this._min;
            }
            this._percent = this._calculatePercentage(this.value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSlider.prototype, "max", {
        get: function () {
            return this._max;
        },
        set: function (v) {
            this._max = coerceNumberProperty(v, this._max);
            this._percent = this._calculatePercentage(this.value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSlider.prototype, "trackFillFlexBasis", {
        get: function () {
            return this.percent * 100 + '%';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSlider.prototype, "ticksMarginLeft", {
        get: function () {
            return this.tickIntervalPercent / 2 * 100 + '%';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSlider.prototype, "ticksContainerMarginLeft", {
        get: function () {
            return '-' + this.ticksMarginLeft;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSlider.prototype, "ticksBackgroundSize", {
        get: function () {
            return this.tickIntervalPercent * 100 + '% 2px';
        },
        enumerable: true,
        configurable: true
    });
    MdSlider.prototype._onMouseenter = function () {
        if (this.disabled) {
            return;
        }
        // We save the dimensions of the slider here so we can use them to update the spacing of the
        // ticks and determine where on the slider click and slide events happen.
        this._sliderDimensions = this._renderer.getSliderDimensions();
        this._updateTickIntervalPercent();
    };
    MdSlider.prototype._onClick = function (event) {
        if (this.disabled) {
            return;
        }
        this._isActive = true;
        this._isSliding = false;
        this._renderer.addFocus();
        this._updateValueFromPosition(event.clientX);
        this._emitValueIfChanged();
    };
    MdSlider.prototype._onSlide = function (event) {
        if (this.disabled) {
            return;
        }
        // Prevent the slide from selecting anything else.
        event.preventDefault();
        this._updateValueFromPosition(event.center.x);
    };
    MdSlider.prototype._onSlideStart = function (event) {
        if (this.disabled) {
            return;
        }
        event.preventDefault();
        this._isSliding = true;
        this._isActive = true;
        this._renderer.addFocus();
        this._updateValueFromPosition(event.center.x);
    };
    MdSlider.prototype._onSlideEnd = function () {
        this._isSliding = false;
        this._emitValueIfChanged();
    };
    MdSlider.prototype._onBlur = function () {
        this._isActive = false;
        this.onTouched();
    };
    /**
     * Calculate the new value from the new physical location. The value will always be snapped.
     */
    MdSlider.prototype._updateValueFromPosition = function (pos) {
        if (!this._sliderDimensions) {
            return;
        }
        var offset = this._sliderDimensions.left;
        var size = this._sliderDimensions.width;
        // The exact value is calculated from the event and used to find the closest snap value.
        var percent = this._clamp((pos - offset) / size);
        var exactValue = this._calculateValue(percent);
        // This calculation finds the closest step by finding the closest whole number divisible by the
        // step relative to the min.
        var closestValue = Math.round((exactValue - this.min) / this.step) * this.step + this.min;
        // The value needs to snap to the min and max.
        this.value = this._clamp(closestValue, this.min, this.max);
    };
    /** Emits a change event if the current value is different from the last emitted value. */
    MdSlider.prototype._emitValueIfChanged = function () {
        if (this.value != this._lastEmittedValue) {
            var event_1 = new MdSliderChange();
            event_1.source = this;
            event_1.value = this.value;
            this.change.emit(event_1);
            this._controlValueAccessorChangeFn(this.value);
            this._lastEmittedValue = this.value;
        }
    };
    /**
     * Updates the amount of space between ticks as a percentage of the width of the slider.
     */
    MdSlider.prototype._updateTickIntervalPercent = function () {
        if (!this.tickInterval) {
            return;
        }
        if (this.tickInterval == 'auto') {
            var pixelsPerStep = this._sliderDimensions.width * this.step / (this.max - this.min);
            var stepsPerTick = Math.ceil(MIN_AUTO_TICK_SEPARATION / pixelsPerStep);
            var pixelsPerTick = stepsPerTick * this.step;
            this._tickIntervalPercent = pixelsPerTick / (this._sliderDimensions.width);
        }
        else {
            this._tickIntervalPercent = this.tickInterval * this.step / (this.max - this.min);
        }
    };
    /**
     * Calculates the percentage of the slider that a value is.
     */
    MdSlider.prototype._calculatePercentage = function (value) {
        return (value - this.min) / (this.max - this.min);
    };
    /**
     * Calculates the value a percentage of the slider corresponds to.
     */
    MdSlider.prototype._calculateValue = function (percentage) {
        return this.min + percentage * (this.max - this.min);
    };
    /**
     * Return a number between two numbers.
     */
    MdSlider.prototype._clamp = function (value, min, max) {
        if (min === void 0) { min = 0; }
        if (max === void 0) { max = 1; }
        return Math.max(min, Math.min(value, max));
    };
    /**
     * Implemented as part of ControlValueAccessor.
     */
    MdSlider.prototype.writeValue = function (value) {
        this.value = value;
    };
    /**
     * Implemented as part of ControlValueAccessor.
     */
    MdSlider.prototype.registerOnChange = function (fn) {
        this._controlValueAccessorChangeFn = fn;
    };
    /**
     * Implemented as part of ControlValueAccessor.
     */
    MdSlider.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    /**
     * Implemented as part of ControlValueAccessor.
     */
    MdSlider.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], MdSlider.prototype, "disabled", null);
    __decorate([
        Input('thumb-label'), 
        __metadata('design:type', Boolean)
    ], MdSlider.prototype, "thumbLabel", null);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], MdSlider.prototype, "step", null);
    __decorate([
        Input('tick-interval'), 
        __metadata('design:type', Object)
    ], MdSlider.prototype, "tickInterval", null);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], MdSlider.prototype, "value", null);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], MdSlider.prototype, "min", null);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], MdSlider.prototype, "max", null);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], MdSlider.prototype, "change", void 0);
    MdSlider = __decorate([
        Component({selector: 'md-slider',
            providers: [MD_SLIDER_VALUE_ACCESSOR],
            host: {
                '(blur)': '_onBlur()',
                '(click)': '_onClick($event)',
                '(mouseenter)': '_onMouseenter()',
                '(slide)': '_onSlide($event)',
                '(slideend)': '_onSlideEnd()',
                '(slidestart)': '_onSlideStart($event)',
                'tabindex': '0',
                '[attr.aria-disabled]': 'disabled',
                '[attr.aria-valuemax]': 'max',
                '[attr.aria-valuemin]': 'min',
                '[attr.aria-valuenow]': 'value',
                '[class.md-slider-active]': '_isActive',
                '[class.md-slider-disabled]': 'disabled',
                '[class.md-slider-has-ticks]': 'tickInterval',
                '[class.md-slider-sliding]': '_isSliding',
                '[class.md-slider-thumb-label-showing]': 'thumbLabel',
            },
            template: "<div class=\"md-slider-track\"> <div class=\"md-slider-track-fill\" [style.flexBasis]=\"trackFillFlexBasis\"></div> <div class=\"md-slider-ticks-container\" [style.marginLeft]=\"ticksContainerMarginLeft\"> <div class=\"md-slider-ticks\" [style.marginLeft]=\"ticksMarginLeft\" [style.backgroundSize]=\"ticksBackgroundSize\"></div> </div> <div class=\"md-slider-thumb-container\"> <div class=\"md-slider-thumb\"></div> <div class=\"md-slider-thumb-label\"> <span class=\"md-slider-thumb-label-text\">{{value}}</span> </div> </div> </div>",
            styles: ["md-slider { display: inline-block; box-sizing: border-box; position: relative; height: 48px; min-width: 128px; padding: 8px; outline: none; vertical-align: middle; } .md-slider-track { display: flex; flex-grow: 1; align-items: center; position: relative; top: 15px; height: 2px; transition: box-shadow 400ms cubic-bezier(0.25, 0.8, 0.25, 1); } .md-slider-has-ticks.md-slider-active .md-slider-track, .md-slider-has-ticks:hover .md-slider-track { box-shadow: inset -4px 0 0 -2px rgba(0, 0, 0, 0.6); } .md-slider-track-fill { flex: 0 0 50%; height: 2px; transition: flex-basis 400ms cubic-bezier(0.25, 0.8, 0.25, 1); } .md-slider-sliding .md-slider-track-fill { transition: none; } .md-slider-ticks-container { position: absolute; left: 0; top: 0; height: 2px; width: 100%; overflow: hidden; } .md-slider-ticks { background: repeating-linear-gradient(to right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6) 2px, transparent 0, transparent) repeat; background: -moz-repeating-linear-gradient(0.0001deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6) 2px, transparent 0, transparent) repeat; height: 2px; width: 100%; opacity: 0; transition: opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1); } .md-slider-has-ticks.md-slider-active .md-slider-ticks, .md-slider-has-ticks:hover .md-slider-ticks { opacity: 1; } .md-slider-thumb-container { flex: 0 0 auto; position: relative; width: 0; height: 0; } .md-slider-thumb { position: absolute; left: -10px; top: -10px; width: 20px; height: 20px; border-radius: 50%; transform-origin: 50% 50%; transform: scale(0.7); transition: transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1); } .md-slider-active .md-slider-thumb { transform: scale(1); } .md-slider-active.md-slider-thumb-label-showing .md-slider-thumb { transform: scale(0); } .md-slider-thumb-label { display: flex; align-items: center; justify-content: center; position: absolute; left: -14px; top: -40px; width: 28px; height: 28px; border-radius: 50%; transform: translateY(26px) scale(0.4) rotate(45deg); transition: 300ms cubic-bezier(0.35, 0, 0.25, 1); transition-property: transform, border-radius; } .md-slider-active .md-slider-thumb-label { border-radius: 50% 50% 0; transform: rotate(45deg); } md-slider:not(.md-slider-thumb-label-showing) .md-slider-thumb-label { display: none; } .md-slider-thumb-label-text { z-index: 1; font-size: 12px; font-weight: bold; opacity: 0; transform: rotate(-45deg); transition: opacity 300ms cubic-bezier(0.35, 0, 0.25, 1); } .md-slider-active .md-slider-thumb-label-text { opacity: 1; } /*# sourceMappingURL=slider.css.map */ "],
            encapsulation: ViewEncapsulation.None,
        }), 
        __metadata('design:paramtypes', [ElementRef])
    ], MdSlider);
    return MdSlider;
}());
/**
 * Renderer class in order to keep all dom manipulation in one place and outside of the main class.
 */
export var SliderRenderer = (function () {
    function SliderRenderer(elementRef) {
        this._sliderElement = elementRef.nativeElement;
    }
    /**
     * Get the bounding client rect of the slider track element.
     * The track is used rather than the native element to ignore the extra space that the thumb can
     * take up.
     */
    SliderRenderer.prototype.getSliderDimensions = function () {
        var trackElement = this._sliderElement.querySelector('.md-slider-track');
        return trackElement.getBoundingClientRect();
    };
    /**
     * Focuses the native element.
     * Currently only used to allow a blur event to fire but will be used with keyboard input later.
     */
    SliderRenderer.prototype.addFocus = function () {
        this._sliderElement.focus();
    };
    return SliderRenderer;
}());
export var MdSliderModule = (function () {
    function MdSliderModule() {
    }
    MdSliderModule.forRoot = function () {
        return {
            ngModule: MdSliderModule,
            providers: [{ provide: HAMMER_GESTURE_CONFIG, useClass: MdGestureConfig }]
        };
    };
    MdSliderModule = __decorate([
        NgModule({
            imports: [FormsModule],
            exports: [MdSlider],
            declarations: [MdSlider],
            providers: [
                { provide: HAMMER_GESTURE_CONFIG, useClass: MdGestureConfig },
            ],
        }), 
        __metadata('design:paramtypes', [])
    ], MdSliderModule);
    return MdSliderModule;
}());

//# sourceMappingURL=slider.js.map
