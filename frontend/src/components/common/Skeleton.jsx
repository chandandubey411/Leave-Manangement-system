import { clsx } from '../../utils/clsx';

/**
 * Skeleton loader for placeholder content while data is loading.
 * Pass className to control size and shape.
 */
function Skeleton({ className = '' }) {
  return (
    <div
      className={clsx('animate-pulse rounded bg-slate-200', className)}
      aria-hidden="true"
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-card p-5 space-y-3">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-8 w-16 mt-1" />
      <Skeleton className="h-3 w-32" />
      <Skeleton className="h-2 w-full rounded-full mt-2" />
    </div>
  );
}

export function SkeletonRow() {
  return (
    <tr>
      {Array.from({ length: 5 }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <Skeleton className="h-4 w-full" />
        </td>
      ))}
    </tr>
  );
}

export default Skeleton;
