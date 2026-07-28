import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOneItemPage } from './view-one';

describe('ViewOne', () => {
  let component: ViewOneItemPage;
  let fixture: ComponentFixture<ViewOneItemPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewOneItemPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewOneItemPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
