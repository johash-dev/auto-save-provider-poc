import { FormGroup } from '@angular/forms';
import { EventEmitter } from '@angular/core';

interface FormStatus {
  isFormValid: boolean;
  isFormDirty: boolean;
}

export interface IAutoSaveProvider {
  form: FormGroup;
  autoSave: EventEmitter<unknown>;
  formValuesChange: EventEmitter<unknown>;
  formStatus: EventEmitter<FormStatus>;

  validate: () => void;
}
