import { memo } from 'react';

const colorMap = {
  blue:    { bg: 'bg-blue-50',    text: 'text-blue-700',    bar: 'bg-blue-500'    },
  amber:   { bg: 'bg-amber-50',   text: 'text-amber-700',   bar: 'bg-amber-500'   },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-700', bar: 'bg-emerald-500' },
};

function LeaveBalanceCard({ type, code, total, used, remaining, color, percentUsed }) {
  const c = colorMap[color] ?? colorMap.blue;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-card p-5">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{type}</p>
          <p className="text-2xl font-bold text-slate-900 mt-0.5">{remaining}</p>
          <p className="text-xs text-slate-500 mt-0.5">days remaining</p>
        </div>
        <div className={`w-10 h-10 rounded-lg ${c.bg} flex items-center justify-center`}>
          <span className={`text-sm font-bold ${c.text}`}>{code}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-slate-500">{used} used of {total}</span>
          <span className="text-xs font-medium text-slate-600">{percentUsed}%</span>
        </div>
        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full ${c.bar} rounded-full transition-all duration-500`}
            style={{ width: `${percentUsed}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default memo(LeaveBalanceCard);
