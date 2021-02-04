import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CredentialsService } from './credentials.service';
// import { ApiService } from 'src/services/api.service';
import { RegisterContext } from 'src/services/login-context.model';



/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    constructor(private credentialsService: CredentialsService) {
       
    }

    getLoginPage(){
        return "/";
    }

    // login(context: any, remember: boolean): Observable<any> {
    //     return this.apiService.post_("/auth/login", JSON.stringify(context)).pipe(
    //         map((response: any) => {
    //             if (response.success == true) {
    //                 this.credentialsService.setCredentials(response.data, remember);
    //             }
    //             return response;
    //         }),
    //         catchError(error => {
    //             return of(error);
    //         })
    //     );
    // }

    login(context: any, remember: boolean): Observable<any> {
     return context;
  }

    register(context: any): Observable<any> {
        return context;
    }

    /**
     * Logs out the user and clear credentials.
     * @return True if the user was logged out successfully.
     */
    logout(): Observable<boolean> {
        this.credentialsService.setCredentials();
        this.credentialsService.clearStorage();
        return of(true);
    }
}
