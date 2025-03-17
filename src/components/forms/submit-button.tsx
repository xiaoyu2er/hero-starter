import { Button } from '@heroui/react';
import type { ButtonProps } from '@heroui/react';
import { useFormContext } from './form-context';

function SubmitButton(props: ButtonProps) {
  const form = useFormContext();
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button
          type="submit"
          disabled={isSubmitting}
          isLoading={isSubmitting}
          {...props}
        />
      )}
    </form.Subscribe>
  );
}

export default SubmitButton;
