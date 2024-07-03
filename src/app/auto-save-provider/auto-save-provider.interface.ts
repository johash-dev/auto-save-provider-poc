import { FormGroup } from '@angular/forms';
import { ElementRef, EventEmitter, QueryList } from '@angular/core';

interface FormStatus {
  isFormValid: boolean;
  isFormDirty: boolean;
}

export interface IAutoSaveProvider {
  form: FormGroup;
  formInputElements: QueryList<ElementRef>;
  formData: unknown;
  visitedRoutes: string[] | null;

  autoSave: EventEmitter<unknown>;
  formValuesChange: EventEmitter<unknown>;
  formStatus: EventEmitter<FormStatus>;

  validate: () => void;
}
