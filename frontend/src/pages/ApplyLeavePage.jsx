import { useState, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import { CalendarDays, Phone, FileText, Info } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import { applyForLeave } from '../services/leaveService';
import { calcLeaveDays } from '../utils/formatters';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

const LEAVE_TYPES = [
  { value: 'casual', label: 'Casual Leave' },
  { value: 'sick', label: 'Sick Leave' },
  { value: 'earned', label: 'Earned Leave' },
];

function ApplyLeavePage() {
  const { user } = useContext(AuthContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      leaveType:        '',
      startDate:        '',
      endDate:          '',
      reason:           '',
      emergencyContact: '',
    },
  });

  const startDate = watch('startDate');
  const endDate   = watch('endDate');
  const selectedLeaveType = watch('leaveType');
  const leaveDays = startDate && endDate ? calcLeaveDays(startDate, endDate) : 0;

  const onSubmit = useCallback(async (data) => {
    setIsSubmitting(true);
    try {
      let payload = { ...data };
      
      // If there's an attachment, we need to send as FormData
      if (data.attachment && data.attachment.length > 0) {
        const formData = new FormData();
        formData.append('leaveType', data.leaveType);
        formData.append('startDate', data.startDate);
        formData.append('endDate', data.endDate);
        formData.append('reason', data.reason);
        formData.append('emergencyContact', data.emergencyContact);
        formData.append('attachment', data.attachment[0]);
        payload = formData;
      } else {
        delete payload.attachment;
      }
      
      const result = await applyForLeave(payload);
      if (result.success) {
        toast.success('Leave application submitted successfully!');
        reset();
      } else {
        toast.error(result.message || 'Submission failed. Please try again.');
      }
    } catch {
      toast.error('Network error. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  }, [reset]);

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Apply for Leave"
        subtitle="Submit a new leave request. Your manager will be notified."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form card */}
        <div className="lg:col-span-2">
          <Card>
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
              {/* Leave type */}
              <Controller
                name="leaveType"
                control={control}
                rules={{ required: 'Please select a leave type' }}
                render={({ field }) => (
                  <Select
                    id="leave-type"
                    label="Leave Type"
                    options={LEAVE_TYPES}
                    placeholder="Select leave type"
                    error={errors.leaveType?.message}
                    {...field}
                  />
                )}
              />

              {/* Date range */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  id="start-date"
                  type="date"
                  label="Start Date"
                  min={today}
                  error={errors.startDate?.message}
                  leftAdornment={<CalendarDays className="w-4 h-4" />}
                  {...register('startDate', {
                    required: 'Start date is required',
                  })}
                />
                <Input
                  id="end-date"
                  type="date"
                  label="End Date"
                  min={startDate || today}
                  error={errors.endDate?.message}
                  leftAdornment={<CalendarDays className="w-4 h-4" />}
                  {...register('endDate', {
                    required: 'End date is required',
                    validate: (val) =>
                      !startDate || val >= startDate
                        ? true
                        : 'End date cannot be before start date',
                  })}
                />
              </div>

              {/* Duration preview */}
              {leaveDays > 0 && (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 p-3 bg-primary-50 rounded-lg border border-primary-100">
                    <Info className="w-4 h-4 text-primary-600 shrink-0" />
                    <p className="text-sm text-primary-700">
                      Duration:{' '}
                      <strong>
                        {leaveDays} {leaveDays === 1 ? 'day' : 'days'}
                      </strong>
                    </p>
                  </div>
                  {selectedLeaveType && leaveDays > (user?.leaveBalance?.[selectedLeaveType] || 0) && (
                    <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg border border-red-100">
                      <Info className="w-4 h-4 text-red-600 shrink-0" />
                      <p className="text-sm text-red-700">
                        <strong>Warning:</strong> Requested duration exceeds your available {LEAVE_TYPES.find(t => t.value === selectedLeaveType)?.label || 'leave'} balance ({user?.leaveBalance?.[selectedLeaveType] || 0} days).
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Reason */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="reason" className="text-sm font-medium text-slate-700">
                  Reason for Leave
                </label>
                <div className="relative">
                  <textarea
                    id="reason"
                    rows={4}
                    placeholder="Briefly describe the reason for your leave…"
                    className={`input-base resize-none ${errors.reason ? 'input-error' : ''}`}
                    {...register('reason', {
                      required: 'Reason is required',
                      minLength: {
                        value: 20,
                        message: 'Please provide at least 20 characters',
                      },
                      maxLength: {
                        value: 400,
                        message: 'Reason cannot exceed 400 characters',
                      },
                    })}
                  />
                </div>
                {errors.reason ? (
                  <p className="text-xs text-red-500">{errors.reason.message}</p>
                ) : (
                  <p className="text-xs text-slate-400">Minimum 20 characters</p>
                )}
              </div>

              {/* Emergency contact */}
              <Input
                id="emergency-contact"
                type="tel"
                label="Emergency Contact Number"
                placeholder="+91 98765 43210"
                error={errors.emergencyContact?.message}
                leftAdornment={<Phone className="w-4 h-4" />}
                {...register('emergencyContact', {
                  required: 'Emergency contact is required',
                  pattern: {
                    value: /^[+\d\s()-]{7,20}$/,
                    message: 'Enter a valid phone number',
                  },
                })}
              />

              {/* Optional attachment */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="attachment" className="text-sm font-medium text-slate-700">
                  Attachment{' '}
                  <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <div className="flex items-center gap-3">
                  <label
                    htmlFor="attachment"
                    className="btn-secondary cursor-pointer text-sm"
                  >
                    <FileText className="w-4 h-4" />
                    {watch('attachment') && watch('attachment').length > 0
                      ? 'Change file'
                      : 'Choose file'}
                    <input
                      id="attachment"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="sr-only"
                      {...register('attachment')}
                    />
                  </label>
                  <div className="flex flex-col">
                    <p className="text-xs text-slate-400">PDF, JPG, PNG — max 5 MB</p>
                    {watch('attachment') && watch('attachment').length > 0 && (
                      <p className="text-xs font-medium text-primary-600 mt-1 truncate max-w-[200px]">
                        {watch('attachment')[0].name}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                <Button
                  id="submit-leave-btn"
                  type="submit"
                  variant="primary"
                  loading={isSubmitting}
                >
                  Submit Application
                </Button>
                <Button
                  id="reset-form-btn"
                  type="button"
                  variant="ghost"
                  onClick={() => reset()}
                  disabled={isSubmitting}
                >
                  Reset
                </Button>
              </div>
            </form>
          </Card>
        </div>

        {/* Info panel */}
        <aside className="space-y-4">
          <Card>
            <h2 className="text-sm font-semibold text-slate-800 mb-3">Leave Policy</h2>
            <ul className="space-y-2.5 text-sm text-slate-600">
              {[
                'Apply at least 2 business days in advance for planned leaves.',
                'Sick leave can be applied retroactively within 3 days.',
                'Attach a medical certificate for sick leave > 3 days.',
                'Earned leave requires manager pre-approval.',
                'Emergency leaves are subject to team capacity.',
              ].map((tip, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0" />
                  {tip}
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <h2 className="text-sm font-semibold text-slate-800 mb-3">Your Balance</h2>
            <div className="space-y-3">
              {[
                { label: 'Casual Leave',  days: user?.leaveBalance?.casual || 0,  color: 'bg-blue-500'    },
                { label: 'Sick Leave',    days: user?.leaveBalance?.sick || 0,  color: 'bg-amber-500'   },
                { label: 'Earned Leave',  days: user?.leaveBalance?.earned || 0, color: 'bg-emerald-500' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${item.color}`} />
                    <span className="text-xs text-slate-600">{item.label}</span>
                  </div>
                  <span className="text-xs font-semibold text-slate-800">
                    {item.days} days
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}

export default ApplyLeavePage;
