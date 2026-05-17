import { memo, useCallback } from 'react';
import Badge from '../common/Badge';
import EmptyState from '../common/EmptyState';
import { formatDate, truncate } from '../../utils/formatters';
import { CalendarOff, ChevronLeft, ChevronRight, Copy } from 'lucide-react';
import { toast } from 'react-toastify';

const COLUMNS = [
  { key: 'leaveType',  label: 'Leave Type'  },
  { key: 'dates',      label: 'Dates'       },
  { key: 'appliedOn',  label: 'Applied On'  },
  { key: 'days',       label: 'Days'        },
  { key: 'status',     label: 'Status'      },
  { key: 'reason',     label: 'Reason'      },
];

function LeaveTableRow({ row }) {
  return (
    <tr className="hover:bg-slate-50 transition-colors">
      <td className="px-4 py-3.5 font-medium text-slate-800 whitespace-nowrap">
        <div className="capitalize">{row.leaveType} Leave</div>
        <div className="text-xs text-slate-400 font-normal flex items-center gap-1.5 mt-0.5">
          <span className="font-mono">{row._id.slice(-6).toUpperCase()}</span>
          <button 
            onClick={() => {
              navigator.clipboard.writeText(row._id);
              toast.success('ID copied to clipboard');
            }} 
            title="Copy full ID" 
            className="hover:text-primary-600 transition-colors"
          >
            <Copy className="w-3 h-3" />
          </button>
        </div>
      </td>
      <td className="px-4 py-3.5 text-slate-600 whitespace-nowrap">
        {formatDate(row.startDate, 'dd MMM yyyy')}
        {row.startDate !== row.endDate && (
          <span className="text-slate-400"> – {formatDate(row.endDate, 'dd MMM yyyy')}</span>
        )}
      </td>
      <td className="px-4 py-3.5 text-slate-500 whitespace-nowrap">{formatDate(row.createdAt)}</td>
      <td className="px-4 py-3.5 text-slate-600">{row.totalDays}d</td>
      <td className="px-4 py-3.5">
        <Badge label={row.status} />
      </td>
      <td className="px-4 py-3.5 text-slate-500 max-w-xs">
        <span title={row.reason}>{truncate(row.reason, 55)}</span>
      </td>
    </tr>
  );
}

const MemoRow = memo(LeaveTableRow);

function LeaveTable({ rows = [], page, totalPages, onPageChange }) {
  const handlePrev = useCallback(() => onPageChange(page - 1), [page, onPageChange]);
  const handleNext = useCallback(() => onPageChange(page + 1), [page, onPageChange]);

  if (rows.length === 0) {
    return (
      <EmptyState
        icon={CalendarOff}
        title="No leave requests found"
        description="Try adjusting your search query or apply for leave to get started."
      />
    );
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[720px]">
          <thead>
            <tr className="bg-slate-50 border-y border-slate-200">
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row) => (
              <MemoRow key={row._id} row={row} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200 mt-1">
          <p className="text-xs text-slate-500">
            Page {page} of {totalPages}
          </p>
          <div className="flex items-center gap-1">
            <button
              id="prev-page-btn"
              onClick={handlePrev}
              disabled={page === 1}
              className="p-1.5 rounded-md text-slate-500 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              id="next-page-btn"
              onClick={handleNext}
              disabled={page === totalPages}
              className="p-1.5 rounded-md text-slate-500 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(LeaveTable);
