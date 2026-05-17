import { clsx } from '../../utils/clsx';

export function Skeleton({ className }) {
  return <div className={clsx('animate-pulse bg-slate-200 rounded', className)} />;
}

export function SkeletonCard() {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-card">
      <Skeleton className="h-4 w-1/3 mb-4" />
      <Skeleton className="h-8 w-1/2 mb-2" />
      <Skeleton className="h-3 w-1/4" />
    </div>
  );
}

export function SkeletonRow() {
  return (
    <div className="flex items-center justify-between p-4 border-b border-slate-100">
      <div className="flex items-center gap-4 w-1/2">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2 w-full">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <Skeleton className="h-6 w-20 rounded-full" />
      <Skeleton className="h-8 w-8 rounded-lg" />
    </div>
  );
}
