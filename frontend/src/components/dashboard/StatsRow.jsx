import { memo } from 'react';
import { CheckCircle, Clock, XCircle, Briefcase } from 'lucide-react';

const statItems = [
  { label: 'Total Applied',  key: 'total',         icon: Briefcase,    color: 'text-slate-600', bg: 'bg-slate-100'   },
  { label: 'Approved',       key: 'approved',       icon: CheckCircle,  color: 'text-emerald-600', bg: 'bg-emerald-50'  },
  { label: 'Pending',        key: 'pending',        icon: Clock,        color: 'text-amber-600', bg: 'bg-amber-50'    },
  { label: 'Rejected',       key: 'rejected',       icon: XCircle,      color: 'text-red-600',   bg: 'bg-red-50'      },
];

function StatsRow({ stats }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {statItems.map(({ label, key, icon: Icon, color, bg }) => (
        <div
          key={key}
          className="bg-white rounded-xl border border-slate-200 shadow-card p-4 flex items-center gap-3"
        >
          <div className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center shrink-0`}>
            <Icon className={`w-[18px] h-[18px] ${color}`} />
          </div>
          <div>
            <p className="text-xl font-bold text-slate-900">{stats[key]}</p>
            <p className="text-xs text-slate-500">{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default memo(StatsRow);
