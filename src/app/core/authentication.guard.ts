import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Logger } from './logger.service';
import { CredentialsService } from './credentials.service';

const log = new Logger('AuthenticationGuard');

@Injectable({
  providedIn: 'root',
})

export class AuthenticationGuard implements CanActivate {

  constructor(private router: Router, private credentialsService: CredentialsService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser = this.credentialsService.credentials
    if (this.credentialsService.isAuthenticated()) {
      let status = false;
      route.data.privileges.forEach((privilege: string) => {
        if (currentUser?.privileges.includes(privilege)) {
          status = true;
        }
      });

      return status;
    }

    log.debug('Not authenticated, redirecting and adding redirect url...');
    this.router.navigate(['/login'], {
      queryParams: { redirect: state.url },
      replaceUrl: true,
    });
    return false;
  }
}
