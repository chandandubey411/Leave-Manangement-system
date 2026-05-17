import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarPlus, ClipboardList } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import useLeaveStats from '../hooks/useLeaveStats';
import PageHeader from '../components/common/PageHeader';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import LeaveBalanceCard from '../components/dashboard/LeaveBalanceCard';
import RecentLeaveTable from '../components/dashboard/RecentLeaveTable';
import HolidayList from '../components/dashboard/HolidayList';
import StatsRow from '../components/dashboard/StatsRow';
import { SkeletonCard } from '../components/common/Skeleton';

const MOCK_HOLIDAYS = [
  { id: 'h1', name: 'New Year', date: '2024-01-01', type: 'Public' },
  { id: 'h2', name: 'Independence Day', date: '2024-08-15', type: 'Public' },
  { id: 'h3', name: 'Diwali', date: '2024-11-01', type: 'Public' },
];

function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const stats = useLeaveStats();
  const loading = stats.loading;

  const goToApplyLeave  = useCallback(() => navigate('/apply-leave'),   [navigate]);
  const goToHistory     = useCallback(() => navigate('/leave-history'),  [navigate]);

  const greeting = getGreeting();

  return (
    <div className="space-y-6">
      {/* Page header */}
      <PageHeader
        title={`${greeting}, ${user?.fullName?.split(' ')[0] || 'User'}`}
        subtitle="Here's your leave summary at a glance."
        action={
          <div className="flex items-center gap-3">
            <Button
              id="apply-leave-btn"
              variant="secondary"
              size="sm"
              leftIcon={<ClipboardList className=" w-4 h-4" />}
              onClick={goToHistory}
            >
              View History
            </Button>
            <Button
              id="quick-apply-btn"
              variant="primary"
              size="sm"
              leftIcon={<CalendarPlus className="w-4 h-4" />}
              onClick={goToApplyLeave}
            >
              Apply Leave
            </Button>
          </div>
        }
      />

      {/* Leave balance cards */}
      <section aria-labelledby="balance-heading">
        <h2 id="balance-heading" className="text-sm font-semibold text-slate-700 mb-3">
          Leave Balance
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
            : stats.balanceSummary.map((b) => (
                <LeaveBalanceCard key={b.code} {...b} />
              ))}
        </div>
      </section>

      {/* Stats row */}
      <section aria-labelledby="stats-heading">
        <h2 id="stats-heading" className="text-sm font-semibold text-slate-700 mb-3">
          Leave Statistics
        </h2>
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <StatsRow stats={stats} />
        )}
      </section>

      {/* Recent leaves + upcoming holidays */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent leave requests */}
        <section className="lg:col-span-2" aria-labelledby="recent-heading">
          <Card noPadding>
            <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-slate-100">
              <h2 id="recent-heading" className="text-sm font-semibold text-slate-800">
                Recent Leave Requests
              </h2>
              <button
                id="view-all-btn"
                onClick={goToHistory}
                className="text-xs font-medium text-primary-600 hover:text-primary-700 transition-colors"
              >
                View all →
              </button>
            </div>
            <div className="px-5 pb-5 pt-2">
              <RecentLeaveTable requests={loading ? [] : stats.recentRequests} />
            </div>
          </Card>
        </section>

        {/* Upcoming holidays */}
        <section aria-labelledby="holidays-heading">
          <Card>
            <h2 id="holidays-heading" className="text-sm font-semibold text-slate-800 mb-4">
              Upcoming Holidays
            </h2>
            <HolidayList holidays={MOCK_HOLIDAYS} />
          </Card>
        </section>
      </div>
    </div>
  );
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export default DashboardPage;
