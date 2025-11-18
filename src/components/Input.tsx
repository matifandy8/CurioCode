import React from 'react';
import { cn } from '../shared/utils/cn';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: string | boolean;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'w-full px-4 py-3 bg-[#465a7e66] border-2 border-gray-300 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-cyan-300 placeholder-gray-400 transition-all',
          error ? 'border-red-400' : '',
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
