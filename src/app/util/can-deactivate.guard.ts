import { CanDeactivateFn } from '@angular/router';

export interface IRecommendedFieldsGuard {
  canLeaveWithRecommendedFields?: () => Promise<boolean> | boolean;
}

export const recommendedFieldsGuard: CanDeactivateFn<
  IRecommendedFieldsGuard
> = (component: IRecommendedFieldsGuard) => {
  return component.canLeaveWithRecommendedFields
    ? component.canLeaveWithRecommendedFields()
    : true;
};
