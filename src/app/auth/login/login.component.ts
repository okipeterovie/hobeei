import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../core/authentication.service';
import { CredentialsService } from '../../core/credentials.service';
import { ToastService } from '../../bootstrap/toast/ToastService';
import { LoginContext } from 'src/services/login-context.model';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage: string = "";
  isLoading: boolean = false;
  loginForm!: FormGroup;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private credentialsService: CredentialsService,
    private formBuilder: FormBuilder,
    private toastService: ToastService) {

    this.initializeForm();


  }

  initializeForm() {
    return this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: ['']
    });
  }

  ngOnInit(): void {
    this.setUsersInLocalStorage();
  }


  setUsersInLocalStorage() {
    let applicationProcessorRoles = ["role_application_processor"];
    let applicationProcessorPrivileges = ["applicant_privilege", "application_reviewer_privilege", "application_processor_privilege"]
    let applicationProcessorUser = {
      id: 1,
      email: "applicationProcessor@vehicleapp.com",
      password: "password",
      roles: applicationProcessorRoles,
      privileges: applicationProcessorPrivileges,
      token: "proc_token",
      userType: "user_application_processor"
    }

    let applicationReviewerRoles = ["role_application_reviewer"];
    let applicationReviewerPrivileges = ["applicant_privilege", "application_reviewer_privilege"]
    let applicationReviewerUser = {
      id: 2,
      email: "applicationReviewer@vehicleapp.com",
      password: "password",
      roles: applicationReviewerRoles,
      privileges: applicationReviewerPrivileges,
      token: "proc_token",
      userType: "user_application_reviewer"
    }

    let request = {
      applicationProcessorUser: applicationProcessorUser,
      applicationReviewerUser: applicationReviewerUser
    }

    // localStorage.clear();
    localStorage.setItem('usersDetails', JSON.stringify(request));
  }

  get loginFormControl() {
    return this.loginForm.controls;
  }

  get getUsersFromLocalStorage() {
    let pi = localStorage.getItem("usersDetails");
    let usersDetails = JSON.parse(pi == null ? "{}" : pi);
    return usersDetails;
  }

  handleLogin() {
    // console.log('here')
    if (this.loginForm.valid) {
      // console.log('valid')
      this.isLoading = true;
      let request: any = {
        username: this.loginFormControl.username.value,
        password: this.loginFormControl.password.value
      }
      let remember: boolean = this.loginFormControl.remember.value;

      if (request.username == "applicationProcessor@vehicleapp.com" && request.password == "password") {
        let user = this.getUsersFromLocalStorage.applicationProcessorUser
        let url = this.route.snapshot.queryParams.redirect || this.getLandingPage(user);
        // this.router.navigate([url]);
        window.location.href = url

      } else if (request.username == "applicationReviewer@vehicleapp.com" && request.password == "password") {
        let user = this.getUsersFromLocalStorage.applicationReviewerUser
        let url = this.route.snapshot.queryParams.redirect || this.getLandingPage(user);
        // this.router.navigate([url]);
        window.location.href = url

      }
      else {
        this.errorMessage = "Invalid username and/or password!";
        this.toastService.showDanger(this.errorMessage);
        this.isLoading = false;
      }
    }
  }

  getLandingPage(loginContext: LoginContext) {
    let roles = loginContext.roles;
    let landing = "admin/dashboard";
    loginContext.userType = "admin";
    if (roles.indexOf("role_application_processor") > -1) {
      loginContext.userType = "user_application_processor";
      landing = "application-processor/dashboard";
    }
    else if (roles.indexOf("role_application_reviewer") > -1) {
      loginContext.userType = "user_application_reviewer";
      landing = "application-reviewer/dashboard";
    }
    this.credentialsService.updateCredentials(loginContext);
    return landing;
  }

  register(){
    this.router.navigateByUrl('applicant/register-vehicle')

  }

}
