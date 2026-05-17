import { FileQuestion } from 'lucide-react';

export default function EmptyState({ icon: Icon = FileQuestion, title, message }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-xl border border-slate-200 border-dashed">
      <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-slate-400" />
      </div>
      <h3 className="text-sm font-semibold text-slate-900 mb-1">{title}</h3>
      <p className="text-sm text-slate-500 max-w-sm">{message}</p>
    </div>
  );
}
