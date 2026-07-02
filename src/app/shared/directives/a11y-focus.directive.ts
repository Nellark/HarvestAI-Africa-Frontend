import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[a11yFocus]',
  standalone: true,
})
export class A11yFocusDirective {
  private el = inject(ElementRef<HTMLElement>);

  @HostListener('keydown.enter', ['$event'])
  @HostListener('keydown.space', ['$event'])
  onEnter(event: Event) {
    // Prevent default behavior for space/enter on clickable elements
    if (this.el.nativeElement.getAttribute('role') === 'button') {
      event.preventDefault();
      this.el.nativeElement.click();
    }
  }

  @HostListener('keydown.tab', ['$event'])
  onTab(event: Event) {
    // Add visual focus indicator
    this.el.nativeElement.classList.add('keyboard-focus');
  }

  @HostListener('blur')
  onBlur() {
    this.el.nativeElement.classList.remove('keyboard-focus');
  }
}
