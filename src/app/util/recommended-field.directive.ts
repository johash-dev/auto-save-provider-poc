import {
  Directive,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Directive({
  selector: '[appRecommendedField]',
})
export class RecommendedFieldDirective implements OnInit, OnDestroy {
  private control!: NgControl;
  private unsubscribe = new Subject<void>();

  private readonly infoParagraph = `<p class="recommended-field-error"><span><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.73034 0.789054C7.90756 0.752607 8.09033 0.752607 8.26755 0.789054C8.47239 0.831185 8.65549 0.933736 8.80105 1.01527L8.84072 1.03743L13.7741 3.77817L13.8162 3.80142C13.9702 3.88629 14.164 3.993 14.3128 4.15446C14.4414 4.29404 14.5387 4.45948 14.5983 4.63972C14.6672 4.84819 14.6664 5.06938 14.6657 5.24529L14.6656 5.29338V10.7048L14.6657 10.7529C14.6664 10.9288 14.6672 11.15 14.5983 11.3584C14.5387 11.5387 14.4414 11.7041 14.3128 11.8437C14.164 12.0051 13.9703 12.1119 13.8162 12.1967L13.7741 12.22L8.84072 14.9607L8.80105 14.9829C8.65549 15.0644 8.4724 15.167 8.26755 15.2091C8.09033 15.2456 7.90756 15.2456 7.73034 15.2091C7.52549 15.167 7.34239 15.0644 7.19683 14.9829L7.15716 14.9607L2.22383 12.22L2.18174 12.1967C2.02766 12.1119 1.8339 12.0051 1.68512 11.8437C1.55649 11.7041 1.45914 11.5387 1.39959 11.3584C1.33071 11.15 1.33152 10.9288 1.33216 10.7529L1.33228 10.7048V5.29338L1.33216 5.24529C1.33152 5.06938 1.33071 4.84819 1.39959 4.63972C1.45914 4.45948 1.55649 4.29404 1.68512 4.15446C1.83391 3.993 2.02765 3.88629 2.18174 3.80142L2.22383 3.77817L7.15716 1.03743L7.19684 1.01526C7.3424 0.933736 7.52549 0.831185 7.73034 0.789054ZM7.99894 7.33236C8.36713 7.33236 8.66561 7.63083 8.66561 7.99902V10.6657C8.66561 11.0339 8.36713 11.3324 7.99894 11.3324C7.63075 11.3324 7.33228 11.0339 7.33228 10.6657V7.99902C7.33228 7.63083 7.63075 7.33236 7.99894 7.33236ZM7.99894 4.66569C7.63075 4.66569 7.33228 4.96417 7.33228 5.33236C7.33228 5.70055 7.63075 5.99902 7.99894 5.99902H8.00561C8.3738 5.99902 8.67228 5.70055 8.67228 5.33236C8.67228 4.96417 8.3738 4.66569 8.00561 4.66569H7.99894Z" fill="#1049CD"/>
</svg></span>  We recommend that this question should be answered</p>`;

  constructor(
    private ngControl: NgControl,
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngOnInit() {
    if (this.ngControl) {
      this.control = this.ngControl;
      this.renderer.listen(this.el.nativeElement, 'blur', () => {
        const parentElement = this.el.nativeElement.parentElement;
        const recommendedFieldDiv =
          parentElement.querySelector('.recommended-field');
        if (recommendedFieldDiv) {
          if (this.control.value === null || this.control.value === '') {
            recommendedFieldDiv.innerHTML = this.infoParagraph;
            this.renderer.addClass(this.el.nativeElement, 'is-recommended');
          } else {
            recommendedFieldDiv.innerHTML = '';
            this.renderer.removeClass(this.el.nativeElement, 'is-recommended');
          }
        }
      });
      this.handleValueChanges();
    }
  }

  handleValueChanges(): void {
    this.control.valueChanges
      ?.pipe(takeUntil(this.unsubscribe))
      .subscribe((value) => {
        const parentElement = this.el.nativeElement.parentElement;
        const recommendedFieldDiv =
          parentElement.querySelector('.recommended-field');
        if (value !== null && value !== '') {
          recommendedFieldDiv.innerHTML = '';
          this.renderer.removeClass(this.el.nativeElement, 'is-recommended');
        } else {
          recommendedFieldDiv.innerHTML = this.infoParagraph;
          this.renderer.addClass(this.el.nativeElement, 'is-recommended');
        }
      });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
