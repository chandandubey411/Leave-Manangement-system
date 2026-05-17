import { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { clsx } from '../../utils/clsx';

/**
 * Reusable Select dropdown. Accepts an array of option strings or { value, label } objects.
 */
const Select = forwardRef(function Select(
  { label, id, options = [], placeholder = 'Select…', error, className = '', containerClassName = '', ...props },
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
        <select
          ref={ref}
          id={id}
          className={clsx(
            'input-base appearance-none pr-9 cursor-pointer',
            error && 'input-error',
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => {
            const value = typeof opt === 'string' ? opt : opt.value;
            const label = typeof opt === 'string' ? opt : opt.label;
            return (
              <option key={value} value={value}>
                {label}
              </option>
            );
          })}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
});

export default Select;
