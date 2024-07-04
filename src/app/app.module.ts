import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { CustomerModule } from './customer/customer.module';
import { NavbarComponent } from './navbar/navbar.component';
import { DemoPageModule } from './demo-page/demo-page.module';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent, ConfirmationModalComponent],
  imports: [
    BrowserModule,
    NgbModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CustomerModule,
    DemoPageModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
