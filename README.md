# Auto Save Provider POC

A proof-of-concept Angular application that demonstrates a modular, reusable auto-save provider pattern for forms. Includes a confirmation modal, a can-deactivate navigation guard, and a small demo app to showcase the pattern. Suitable for inclusion in a frontend portfolio to highlight advanced Angular patterns and clean architecture.

## Problem solved (UX)

Users frequently lose in-progress form data when navigating away accidentally, closing the tab, or when the browser crashes. This project addresses that by:

- Automatically persisting form changes (auto-save) to avoid data loss.
- Prompting users with a confirmation modal before navigating away when unsaved changes are detected.
- Using a `CanDeactivate` guard to centralize navigation blocking logic across routes.

This improves user trust, reduces frustration, and increases form completion rates in real-world applications.

## Features

- **Auto-Save Provider**: Reusable component/service pattern to auto-save form changes periodically or on change events.
- **Confirmation Modal**: Modal dialog that confirms navigation when there are unsaved changes.
- **CanDeactivate Guard**: Angular guard to prevent accidental navigation and to integrate with the confirmation modal.
- **Dependency Injection (DI) Friendly**: Services and providers are designed for DI so the auto-save behavior can be toggled or replaced at runtime or for testing.
- **Reusable Components**: The auto-save provider and confirmation modal are modular and can be reused across multiple forms and feature modules.
- **Modular Structure**: Feature modules and shared utilities for scalability and team collaboration.
- **Demo Page**: Interactive demo and example `customer` form.

## Technical details

- Auto-save provider exposes a lightweight interface (see `auto-save-provider.interface.ts`) that accepts a form model and save callback. It uses RxJS to debounce changes and trigger saves.
- The provider is provided via Angular DI so you can supply a mock provider during tests or swap in a remote/persistent provider for production.
- The `CanDeactivate` guard (`util/can-deactivate.guard.ts`) reads the form state through the provider or the component's public `hasUnsavedChanges()` method and triggers the confirmation modal when needed.
- The confirmation modal service (`confirmation-modal.service.ts`) returns a `Promise<boolean>` or an `Observable<boolean>` allowing the guard to await user input in a clean, testable way.
- Forms are implemented using Angular Reactive Forms to enable precise change detection and integration with the auto-save logic.
- Styling is done with SCSS and the project follows Angular style best-practices (feature modules, OnPush change detection where applicable, separation of concerns).

## Tech stack

- Angular (TypeScript)
- RxJS for reactive form change handling
- SCSS for styles
- npm for scripts and package management

## Project structure

```
src/
  app/
    auto-save-provider/
      auto-save-provider.component.ts
      auto-save-provider.interface.ts
      auto-save-provider.module.ts
    confirmation-modal/
      confirmation-modal.component.ts
      confirmation-modal.service.ts
    customer/
      customer-form/
        customer-form.component.ts
    demo-page/
    navbar/
    util/
      can-deactivate.guard.ts
      recommended-field.directive.ts
```

## Prerequisites

- Node.js (v16+ recommended)
- npm (v8+ recommended)
- Angular CLI (v16+ recommended)

## Installation

```powershell
npm install
```

## Development (run)

```powershell
npm start
```

Open http://localhost:4200 in your browser.

## Test

```powershell
npm test
```

## Build (production)

```powershell
npm run build
```

## Usage / demo steps

1. Start the app with `npm start`.
2. Open the demo page from the navbar or root route.
3. Edit the example customer form (`src/app/customer/customer-form/`).
4. Attempt to navigate away to see the confirmation modal and the `CanDeactivate` guard behavior.

## Key files

- `src/app/auto-save-provider/auto-save-provider.component.ts` — core auto-save integration
- `src/app/auto-save-provider/auto-save-provider.interface.ts` — provider interfaces
- `src/app/confirmation-modal/confirmation-modal.component.ts` — confirmation modal
- `src/app/confirmation-modal/confirmation-modal.service.ts` — modal service
- `src/app/util/can-deactivate.guard.ts` — navigation guard
- `src/app/customer/customer-form/customer-form.component.ts` — demo form

## License

MIT
