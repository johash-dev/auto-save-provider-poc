import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer.component';
import { AutoSaveProviderModule } from '../auto-save-provider/auto-save-provider.module';
import { CustomerFormModule } from './customer-form/customer-form.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CustomerComponent],
  imports: [
    CommonModule,
    AutoSaveProviderModule,
    CustomerFormModule,
    RouterModule.forChild([
      {
        path: '',
        component: CustomerComponent,
        pathMatch: 'full',
      },
    ]),
  ],
  exports: [CustomerComponent],
})
export class CustomerModule {}
