import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Search, Building, Mail } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import { SkeletonRow } from '../components/common/Skeleton';
import EmptyState from '../components/common/EmptyState';
import useTableFilters from '../hooks/useTableFilters';
import { fetchEmployees } from '../services/adminService';
import { getInitials } from '../utils/formatters';

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const loadData = async () => {
      try {
        const data = await fetchEmployees();
        if (mounted) setEmployees(data);
      } catch {
        toast.error('Failed to load employees.');
      } finally {
        if (mounted) setIsLoading(false);
      }
    };
    loadData();
    return () => { mounted = false; };
  }, []);

  const {
    searchQuery,
    handleSearchChange,
    pageData,
  } = useTableFilters(employees, 50, ['name', 'id', 'department', 'email']);

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Employees Directory" 
        description="View and manage employee leave balances and details." 
      />

      <Card noPadding>
        <div className="p-4 border-b border-slate-200 bg-slate-50 rounded-t-xl">
          <Input
            className="max-w-md"
            placeholder="Search employees..."
            leftIcon={<Search className="w-4 h-4" />}
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="divide-y divide-slate-100">
              {[1, 2, 3, 4].map((i) => <SkeletonRow key={i} />)}
            </div>
          ) : pageData.length === 0 ? (
            <EmptyState 
              title="No employees found" 
              message="No employees match your current search criteria." 
            />
          ) : (
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50/50 text-slate-500 font-medium border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Employee</th>
                  <th className="px-6 py-4">Contact</th>
                  <th className="px-6 py-4 text-center">Total Leaves</th>
                  <th className="px-6 py-4 text-center">Remaining</th>
                  <th className="px-6 py-4 text-center">Used</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {pageData.map((emp) => (
                  <tr key={emp.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-700 font-semibold flex items-center justify-center text-sm flex-shrink-0">
                          {getInitials(emp.name)}
                        </div>
                        <div>
                          <div className="font-medium text-slate-900">{emp.name}</div>
                          <div className="text-xs text-slate-500">{emp.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-600 mb-1">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        <span>{emp.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Building className="w-3.5 h-3.5 text-slate-400" />
                        <span>{emp.department}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-block px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-medium">
                        {emp.totalLeaves}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-block px-2.5 py-1 rounded bg-green-50 text-green-700 font-medium">
                        {emp.remainingLeaves}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-slate-600">
                      {emp.totalLeaves - emp.remainingLeaves}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Card>
    </div>
  );
}
