import { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';
import { clsx } from '../../utils/clsx';

const variantClasses = {
  primary:   'btn-primary',
  secondary: 'btn-secondary',
  ghost:     'btn-ghost',
  danger:    'inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-150',
};

const sizeClasses = {
  sm:  'px-3 py-1.5 text-xs',
  md:  '',
  lg:  'px-5 py-3 text-base',
};

/**
 * Reusable Button component with variant, size, loading, and icon support.
 */
const Button = forwardRef(function Button(
  {
    children,
    variant = 'primary',
    size = 'md',
    loading = false,
    leftIcon,
    rightIcon,
    className = '',
    ...props
  },
  ref
) {
  return (
    <button
      ref={ref}
      disabled={loading || props.disabled}
      className={clsx(variantClasses[variant], sizeClasses[size], className)}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : leftIcon ? (
        leftIcon
      ) : null}
      {children}
      {!loading && rightIcon}
    </button>
  );
});

export default Button;
