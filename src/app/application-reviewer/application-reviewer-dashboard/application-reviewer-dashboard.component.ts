import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-application-reviewer-dashboard',
  templateUrl: './application-reviewer-dashboard.component.html',
  styleUrls: ['./application-reviewer-dashboard.component.css']
})
export class ApplicationReviewerDashboardComponent implements OnInit {

  registrationRequests: any[] = [];
  localData: any[] = [];

  tablePage: number = 1;
  tablePageSize: number = 5;

  totalApplications: any[] = [];
  totalOpenApplications: any[] = [];
  totalApprovedApplications: any[] = [];
  totalRejectedApplications: any[] = [];


  constructor(private router: Router,
    private route: ActivatedRoute,) {
    if ("registrationRequests" in localStorage) {
      this.registrationRequests = this.getRegistrationRequests;
      this.localData = this.registrationRequests;
      this.getCounts();
    }

  }

  ngOnInit(): void {
  }

  getCounts() {
    this.totalOpenApplications = this.registrationRequests.filter(function (el) {
      return el.approvedByReviewer == null
    });

    this.totalApprovedApplications = this.registrationRequests.filter(function (el) {
      return el.approvedByReviewer == true
    });

    this.totalRejectedApplications = this.registrationRequests.filter(function (el) {
      return el.approvedByReviewer == false
    });

    this.totalApplications = this.registrationRequests;

  }

  filter(event: any) {
    let selected = event.target.value;
    if (selected == 'all') {
      this.localData = this.registrationRequests;
    }
    else if (selected == 'open') {
      this.localData = this.registrationRequests.filter(function (el) {
        return el.approvedByReviewer != true && el.approvedByReviewer != false
      });
    }
    else if (selected == 'approved') {
      this.localData = this.registrationRequests.filter(function (el) {
        return el.approvedByReviewer == true
      });
    }
    else if (selected == 'rejected') {
      this.localData = this.registrationRequests.filter(function (el) {
        return el.approvedByReviewer == false
      });
    }

  }

  get getRegistrationRequests() {
    let pi = localStorage.getItem("registrationRequests");
    let registrationRequests = JSON.parse(pi == null ? "{}" : pi);
    return registrationRequests;
  }

  action(id: any) {
    this.router.navigateByUrl("applicant/view/" + id)

  }

  getTotal(arrayValue: any[], columnName: string): number {
    let total = 0;
    arrayValue.forEach((data) => {
      total += data[columnName]
    })
    return total;
  }

}
