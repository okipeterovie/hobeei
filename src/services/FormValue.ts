import { FormGroup } from '@angular/forms';

export class FormValue {

    static get(form: FormGroup, includeDisabledFields?: boolean) {
        if (includeDisabledFields) {
            let request = form.value || {};
            for (const [field, formControl] of Object.entries(form.controls)) {
                request[field] = formControl.value;
            }
            return request;
        }
        else {
            return form.value;
        }
    }

}
