import { clsx } from '../../utils/clsx';

const statusConfig = {
  Approved: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  Pending:  'bg-amber-50 text-amber-700 border border-amber-200',
  Rejected: 'bg-red-50 text-red-700 border border-red-200',
  National: 'bg-primary-50 text-primary-700 border border-primary-200',
  Festival: 'bg-orange-50 text-orange-700 border border-orange-200',
  Optional: 'bg-slate-100 text-slate-600 border border-slate-200',
};

/**
 * Status badge component. Applies semantic color based on the status label.
 */
function Badge({ label, className = '' }) {
  const classes = statusConfig[label] ?? 'bg-slate-100 text-slate-600 border border-slate-200';
  return (
    <span className={clsx('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', classes, className)}>
      {label}
    </span>
  );
}

export default Badge;
