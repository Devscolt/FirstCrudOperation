var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, ViewChild, ElementRef, ViewEncapsulation, Directive } from '@angular/core';
import { MdInkBar } from '../ink-bar';
/**
 * Navigation component matching the styles of the tab group header.
 * Provides anchored navigation with animated ink bar.
 */
export var MdTabNavBar = (function () {
    function MdTabNavBar() {
    }
    /** Animates the ink bar to the position of the active link element. */
    MdTabNavBar.prototype.updateActiveLink = function (element) {
        this._inkBar.alignToElement(element);
    };
    __decorate([
        ViewChild(MdInkBar), 
        __metadata('design:type', MdInkBar)
    ], MdTabNavBar.prototype, "_inkBar", void 0);
    MdTabNavBar = __decorate([
        Component({selector: '[md-tab-nav-bar]',
            template: "<ng-content></ng-content> <md-ink-bar></md-ink-bar> ",
            styles: ["[md-tab-nav-bar] { overflow: hidden; position: relative; display: flex; flex-direction: row; flex-shrink: 0; } [md-tab-link] { line-height: 48px; height: 48px; padding: 0 12px; font-size: 14px; font-family: Roboto, \"Helvetica Neue\", sans-serif; font-weight: 500; cursor: pointer; box-sizing: border-box; color: currentColor; opacity: 0.6; min-width: 160px; text-align: center; text-decoration: none; } [md-tab-link]:focus { outline: none; opacity: 1; } @media (max-width: 600px) { [md-tab-link] { min-width: 72px; } } md-ink-bar { position: absolute; bottom: 0; height: 2px; transition: 350ms ease-out; } /*# sourceMappingURL=tab-nav-bar.css.map */ "],
            encapsulation: ViewEncapsulation.None,
        }), 
        __metadata('design:paramtypes', [])
    ], MdTabNavBar);
    return MdTabNavBar;
}());
export var MdTabLink = (function () {
    function MdTabLink(_mdTabNavBar, _element) {
        this._mdTabNavBar = _mdTabNavBar;
        this._element = _element;
        this._isActive = false;
    }
    Object.defineProperty(MdTabLink.prototype, "active", {
        get: function () {
            return this._isActive;
        },
        set: function (value) {
            this._isActive = value;
            if (value) {
                this._mdTabNavBar.updateActiveLink(this._element.nativeElement);
            }
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], MdTabLink.prototype, "active", null);
    MdTabLink = __decorate([
        Directive({
            selector: '[md-tab-link]',
        }), 
        __metadata('design:paramtypes', [MdTabNavBar, ElementRef])
    ], MdTabLink);
    return MdTabLink;
}());

//# sourceMappingURL=tab-nav-bar.js.map
