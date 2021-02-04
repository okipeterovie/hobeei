import { Injectable } from '@angular/core';
import { LoginContext } from 'src/services/login-context.model';


const credentialsKey = 'credentials';

/**
 * Provides storage for authentication credentials.
 * The Credentials interface should be replaced with proper implementation.
 */
@Injectable({
    providedIn: 'root',
})
export class CredentialsService {
    private _credentials: LoginContext | null = null;

    constructor() {
        const savedCredentials =
            localStorage.getItem(credentialsKey) || sessionStorage.getItem(credentialsKey);
        if (savedCredentials) {
            this._credentials = JSON.parse(savedCredentials);
        }
    }

    /**
     * Checks is the user is authenticated.
     * @return True if the user is authenticated.
     */
    isAuthenticated(): boolean {
        return !!this.credentials;
    }

    /**
     * Gets the user credentials.
     * @return The user credentials or null if the user is not authenticated.
     */
    get credentials(): LoginContext | null {
        return this._credentials;
    }

    /**
     * Update the user credentials.
     * Mostly needed if user changed username and needs to update it in loginContext
     * @param credentials The user credentials.
     */
    updateCredentials(credentials?: LoginContext) {
        const test = localStorage.getItem(credentialsKey);
        const storage = test ? localStorage : sessionStorage;
        storage.setItem(credentialsKey, JSON.stringify(credentials));
        this._credentials = credentials || null;
    }

    /**
     * Sets the user credentials.
     * The credentials may be persisted across sessions by setting the `remember` parameter to true.
     * Otherwise, the credentials are only persisted for the current session.
     * @param credentials The user credentials.
     * @param remember True to remember credentials across sessions.
     */
    setCredentials(credentials?: LoginContext, remember?: boolean) {
        this._credentials = credentials || null;

        if (credentials) {
            const storage = remember ? localStorage : sessionStorage;
            storage.setItem(credentialsKey, JSON.stringify(credentials));
        } else {
            sessionStorage.removeItem(credentialsKey);
            localStorage.removeItem(credentialsKey);
        }
    }

    clearStorage() {
        sessionStorage.clear();
        // localStorage.clear();
    }

}
