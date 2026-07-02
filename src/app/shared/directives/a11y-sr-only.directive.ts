import { Directive } from '@angular/core';

@Directive({
  selector: '[srOnly]',
  standalone: true,
})
export class SrOnlyDirective {
  constructor() {
    // This directive is applied via CSS class
    // The actual styling is in the global styles
  }
}
