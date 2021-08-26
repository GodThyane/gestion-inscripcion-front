import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInscComponent } from './add-insc.component';

describe('AddInscComponent', () => {
  let component: AddInscComponent;
  let fixture: ComponentFixture<AddInscComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInscComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
