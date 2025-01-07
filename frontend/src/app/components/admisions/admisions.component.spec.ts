import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmisionsComponent } from './admisions.component';

describe('AdmisionsComponent', () => {
  let component: AdmisionsComponent;
  let fixture: ComponentFixture<AdmisionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmisionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmisionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
