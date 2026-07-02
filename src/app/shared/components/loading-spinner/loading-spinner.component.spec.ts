import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingSpinnerComponent } from './loading-spinner.component';

describe('LoadingSpinnerComponent', () => {
  let component: LoadingSpinnerComponent;
  let fixture: ComponentFixture<LoadingSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingSpinnerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingSpinnerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default size medium', () => {
    expect(component.size).toBe('medium');
  });

  it('should render spinner', () => {
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.spinner');
    expect(element).toBeTruthy();
  });

  it('should apply small class when size is small', () => {
    component.size = 'small';
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.loading-spinner');
    expect(element.classList.contains('small')).toBe(true);
  });

  it('should apply large class when size is large', () => {
    component.size = 'large';
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.loading-spinner');
    expect(element.classList.contains('large')).toBe(true);
  });
});
