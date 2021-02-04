import { Component, OnInit } from '@angular/core';
import { LoginContext } from 'src/services/login-context.model';
import { AuthenticationService } from 'src/app/core/authentication.service';
import { CredentialsService } from 'src/app/core/credentials.service';
@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

  profile: LoginContext | null = null;

  constructor(private credentialsService: CredentialsService, private authService: AuthenticationService) {
    this.profile = this.credentialsService.credentials;
  }

  ngOnInit() {
  }

  logout(): void {
    this.authService.logout();
  }

}
