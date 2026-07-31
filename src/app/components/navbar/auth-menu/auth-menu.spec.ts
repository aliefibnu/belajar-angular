import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthMenu } from './auth-menu';

describe('AuthMenu', () => {
  let component: AuthMenu;
  let fixture: ComponentFixture<AuthMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthMenu],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthMenu);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
