import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormValue } from 'src/services/FormValue';
import { ActivatedRoute, Router } from '@angular/router';
import { CredentialsService } from 'src/app/core/credentials.service'
import { LoginContext } from 'src/services/login-context.model';
import { ToastService } from 'src/app/bootstrap/toast/ToastService';
// import '../../../assets/js/smtp.js'
declare var Email: any;

@Component({
  selector: 'app-applicant-registration',
  templateUrl: './applicant-registration.component.html',
  styleUrls: ['./applicant-registration.component.css']
})
export class ApplicantRegistrationComponent implements OnInit {

  imgInputLabel: any;
  applicantDetailsForm!: FormGroup;
  reviewerRejectionForm!: FormGroup;
  processorRejectionForm!: FormGroup;

  res: any;

  registrationRequests: any[] = [];

  requestId: number = 0;

  profile: any;
  processor: boolean = false;
  reviewer: boolean = false;
  reviewerToggleRejectBtn: boolean = false;
  processorToggleRejectBtn: boolean = false;


  particularReq: any;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private credentialService: CredentialsService,
    private toastService: ToastService,) {
    this.requestId = <number><unknown>this.route.snapshot.paramMap.get('id') || 0;

    this.initializeForm();
    this.initializeReviewerRejectForm();
    this.initializeProcessorRejectForm();

  }

  ngOnInit(): void {

    if (this.requestId > 0) {
      this.setFormData(this.requestId);
      this.profile = this.credentialService.credentials

      if (this.profile.roles?.indexOf("role_application_reviewer") > -1) {
        this.reviewer = true;
        this.processor = false;
      } else if (this.profile.roles.indexOf("role_application_processor") > -1) {
        this.reviewer = false;
        this.processor = true
      }
    }

  }

  setFormData(requestId: number) {
    let req = this.getRegistrationRequests.filter((data: { id: any; }) => data.id == requestId);
    this.particularReq = req[0];
    this.applicantDetailsForm.patchValue(this.particularReq);
  }


  initializeForm() {
    return this.applicantDetailsForm = this.formBuilder.group({
      id: [''],
      importImg: [''],
      firstName: [''],
      lastName: [''],
      dateOfBirth: ['', Validators.required],
      gender: [''],
      stateOfOrigin: [''],
      occupation: [''],
      residence: [''],
      email: ['', Validators.required],
      applicationType: [''],
      occurence: [''],
      applicationOrigin: ['']
    });
  }

  initializeReviewerRejectForm() {
    return this.reviewerRejectionForm = this.formBuilder.group({
      body: ['', Validators.required]
    });
  }

  initializeProcessorRejectForm() {
    return this.processorRejectionForm = this.formBuilder.group({
      body: ['', Validators.required]
    });
  }


  get applicantDetailsFormControl() {
    return this.applicantDetailsForm.controls;
  }

  onImgSelect(event: any) {

    if (event.target.files.length > 0) {
      const img = event.target.files[0];
      // console.log(img);

      let name = img.name

      if (!name.endsWith(".PNG" || !name.endsWith(".JPEG") || !name.endsWith(".JPG"))) {
        alert('Only PNG, JPG and JPEG files accepted!');
        return
      }

      if ((img.size / 1024 / 1024) > 5) {
        alert('Size of Image cant exceed 5mb')
        return
      }

      this.imgInputLabel = img.name
      this.getBase64(img);
    }
  }

  getBase64(file: any) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {

      // console.log(reader.result);

      let request = {
        base64: reader.result
      }
      localStorage.setItem('base64', JSON.stringify(request));

    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };

  }

  get getBase64FromLocalStorage() {
    let pi = localStorage.getItem("base64");
    let base64 = JSON.parse(pi == null ? "{}" : pi);
    return base64;
  }

  get getRegistrationRequests() {
    let pi = localStorage.getItem("registrationRequests");
    let registrationRequests = JSON.parse(pi == null ? "{}" : pi);
    return registrationRequests;
  }

  saveApplicantDetails() {
    // console.log(this.getBase64FromLocalStorage.base64)
    this.applicantDetailsFormControl.importImg.setValue(this.getBase64FromLocalStorage.base64);
    // console.log(this.applicantDetailsFormControl.importImg.value)
    if (this.applicantDetailsForm.valid) {
      if ("registrationRequests" in localStorage) {
        let regReq = this.getRegistrationRequests;
        this.registrationRequests = regReq
      }
      let id = this.registrationRequests.length;

      this.applicantDetailsFormControl.id.setValue(id + 1);

      let formRequest = FormValue.get(this.applicantDetailsForm, true);

      let req = {
        id: formRequest.id,
        approvedByReviewer: null,
        approvedByProcessor: null,
        reviewerRejectionReason: null,
        processorRejectionReason: null,
        applicationOrigin: formRequest.applicationOrigin,
        applicationType: formRequest.applicationType,
        dateOfBirth: formRequest.dateOfBirth,
        email: formRequest.email,
        firstName: formRequest.firstName,
        gender: formRequest.gender,
        importImg: formRequest.importImg,
        lastName: formRequest.lastName,
        occupation: formRequest.occupation,
        occurence: formRequest.occurence,
        residence: formRequest.residence,
        stateOfOrigin: formRequest.stateOfOrigin
      }
      // console.log(req)
      // console.log(regReq)

      this.registrationRequests.push(req);

      localStorage.setItem('registrationRequests', JSON.stringify(this.registrationRequests));
      this.router.navigateByUrl('/login')
    }

  }



  reviewerAccept() {
    let r = confirm("Are You sure?");
    if (r == true) {
      let formRequest = FormValue.get(this.applicantDetailsForm, true);

      let req = {
        id: formRequest.id,
        approvedByReviewer: true,
        approvedByProcessor: null,
        reviewerRejectionReason: this.particularReq.reviewerRejectionReason,
        processorRejectionReason: null,
        applicationOrigin: formRequest.applicationOrigin,
        applicationType: formRequest.applicationType,
        dateOfBirth: formRequest.dateOfBirth,
        email: formRequest.email,
        firstName: formRequest.firstName,
        gender: formRequest.gender,
        importImg: formRequest.importImg,
        lastName: formRequest.lastName,
        occupation: formRequest.occupation,
        occurence: formRequest.occurence,
        residence: formRequest.residence,
        stateOfOrigin: formRequest.stateOfOrigin
      }

      this.updateData(this.particularReq, req);

      this.toastService.showSuccess("Updated Sucessfully!");
      this.router.navigateByUrl("/application-reviewer/dashboard")
    }
  }

  reviewerReject() {
    let r = confirm("Are You sure?");
    if (r == true) {
      let formRequest = FormValue.get(this.applicantDetailsForm, true);
      let rej = FormValue.get(this.reviewerRejectionForm, true)

      let req = {
        id: formRequest.id,
        approvedByReviewer: false,
        approvedByProcessor: null,
        reviewerRejectionReason: rej.body,
        processorRejectionReason: null,
        applicationOrigin: formRequest.applicationOrigin,
        applicationType: formRequest.applicationType,
        dateOfBirth: formRequest.dateOfBirth,
        email: formRequest.email,
        firstName: formRequest.firstName,
        gender: formRequest.gender,
        importImg: formRequest.importImg,
        lastName: formRequest.lastName,
        occupation: formRequest.occupation,
        occurence: formRequest.occurence,
        residence: formRequest.residence,
        stateOfOrigin: formRequest.stateOfOrigin
      }

      this.updateData(this.particularReq, req);



      Email.send({
        Host: 'smtp.elasticemail.com',
        Username: 'okipeterovie@gmail.com',
        Password: '44DACDE7E312D9A99C219603DC4928E9383D',
        To: formRequest.email,
        From: `okipeterovie@gmail.com`,
        Subject: 'Rejection',
        Body: `
        <i>
        Your email was rejected because
        </i> <br/> 
        <b>Name: </b>${rej.body} <br /> `
      }).then((message: any) => { console.log(message); });

      this.toastService.showSuccess("Updated Sucessfully!");
      this.router.navigateByUrl("/application-reviewer/dashboard")
    }
  }

  processorAccept() {
    let r = confirm("Are You sure?");
    if (r == true) {
      let formRequest = FormValue.get(this.applicantDetailsForm, true);

      let req = {
        id: formRequest.id,
        approvedByReviewer: this.particularReq.approvedByReviewer,
        approvedByProcessor: true,
        reviewerRejectionReason: this.particularReq.reviewerRejectionReason,
        processorRejectionReason: null,
        applicationOrigin: formRequest.applicationOrigin,
        applicationType: formRequest.applicationType,
        dateOfBirth: formRequest.dateOfBirth,
        email: formRequest.email,
        firstName: formRequest.firstName,
        gender: formRequest.gender,
        importImg: formRequest.importImg,
        lastName: formRequest.lastName,
        occupation: formRequest.occupation,
        occurence: formRequest.occurence,
        residence: formRequest.residence,
        stateOfOrigin: formRequest.stateOfOrigin
      }

      this.updateData(this.particularReq, req);

      this.toastService.showSuccess("Updated Sucessfully!");

      this.router.navigateByUrl("/application-processor/dashboard")

    }
  }

  processorReject() {
    let r = confirm("Are You sure?");
    if (r == true) {
      let formRequest = FormValue.get(this.applicantDetailsForm, true);
      let rej = FormValue.get(this.processorRejectionForm, true)

      let req = {
        id: formRequest.id,
        approvedByReviewer: this.particularReq.approvedByReviewer,
        approvedByProcessor: false,
        reviewerRejectionReason: this.particularReq.reviewerRejectionReason,
        processorRejectionReason: rej.body,
        applicationOrigin: formRequest.applicationOrigin,
        applicationType: formRequest.applicationType,
        dateOfBirth: formRequest.dateOfBirth,
        email: formRequest.email,
        firstName: formRequest.firstName,
        gender: formRequest.gender,
        importImg: formRequest.importImg,
        lastName: formRequest.lastName,
        occupation: formRequest.occupation,
        occurence: formRequest.occurence,
        residence: formRequest.residence,
        stateOfOrigin: formRequest.stateOfOrigin
      }

      this.updateData(this.particularReq, req);



      Email.send({
        Host: 'smtp.elasticemail.com',
        Username: 'okipeterovie@gmail.com',
        Password: '44DACDE7E312D9A99C219603DC4928E9383D',
        To: formRequest.email,
        From: `okipeterovie@gmail.com`,
        Subject: 'Rejection',
        Body: `
        <i>
        Your email was rejected because
        </i> <br/> 
        <b>Name: </b>${rej.body} <br /> `
      }).then((message: any) => { console.log(message); });

      this.toastService.showSuccess("Updated Sucessfully!");
      this.router.navigateByUrl("/application-processor/dashboard")


    }
  }

  updateData(oldEntry: any, newEntry: any) {
    let data = this.getRegistrationRequests
    for (let i = 0; i < data.length; i++) {
      if (data[i].id == oldEntry.id) {
        data[i] = newEntry;
      }
    }
    localStorage.setItem('registrationRequests', JSON.stringify(data));
  }



  goBack() {
    window.history.back();
  }


}
