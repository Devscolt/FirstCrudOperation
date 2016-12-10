import { ElementRef } from '@angular/core';
import { MdInkBar } from '../ink-bar';
/**
 * Navigation component matching the styles of the tab group header.
 * Provides anchored navigation with animated ink bar.
 */
export declare class MdTabNavBar {
    _inkBar: MdInkBar;
    /** Animates the ink bar to the position of the active link element. */
    updateActiveLink(element: HTMLElement): void;
}
export declare class MdTabLink {
    private _mdTabNavBar;
    private _element;
    private _isActive;
    active: boolean;
    constructor(_mdTabNavBar: MdTabNavBar, _element: ElementRef);
}
