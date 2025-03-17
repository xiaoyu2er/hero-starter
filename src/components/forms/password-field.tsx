import type { InputProps } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { InputField } from './input-field';

export const PasswordField = (props: InputProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <InputField
      type={isVisible ? 'text' : 'password'}
      endContent={
        <button type="button" onClick={toggleVisibility}>
          {isVisible ? (
            <Icon
              className="pointer-events-none h-4 w-4 text-2xl text-default-400"
              icon="solar:eye-closed-linear"
            />
          ) : (
            <Icon
              className="pointer-events-none h-4 w-4 text-2xl text-default-400"
              icon="solar:eye-bold"
            />
          )}
        </button>
      }
      {...props}
    />
  );
};
