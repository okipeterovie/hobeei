import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationProcessorDashboardComponent } from './application-processor-dashboard.component';

describe('ApplicationProcessorDashboardComponent', () => {
  let component: ApplicationProcessorDashboardComponent;
  let fixture: ComponentFixture<ApplicationProcessorDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationProcessorDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationProcessorDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
