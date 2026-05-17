import { useState, useMemo, useCallback, useEffect } from 'react';
import { Search } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import Card from '../components/common/Card';
import LeaveTable from '../components/tables/LeaveTable';

import useDebounce from '../hooks/useDebounce';
import { fetchLeaveHistory } from '../services/leaveService';
import { SkeletonRow } from '../components/common/Skeleton';

const PAGE_SIZE = 5;

const ALL_STATUSES = ['All', 'approved', 'pending', 'rejected'];
const LEAVE_TYPES = ['casual', 'sick', 'earned'];

function LeaveHistoryPage() {
  const [requests, setRequests]       = useState([]);
  const [loading, setLoading]         = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter]   = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearch = useDebounce(searchQuery, 250);

  useEffect(() => {
    fetchLeaveHistory()
      .then((data) => setRequests(data))
      .finally(() => setLoading(false));
  }, []);

  const filteredRows = useMemo(() => {
    const q = debouncedSearch.toLowerCase();
    return requests.filter((r) => {
      const matchesSearch =
        !q ||
        r.leaveType.toLowerCase().includes(q) ||
        r.reason.toLowerCase().includes(q) ||
        r.status.toLowerCase().includes(q);
      const matchesStatus = statusFilter === 'All' || r.status === statusFilter;
      const matchesType   = typeFilter === 'All'   || r.leaveType === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [requests, debouncedSearch, statusFilter, typeFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / PAGE_SIZE));

  const pageRows = useMemo(
    () => filteredRows.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
    [filteredRows, currentPage]
  );

  // Reset to page 1 whenever filters change
  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  }, []);

  const handleStatusFilter = useCallback((status) => {
    setStatusFilter(status);
    setCurrentPage(1);
  }, []);

  const handleTypeFilter = useCallback((e) => {
    setTypeFilter(e.target.value);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((p) => setCurrentPage(p), []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Leave History"
        subtitle={`${requests.length} total leave request${requests.length !== 1 ? 's' : ''}`}
      />

      <Card noPadding>
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 px-5 py-4 border-b border-slate-200">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              id="leave-search"
              type="search"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by type, reason, or status…"
              className="input-base pl-9 text-sm"
            />
          </div>

          {/* Type filter */}
          <select
            id="type-filter"
            value={typeFilter}
            onChange={handleTypeFilter}
            className="input-base text-sm w-auto pr-8"
          >
            <option value="All">All Types</option>
            {LEAVE_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          {/* Status pills */}
          <div className="flex items-center gap-1.5">
            {ALL_STATUSES.map((s) => (
              <button
                key={s}
                id={`status-filter-${s.toLowerCase()}`}
                onClick={() => handleStatusFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  statusFilter === s
                    ? 'bg-primary-600 text-white border-primary-600'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Summary bar */}
        <div className="flex items-center gap-4 px-5 py-2.5 bg-slate-50 border-b border-slate-200 text-xs text-slate-500">
          <span>
            Showing <strong className="text-slate-700">{filteredRows.length}</strong> result{filteredRows.length !== 1 ? 's' : ''}
          </span>
          {(statusFilter !== 'All' || typeFilter !== 'All' || debouncedSearch) && (
            <button
              id="clear-filters-btn"
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('All');
                setTypeFilter('All');
                setCurrentPage(1);
              }}
              className="text-primary-600 hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Table */}
        <div className="px-0 py-0">
          {loading ? (
            <table className="w-full text-sm">
              <tbody>
                {Array.from({ length: 5 }).map((_, i) => (
                  <SkeletonRow key={i} />
                ))}
              </tbody>
            </table>
          ) : (
            <LeaveTable
              rows={pageRows}
              page={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </Card>
    </div>
  );
}

export default LeaveHistoryPage;
