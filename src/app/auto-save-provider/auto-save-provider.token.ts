import { InjectionToken } from '@angular/core';
import { IAutoSaveProvider } from './auto-save-provider.interface';

export const AUTOSAVEPROVIDER = new InjectionToken<IAutoSaveProvider>(
  'AUTOSAVEPROVIDER',
);
