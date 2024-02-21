import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  standalone: false,
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(
    private renderer:Renderer2,
    private el:ElementRef
  ) {
    this.unsetHighlight();
  }

  @HostListener('mouseenter') onMouseEnter(){
    this.setHighlight();
  }

  @HostListener('mouseleave') onMouseLeave(){
    this.unsetHighlight();
  }

  private setHighlight(){
    this.renderer.addClass(this.el.nativeElement, 'highlight');
  }
  private unsetHighlight(){
    this.renderer.removeClass(this.el.nativeElement, 'highlight');
    }
}
