import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecommendedFieldDirective } from './recommended-field.directive';

@NgModule({
  declarations: [RecommendedFieldDirective],
  imports: [CommonModule],
  exports: [RecommendedFieldDirective],
})
export class UtilModule {}
