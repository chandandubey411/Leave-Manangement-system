import { memo } from 'react';
import Badge from '../common/Badge';
import EmptyState from '../common/EmptyState';
import { formatDate, truncate } from '../../utils/formatters';
import { CalendarClock } from 'lucide-react';

function RecentLeaveTable({ requests = [] }) {

  if (requests.length === 0) {
    return (
      <EmptyState
        icon={CalendarClock}
        title="No leave requests yet"
        description="Your recent leave requests will appear here."
      />
    );
  }

  return (
    <div className="overflow-x-auto -mx-5">
      <table className="w-full text-sm min-w-[540px]">
        <thead>
          <tr className="border-b border-slate-100">
            <th className="text-left px-5 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Type
            </th>
            <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Dates
            </th>
            <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Days
            </th>
            <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Status
            </th>
            <th className="text-left px-5 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Reason
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {requests.map((req) => (
            <tr key={req.id} className="hover:bg-slate-50 transition-colors">
              <td className="px-5 py-3 font-medium text-slate-800">{req.leaveType}</td>
              <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
                {formatDate(req.startDate, 'dd MMM')}
                {req.startDate !== req.endDate && ` – ${formatDate(req.endDate, 'dd MMM yyyy')}`}
                {req.startDate === req.endDate && `, ${formatDate(req.startDate, 'yyyy')}`}
              </td>
              <td className="px-4 py-3 text-slate-600">{req.days}d</td>
              <td className="px-4 py-3">
                <Badge label={req.status} />
              </td>
              <td className="px-5 py-3 text-slate-500">{truncate(req.reason, 48)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default memo(RecentLeaveTable);
