import {
  AfterContentInit,
  Component,
  ContentChild,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AUTOSAVEPROVIDER } from './auto-save-provider.token';
import { IAutoSaveProvider } from './auto-save-provider.interface';
import { FormGroup } from '@angular/forms';
import { distinctUntilChanged, filter, Subject, takeUntil } from 'rxjs';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-auto-save-provider',
  template: `<div>
    <ng-content></ng-content>
  </div> `,
})
export class AutoSaveProviderComponent
  implements AfterContentInit, OnDestroy, OnInit
{
  @ContentChild(AUTOSAVEPROVIDER)
  autoSaveProvider!: IAutoSaveProvider;

  private unsubscribe = new Subject<void>();

  form!: FormGroup;
  initialValidationsTriggered = false;

  constructor(private router: Router) {}

  ngOnInit() {
    console.log(window.history.state);
  }

  ngAfterContentInit() {
    this.form = this.autoSaveProvider.form;

    this.form.valueChanges
      .pipe(takeUntil(this.unsubscribe), distinctUntilChanged())
      .subscribe((formData) => {
        this.autoSaveProvider.formStatus.emit({
          isFormValid: this.form.valid,
          isFormDirty: this.form.dirty,
        });
        this.autoSaveProvider.formValuesChange.emit(formData);
      });

    this.handleControlInteractions();

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationStart),
        takeUntil(this.unsubscribe),
      )
      .subscribe(() => {
        if (this.form.invalid && (this.form.dirty || this.form.touched)) {
          this.validateForm();
        }
      });
  }

  private handleControlInteractions(): void {
    Object.keys(this.form.controls).forEach((controlName) => {
      const formControl = this.form.get(controlName);

      formControl?.valueChanges
        .pipe(takeUntil(this.unsubscribe), distinctUntilChanged())
        .subscribe((value) => {
          if (formControl && formControl.valid && !this.form.pristine) {
            const formData: unknown = {
              ...this.getValidFields(),
              [controlName]: value,
            };
            this.autoSaveProvider.autoSave.emit(formData);
          }
        });
    });
  }

  private getValidFields(): { [key: string]: any } {
    const validFields: { [key: string]: any } = {};

    Object.keys(this.form.controls).forEach((controlName) => {
      const control = this.form.get(controlName);
      if (control && control.valid) {
        validFields[controlName] = control.value;
      }
    });

    return validFields;
  }

  private triggerInitialValidations() {
    const { visitedRoutes, formData } = this.autoSaveProvider;

    if (
      visitedRoutes?.length &&
      visitedRoutes?.includes(this.router.url) &&
      ((Array.isArray(formData) && formData.length > 0) ||
        (!Array.isArray(formData) && formData !== undefined))
    ) {
      this.validateForm();
      this.initialValidationsTriggered = true;
    }
  }

  private validateForm(): void {
    this.form.markAllAsTouched();
    this.autoSaveProvider.validate();
    this.autoSaveProvider.formStatus.emit({
      isFormValid: this.form.valid,
      isFormDirty: this.form.dirty,
    });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
  }
}
