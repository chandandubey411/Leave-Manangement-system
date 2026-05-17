import { useState, useEffect } from 'react';
import { fetchDashboardAnalytics } from '../services/adminService';

export default function useLeaveAnalytics() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    const loadAnalytics = async () => {
      try {
        setIsLoading(true);
        const res = await fetchDashboardAnalytics();
        if (isMounted) {
          setData(res);
        }
      } catch (error) {
        console.error('Failed to load analytics', error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadAnalytics();

    return () => {
      isMounted = false;
    };
  }, []);

  return { data, isLoading };
}
