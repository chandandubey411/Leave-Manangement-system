import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { Search, Filter, Check, X, Eye, FileText } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import Modal from '../components/common/Modal';
import ConfirmModal from '../components/common/ConfirmModal';
import { SkeletonRow } from '../components/common/Skeleton';
import EmptyState from '../components/common/EmptyState';
import useTableFilters from '../hooks/useTableFilters';
import { fetchAllLeaveRequests, updateLeaveStatus } from '../services/adminService';
import { formatDate } from '../utils/formatters';

export default function ManageLeavesPage() {
  const [leaves, setLeaves] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modals state
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null); // { id, status }
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    let mounted = true;
    const loadLeaves = async () => {
      try {
        const data = await fetchAllLeaveRequests();
        if (mounted) {
          const mappedData = data.map(r => ({
            id: r._id,
            employeeName: r.employee.fullName,
            employeeId: r.employee.employeeId,
            department: r.employee.department,
            leaveType: r.leaveType.charAt(0).toUpperCase() + r.leaveType.slice(1),
            days: r.totalDays,
            startDate: r.startDate,
            endDate: r.endDate,
            status: r.status.charAt(0).toUpperCase() + r.status.slice(1),
            appliedOn: r.createdAt,
            reason: r.reason,
            attachment: r.attachment
          }));
          setLeaves(mappedData);
        }
      } catch (error) {
        toast.error('Failed to load leave requests.');
      } finally {
        if (mounted) setIsLoading(false);
      }
    };
    loadLeaves();
    return () => { mounted = false; };
  }, []);

  const {
    searchQuery,
    handleSearchChange,
    filters,
    handleFilterChange,
    pageData,
    currentPage,
    setCurrentPage,
    totalPages,
    totalItems,
  } = useTableFilters(leaves, 10, ['employeeName', 'employeeId', 'department']);

  const handleActionClick = useCallback((leave, action) => {
    setConfirmAction({ id: leave.id, status: action });
  }, []);

  const executeUpdate = async () => {
    if (!confirmAction) return;
    setIsUpdating(true);
    try {
      const res = await updateLeaveStatus(confirmAction.id, confirmAction.status.toLowerCase());
      if (res.success) {
        setLeaves((prev) => 
          prev.map((l) => (l.id === confirmAction.id ? { ...l, status: confirmAction.status } : l))
        );
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error('Failed to update leave status.');
    } finally {
      setIsUpdating(false);
      setConfirmAction(null);
    }
  };

  const openDetails = useCallback((leave) => {
    setSelectedLeave(leave);
    setIsDetailsOpen(true);
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Manage Leaves" 
        description="Review and process employee leave requests." 
      />

      <Card noPadding>
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50 rounded-t-xl">
          <div className="flex-1 max-w-sm">
            <Input
              placeholder="Search by name, ID or Dept..."
              leftIcon={<Search className="w-4 h-4" />}
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <Filter className="w-4 h-4 text-slate-400" />
            <Select
              className="w-40"
              value={filters.status || 'All'}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              options={['All', 'Pending', 'Approved', 'Rejected']}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="divide-y divide-slate-100">
              {[1, 2, 3, 4, 5].map((i) => <SkeletonRow key={i} />)}
            </div>
          ) : pageData.length === 0 ? (
            <EmptyState 
              title="No leave requests found" 
              message="Adjust your search or filters to see more results." 
            />
          ) : (
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50/50 text-slate-500 font-medium border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Employee</th>
                  <th className="px-6 py-4">Leave Type</th>
                  <th className="px-6 py-4">Duration</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Applied On</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {pageData.map((leave) => (
                  <tr key={leave.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">{leave.employeeName}</div>
                      <div className="text-xs text-slate-500">{leave.employeeId} • {leave.department}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-700">{leave.leaveType}</td>
                    <td className="px-6 py-4">
                      <div className="text-slate-700">{leave.days} Day{leave.days > 1 ? 's' : ''}</div>
                      <div className="text-xs text-slate-500">{formatDate(leave.startDate)}</div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge type={leave.status}>{leave.status}</Badge>
                    </td>
                    <td className="px-6 py-4 text-slate-500">{formatDate(leave.appliedOn)}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => openDetails(leave)}
                          className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-md transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {leave.status === 'Pending' && (
                          <>
                            <button 
                              onClick={() => handleActionClick(leave, 'Approved')}
                              className="p-1.5 text-slate-400 hover:text-green-600 rounded-md transition-colors"
                              title="Approve"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleActionClick(leave, 'Rejected')}
                              className="p-1.5 text-slate-400 hover:text-red-600 rounded-md transition-colors"
                              title="Reject"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {!isLoading && totalPages > 1 && (
          <div className="p-4 border-t border-slate-200 flex items-center justify-between text-sm text-slate-500">
            <div>Showing {pageData.length} of {totalItems} requests</div>
            <div className="flex gap-2">
              <Button 
                variant="secondary" 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
              >
                Previous
              </Button>
              <Button 
                variant="secondary" 
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => p + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Leave Details Modal */}
      <Modal isOpen={isDetailsOpen} onClose={() => setIsDetailsOpen(false)} title="Leave Details">
        {selectedLeave && (
          <div className="space-y-4">
            <div className="flex justify-between items-start pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-semibold text-slate-900">{selectedLeave.employeeName}</h3>
                <p className="text-sm text-slate-500">{selectedLeave.employeeId} • {selectedLeave.department}</p>
              </div>
              <Badge type={selectedLeave.status}>{selectedLeave.status}</Badge>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-500 mb-1">Leave Type</p>
                <p className="font-medium text-slate-900">{selectedLeave.leaveType}</p>
              </div>
              <div>
                <p className="text-slate-500 mb-1">Duration</p>
                <p className="font-medium text-slate-900">{selectedLeave.days} Day(s)</p>
              </div>
              <div>
                <p className="text-slate-500 mb-1">Start Date</p>
                <p className="font-medium text-slate-900">{formatDate(selectedLeave.startDate)}</p>
              </div>
              <div>
                <p className="text-slate-500 mb-1">End Date</p>
                <p className="font-medium text-slate-900">{formatDate(selectedLeave.endDate)}</p>
              </div>
            </div>
            <div>
              <p className="text-slate-500 mb-1 text-sm">Reason</p>
              <p className="text-sm text-slate-800 bg-slate-50 p-3 rounded-lg border border-slate-100">
                {selectedLeave.reason}
              </p>
            </div>
            {selectedLeave.attachment && (
              <div>
                <p className="text-slate-500 mb-1 text-sm">Attachment</p>
                <a 
                  href={`http://localhost:5000/uploads/${selectedLeave.attachment}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-200 rounded-md max-w-sm hover:bg-slate-100 transition-colors"
                >
                  <FileText className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-primary-600 truncate underline">{selectedLeave.attachment}</span>
                </a>
              </div>
            )}
            {selectedLeave.status === 'Pending' && (
              <div className="flex gap-3 pt-4">
                <Button 
                  variant="danger" 
                  className="flex-1"
                  onClick={() => {
                    setIsDetailsOpen(false);
                    handleActionClick(selectedLeave, 'Rejected');
                  }}
                >
                  Reject
                </Button>
                <Button 
                  variant="primary" 
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  onClick={() => {
                    setIsDetailsOpen(false);
                    handleActionClick(selectedLeave, 'Approved');
                  }}
                >
                  Approve
                </Button>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={!!confirmAction}
        onClose={() => setConfirmAction(null)}
        onConfirm={executeUpdate}
        title="Confirm Action"
        message={`Are you sure you want to mark this request as ${confirmAction?.status}?`}
        confirmText={confirmAction?.status}
        isDanger={confirmAction?.status === 'Rejected'}
        isLoading={isUpdating}
      />
    </div>
  );
}
