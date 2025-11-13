import React from 'react';

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  required?: boolean;
};

export function Label({ children, required, className, ...props }: LabelProps) {
  return (
    <label {...props} className={`${className ?? ''} block text-sm font-medium text-gray-200 mb-2`}>
      {children} {required ? <span className="text-red-400">*</span> : null}
    </label>
  );
}
