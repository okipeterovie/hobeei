import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-application-processor-dashboard',
  templateUrl: './application-processor-dashboard.component.html',
  styleUrls: ['./application-processor-dashboard.component.css']
})
export class ApplicationProcessorDashboardComponent implements OnInit {

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
      this.registrationRequests = this.getRegistrationRequests.filter(function (el: { approvedByReviewer: boolean; }) {
        return el.approvedByReviewer == true
      });
      this.localData = this.registrationRequests;
      this.getCounts();
    }
  }

  ngOnInit(): void {
  }

  getCounts() {
    this.totalOpenApplications = this.registrationRequests.filter(function (el) {
      return el.approvedByReviewer == true && el.approvedByProcessor != false && el.approvedByProcessor != true
    });

    this.totalApprovedApplications = this.registrationRequests.filter(function (el) {
      return el.approvedByReviewer == true && el.approvedByProcessor == true
    });

    this.totalRejectedApplications = this.registrationRequests.filter(function (el) {
      return el.approvedByReviewer == true && el.approvedByProcessor == false
    });

    this.totalApplications = this.registrationRequests.filter(function (el) {
      return el.approvedByReviewer == true
    });


  }

  filter(event: any) {
    let selected = event.target.value;
    if (selected == 'all') {
      this.localData = this.registrationRequests;
    }
    else if (selected == 'open') {
      this.localData = this.registrationRequests.filter(function (el) {
        return el.approvedByProcessor != false && el.approvedByProcessor != true
      });
    }
    else if (selected == 'approved') {
      this.localData = this.registrationRequests.filter(function (el) {
        return el.approvedByProcessor == true
      });
    }
    else if (selected == 'rejected') {
      this.localData = this.registrationRequests.filter(function (el) {
        return el.approvedByProcessor == false
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
