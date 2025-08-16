import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeraThree } from './pera-three';

describe('PeraThree', () => {
  let component: PeraThree;
  let fixture: ComponentFixture<PeraThree>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeraThree]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeraThree);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
