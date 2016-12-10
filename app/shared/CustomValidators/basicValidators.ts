    import {FormControl} from '@angular/forms';

export class BasicValidators {
    static required(control: FormControl) {
        if (typeof control.value == 'undefined' || control.value.trim().length == 0 || control.value == null) {
            return { required: true, message: 'This is required' }
        } else
            return null
    }
}
