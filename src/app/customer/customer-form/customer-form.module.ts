import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerFormComponent } from './customer-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UtilModule } from '../../util/util.module';

@NgModule({
  declarations: [CustomerFormComponent],
  imports: [CommonModule, ReactiveFormsModule, UtilModule],
  exports: [CustomerFormComponent],
})
export class CustomerFormModule {}
