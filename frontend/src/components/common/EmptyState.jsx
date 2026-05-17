import { FileX } from 'lucide-react';

/**
 * Displayed when a list or table has no items to show.
 */
function EmptyState({ title = 'No results found', description = '', icon: Icon = FileX }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-slate-400" />
      </div>
      <p className="text-sm font-medium text-slate-700">{title}</p>
      {description && (
        <p className="text-sm text-slate-500 mt-1 max-w-xs">{description}</p>
      )}
    </div>
  );
}

export default EmptyState;
