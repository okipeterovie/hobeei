import { FormGroup } from "@angular/forms";

export function matchingPasswords(passwordKey: string, confirmPasswordKey: string): any {
    return (group: FormGroup): any => {
        let password = group.controls[passwordKey];
        let confirmPassword = group.controls[confirmPasswordKey];
        if (password.value !== confirmPassword.value) {
            return {
                mismatchedPasswords: true
            };
        }
    }
}