import { Loader2 } from 'lucide-react';

export default function PageLoader() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <Loader2 className="w-8 h-8 text-primary-500 animate-spin mb-4" />
      <p className="text-sm text-slate-500 font-medium">Loading...</p>
    </div>
  );
}
