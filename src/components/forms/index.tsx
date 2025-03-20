import { createFormHook } from '@tanstack/react-form';

import { CheckboxField } from './checkbox-field';
import { fieldContext, formContext } from './form-context';
import { InputField } from './input-field';
import { PasswordField } from './password-field';
import SubmitButton from './submit-button';
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
