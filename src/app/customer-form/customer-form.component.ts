import { Component, EventEmitter, Output } from '@angular/core';
import { IAutoSaveProvider } from '../auto-save-provider/auto-save-provider.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AUTOSAVEPROVIDER } from '../auto-save-provider/auto-save-provider.token';

interface FormStatus {
  isFormValid: boolean;
  isFormDirty: boolean;
}

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  providers: [
    {
      provide: AUTOSAVEPROVIDER,
      useExisting: CustomerFormComponent,
    },
  ],
})
export class CustomerFormComponent implements IAutoSaveProvider {
  form!: FormGroup;

  @Output()
  autoSave = new EventEmitter();

  @Output()
  formStatus = new EventEmitter<FormStatus>();

  @Output()
  formValuesChange = new EventEmitter();

  validate(): void {
    console.log('validate');
  }

  constructor(private fb: FormBuilder) {
    this.initializeForm();
  }

  initializeForm() {
    this.form = this.fb.group({
      firstName: [null],
      lastName: [null],
      address: [null],
      email: [null, [Validators.email]],
      company: [null],
    });
  }
}
