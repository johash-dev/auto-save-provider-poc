import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { IAutoSaveProvider } from '../../auto-save-provider/auto-save-provider.interface';
import {
  FormBuilder,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AUTOSAVEPROVIDER } from '../../auto-save-provider/auto-save-provider.token';
import { CustomerFormData } from './customer-model';

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

  recommendedFields = ['firstName', 'lastName'];

  @Input()
  formData!: CustomerFormData | null | undefined;

  @Input()
  visitedRoutes: string[] | null = [];

  @Output()
  autoSave = new EventEmitter();

  @Output()
  formStatus = new EventEmitter<FormStatus>();

  @Output()
  formValuesChange = new EventEmitter();

  @Output()
  recommendedFieldsFilled = new EventEmitter();

  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements!: QueryList<ElementRef>;

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
