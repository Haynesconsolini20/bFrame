import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwittercomponentComponent } from './twittercomponent.component';

describe('TwittercomponentComponent', () => {
  let component: TwittercomponentComponent;
  let fixture: ComponentFixture<TwittercomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwittercomponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TwittercomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
