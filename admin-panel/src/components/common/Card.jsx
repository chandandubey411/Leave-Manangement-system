import { clsx } from '../../utils/clsx';

export default function Card({ children, className, noPadding = false }) {
  return (
    <div className={clsx('bg-white rounded-xl border border-slate-200 shadow-card', !noPadding && 'p-6', className)}>
      {children}
    </div>
  );
}
