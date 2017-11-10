import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateShopownerComponent } from './create-shopowner.component';

describe('CreateShopownerComponent', () => {
  let component: CreateShopownerComponent;
  let fixture: ComponentFixture<CreateShopownerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateShopownerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateShopownerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
