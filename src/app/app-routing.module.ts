import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { DemoPageComponent } from './demo-page/demo-page.component';
import { recommendedFieldsGuard } from './util/can-deactivate.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'customer',
    component: CustomerComponent,
    canDeactivate: [recommendedFieldsGuard],
  },
  { path: 'demo', component: DemoPageComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
