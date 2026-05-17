import { memo } from 'react';
import { CalendarDays } from 'lucide-react';
import Badge from '../common/Badge';
import { formatDate } from '../../utils/formatters';

function HolidayList({ holidays = [] }) {
  return (
    <ul className="divide-y divide-slate-100">
      {holidays.map((holiday) => (
        <li key={holiday.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
              <CalendarDays className="w-4 h-4 text-slate-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-800">{holiday.name}</p>
              <p className="text-xs text-slate-500">
                {formatDate(holiday.date)} · {holiday.day}
              </p>
            </div>
          </div>
          <Badge label={holiday.type} />
        </li>
      ))}
    </ul>
  );
}

export default memo(HolidayList);
