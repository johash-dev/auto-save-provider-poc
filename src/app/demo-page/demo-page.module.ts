import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPageComponent } from './demo-page.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [DemoPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DemoPageComponent,
        pathMatch: 'full',
      },
    ]),
  ],
})
export class DemoPageModule {}
