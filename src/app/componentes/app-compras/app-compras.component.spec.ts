import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AppComprasComponent } from './app-compras.component';

describe('AppComprasComponent', () => {
  let component: AppComprasComponent;
  let fixture: ComponentFixture<AppComprasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AppComprasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
