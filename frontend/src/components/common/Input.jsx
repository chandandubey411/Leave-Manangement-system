import { forwardRef } from 'react';
import { clsx } from '../../utils/clsx';

/**
 * Controlled Input with optional label, error message, and left/right adornments.
 */
const Input = forwardRef(function Input(
  {
    label,
    id,
    error,
    helperText,
    leftAdornment,
    rightAdornment,
    className = '',
    containerClassName = '',
    ...props
  },
  ref
) {
  return (
    <div className={clsx('flex flex-col gap-1.5', containerClassName)}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <div className="relative">
        {leftAdornment && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {leftAdornment}
          </span>
        )}
        <input
          ref={ref}
          id={id}
          className={clsx(
            'input-base',
            leftAdornment && 'pl-9',
            rightAdornment && 'pr-9',
            error && 'input-error',
            className
          )}
          {...props}
        />
        {rightAdornment && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
            {rightAdornment}
          </span>
        )}
      </div>
      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-xs text-slate-500">{helperText}</p>
      )}
    </div>
  );
});

export default Input;
