import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[answer]'
})
export class AnswerDirective {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  @HostListener('click', ['$event'])
  onClick() {
    this.renderer.addClass(this.elementRef.nativeElement, 'active');
  }

}
