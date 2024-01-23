import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyplayersPage } from './myplayers.page';

describe('MyplayersPage', () => {
  let component: MyplayersPage;
  let fixture: ComponentFixture<MyplayersPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MyplayersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
