import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsAcademicComponent } from './events-academic.component';

describe('EventsAcademicComponent', () => {
  let component: EventsAcademicComponent;
  let fixture: ComponentFixture<EventsAcademicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsAcademicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventsAcademicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
