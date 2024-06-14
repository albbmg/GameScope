import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageVideoGamesComponent } from './manage-video-games.component';

describe('ManageVideoGamesComponent', () => {
  let component: ManageVideoGamesComponent;
  let fixture: ComponentFixture<ManageVideoGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageVideoGamesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageVideoGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
