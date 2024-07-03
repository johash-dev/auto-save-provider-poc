import { Component } from '@angular/core';
import { CustomerFormData } from './customer-form/customer-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'auto-save-provider-poc';
  private formData: CustomerFormData | null = null;

  onFormValueChanges(formData: CustomerFormData): void {
    console.log('FormValueChanges', formData);
    this.formData = formData;
  }

  onSave(formData: CustomerFormData): void {
    console.log('On Save', formData);
  }
}
