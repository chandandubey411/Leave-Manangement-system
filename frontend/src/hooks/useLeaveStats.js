import { useState, useEffect } from 'react';
import { fetchLeaveHistory } from '../services/leaveService';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

/**
 * Derives aggregate leave statistics from the backend leave history and user balance.
 */
function useLeaveStats() {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
    totalDaysTaken: 0,
    balanceSummary: [],
    recentRequests: [],
    loading: true,
  });

  useEffect(() => {
    let mounted = true;
    const loadStats = async () => {
      try {
        const requests = await fetchLeaveHistory();
        if (!mounted) return;

        const total    = requests.length;
        const approved = requests.filter((r) => r.status === 'approved').length;
        const pending  = requests.filter((r) => r.status === 'pending').length;
        const rejected = requests.filter((r) => r.status === 'rejected').length;

        const totalDaysTaken = requests
          .filter((r) => r.status === 'approved')
          .reduce((acc, r) => acc + r.totalDays, 0);

        // Calculate balance summary from user object
        // Assuming base yearly limits: Casual (12), Sick (12), Earned (18)
        const balance = user?.leaveBalance || { casual: 0, sick: 0, earned: 0 };
        const balanceSummary = [
          { code: 'CL', label: 'Casual Leave', total: 12, used: 12 - balance.casual, remaining: balance.casual, percentUsed: Math.round(((12 - balance.casual) / 12) * 100) },
          { code: 'SL', label: 'Sick Leave', total: 12, used: 12 - balance.sick, remaining: balance.sick, percentUsed: Math.round(((12 - balance.sick) / 12) * 100) },
          { code: 'EL', label: 'Earned Leave', total: 18, used: 18 - balance.earned, remaining: balance.earned, percentUsed: Math.round(((18 - balance.earned) / 18) * 100) },
        ];

        const recentRequests = [...requests]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 4)
          .map(r => ({
            id: r._id,
            leaveType: r.leaveType,
            reason: r.reason || 'No reason provided',
            startDate: r.startDate,
            endDate: r.endDate,
            days: r.totalDays,
            status: r.status.charAt(0).toUpperCase() + r.status.slice(1),
            appliedOn: r.createdAt
          }));

        setStats({ total, approved, pending, rejected, totalDaysTaken, balanceSummary, recentRequests, loading: false });
      } catch (error) {
        console.error('Failed to load leave stats', error);
        if (mounted) setStats(prev => ({ ...prev, loading: false }));
      }
    };

    if (user) {
      loadStats();
    }

    return () => { mounted = false; };
  }, [user]);

  return stats;
}

export default useLeaveStats;
