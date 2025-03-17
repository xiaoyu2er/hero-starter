import { createFormHook } from '@tanstack/react-form';

import { fieldContext, formContext } from './form-context';
import { InputField } from './input-field';
import SubmitButton from './submit-button';
import { PasswordField } from './password-field';
import { CheckboxField } from './checkbox-field';
export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    InputField,
    PasswordField,
    CheckboxField,
  },
  formComponents: {
    SubmitButton,
  },
});
