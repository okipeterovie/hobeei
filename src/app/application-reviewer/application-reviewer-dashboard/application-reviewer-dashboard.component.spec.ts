import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationReviewerDashboardComponent } from './application-reviewer-dashboard.component';

describe('ApplicationReviewerDashboardComponent', () => {
  let component: ApplicationReviewerDashboardComponent;
  let fixture: ComponentFixture<ApplicationReviewerDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationReviewerDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationReviewerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
