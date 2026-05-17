import { clsx } from '../../utils/clsx';

/**
 * Base Card component with optional padding and shadow.
 */
function Card({ children, className = '', noPadding = false }) {
  return (
    <div
      className={clsx(
        'bg-white rounded-xl border border-slate-200 shadow-card',
        !noPadding && 'p-5',
        className
      )}
    >
      {children}
    </div>
  );
}

export default Card;
