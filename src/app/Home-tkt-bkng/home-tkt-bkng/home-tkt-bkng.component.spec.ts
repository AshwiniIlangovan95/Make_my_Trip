import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTktBkngComponent } from './home-tkt-bkng.component';

describe('HomeTktBkngComponent', () => {
  let component: HomeTktBkngComponent;
  let fixture: ComponentFixture<HomeTktBkngComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeTktBkngComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeTktBkngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
