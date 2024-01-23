import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerInfoPage } from './player-info.page';

describe('PlayerInfoPage', () => {
  let component: PlayerInfoPage;
  let fixture: ComponentFixture<PlayerInfoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PlayerInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
