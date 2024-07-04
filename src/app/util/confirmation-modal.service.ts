import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationModalService {
  private _confirmationModalRef!: NgbModalRef;

  get confirmationModalRef() {
    return this._confirmationModalRef;
  }

  set confirmationModalRef(ref: NgbModalRef) {
    this._confirmationModalRef = ref;
  }

  get refModalInstanceResult() {
    return this.confirmationModalRef.result;
  }

  openDialog() {
    this.confirmationModalRef = this.ngbModelService.open(
      ConfirmationModalComponent,
      { centered: true, backdrop: 'static' },
    );
  }

  constructor(private ngbModelService: NgbModal) {}

  showConfirmationModal() {
    this.openDialog();
    return this.refModalInstanceResult.then(
      () => false,
      () => true,
    );
  }
}
