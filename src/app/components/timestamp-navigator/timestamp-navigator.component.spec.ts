import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimestampNavigatorComponent } from './timestamp-navigator.component';

describe('TimestampNavigatorComponent', () => {
  let component: TimestampNavigatorComponent;
  let fixture: ComponentFixture<TimestampNavigatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimestampNavigatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimestampNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
