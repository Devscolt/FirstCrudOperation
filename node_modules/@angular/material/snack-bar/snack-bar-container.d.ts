import { ComponentRef, AnimationTransitionEvent, NgZone } from '@angular/core';
import { BasePortalHost, ComponentPortal, TemplatePortal, PortalHostDirective } from '../core';
import { MdSnackBarConfig } from './snack-bar-config';
import { Observable } from 'rxjs/Observable';
export declare type SnackBarState = 'initial' | 'visible' | 'complete' | 'void';
export declare const SHOW_ANIMATION: string;
export declare const HIDE_ANIMATION: string;
/**
 * Internal component that wraps user-provided snack bar content.
 */
export declare class MdSnackBarContainer extends BasePortalHost {
    private _ngZone;
    /** The portal host inside of this container into which the snack bar content will be loaded. */
    _portalHost: PortalHostDirective;
    /** Subject for notifying that the snack bar has exited from view. */
    private _onExit;
    /** The state of the snack bar animations. */
    animationState: SnackBarState;
    /** The snack bar configuration. */
    snackBarConfig: MdSnackBarConfig;
    constructor(_ngZone: NgZone);
    /** Attach a component portal as content to this snack bar container. */
    attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T>;
    /** Attach a template portal as content to this snack bar container. */
    attachTemplatePortal(portal: TemplatePortal): Map<string, any>;
    /** Begin animation of the snack bar exiting from view. */
    exit(): Observable<void>;
    /** Mark snack bar as exited from the view. */
    markAsExited(event: AnimationTransitionEvent): void;
    /** Begin animation of snack bar entrance into view. */
    enter(): void;
}
