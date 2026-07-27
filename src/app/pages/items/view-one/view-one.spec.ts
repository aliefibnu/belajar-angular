import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOne } from './view-one';

describe('ViewOne', () => {
  let component: ViewOne;
  let fixture: ComponentFixture<ViewOne>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewOne],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewOne);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
