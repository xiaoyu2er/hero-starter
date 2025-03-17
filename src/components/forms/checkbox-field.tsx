import { Checkbox, type CheckboxProps } from '@heroui/react';
import { useFieldContext } from './form-context';

export const CheckboxField = (props: CheckboxProps) => {
  const field = useFieldContext<boolean>();
  const isInvalid = !!field.state.meta.errors.length;
  return (
    <Checkbox
      aria-label={field.name}
      isSelected={field.state.value}
      isInvalid={isInvalid}
      onValueChange={field.setValue}
      classNames={{}}
      {...props}
    />
  );
};
