import { clsx } from '../../utils/clsx';

const typeColors = {
  // Statuses
  Approved: 'bg-green-50 text-green-700 border-green-200',
  Pending:  'bg-amber-50 text-amber-700 border-amber-200',
  Rejected: 'bg-red-50 text-red-700 border-red-200',
  
  // Leave Types
  'Casual Leave': 'bg-blue-50 text-blue-700 border-blue-200',
  'Sick Leave':   'bg-purple-50 text-purple-700 border-purple-200',
  'Earned Leave': 'bg-teal-50 text-teal-700 border-teal-200',
  
  // Default
  default:  'bg-slate-100 text-slate-700 border-slate-200',
};

export default function Badge({ children, type, className }) {
  const colorClass = typeColors[type] || typeColors.default;

  return (
    <span
      className={clsx(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        colorClass,
        className
      )}
    >
      {children}
    </span>
  );
}
