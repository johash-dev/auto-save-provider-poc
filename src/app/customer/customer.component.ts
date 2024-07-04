import { Component } from '@angular/core';
import { CustomerFormData } from './customer-form/customer-model';
import { IRecommendedFieldsGuard } from '../util/can-deactivate.guard';
import { Observable } from 'rxjs';
import { ConfirmationModalService } from '../util/confirmation-modal.service';

interface FormStatus {
  isFormValid: boolean;
  isFormDirty: boolean;
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements IRecommendedFieldsGuard {
  recommendedFieldsFilled: boolean = true;

  constructor(private confirmationModalService: ConfirmationModalService) {}

  onFormValueChanges(formData: CustomerFormData): void {
    console.log('FormValueChanges', formData);
  }

  onSave(formData: CustomerFormData): void {
    console.log('On Save', formData);
  }

  onFormStatusChange(formStatus: FormStatus): void {
    console.log(formStatus);
  }

  onRecommendedFieldsFilled(status: boolean): void {
    console.log('recommendedFieldsFilled', status);
    this.recommendedFieldsFilled = status;
  }

  canLeaveWithRecommendedFields(): Promise<boolean> | boolean {
    if (!this.recommendedFieldsFilled) {
      return this.confirmationModalService.showConfirmationModal();
    } else {
      return true;
    }
  }
}
