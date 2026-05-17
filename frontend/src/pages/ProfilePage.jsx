import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Pencil, Mail, Building2, Hash, Phone, MapPin, Calendar, User } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import useLeaveStats from '../hooks/useLeaveStats';
import PageHeader from '../components/common/PageHeader';
import Card from '../components/common/Card';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Badge from '../components/common/Badge';
import { formatDate, getInitials } from '../utils/formatters';

function ProfileInfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 py-3.5 border-b border-slate-100 last:border-0">
      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="w-4 h-4 text-slate-500" />
      </div>
      <div>
        <p className="text-xs text-slate-500 font-medium">{label}</p>
        <p className="text-sm text-slate-800 font-medium mt-0.5">{value || '—'}</p>
      </div>
    </div>
  );
}

function EditProfileModal({ isOpen, onClose, user, onSave }) {
  const [saving, setSaving] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name:     user?.name     ?? '',
      phone:    user?.phone    ?? '',
      location: user?.location ?? '',
    },
  });

  const onSubmit = async (data) => {
    setSaving(true);
    await new Promise((res) => setTimeout(res, 600));
    onSave(data);
    setSaving(false);
    toast.success('Profile updated successfully.');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Profile" size="sm">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <Input
          id="edit-name"
          label="Full Name"
          placeholder="Your full name"
          error={errors.name?.message}
          {...register('name', {
            required: 'Name is required',
            minLength: { value: 2, message: 'Too short' },
          })}
        />
        <Input
          id="edit-phone"
          type="tel"
          label="Phone Number"
          placeholder="+91 98765 43210"
          error={errors.phone?.message}
          {...register('phone', {
            pattern: { value: /^[+\d\s()-]{7,20}$/, message: 'Enter a valid number' },
          })}
        />
        <Input
          id="edit-location"
          label="Location"
          placeholder="City, State"
          {...register('location')}
        />
        <div className="flex gap-3 pt-2">
          <Button id="save-profile-btn" type="submit" variant="primary" loading={saving}>
            Save Changes
          </Button>
          <Button type="button" variant="ghost" onClick={onClose} disabled={saving}>
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
}

function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const stats = useLeaveStats();
  const [modalOpen, setModalOpen] = useState(false);

  const openModal  = useCallback(() => setModalOpen(true),  []);
  const closeModal = useCallback(() => setModalOpen(false), []);
  const handleSave = useCallback((data) => updateProfile(data), [updateProfile]);

  const initials = getInitials(user?.name);

  return (
    <>
      <div className="space-y-6">
        <PageHeader
          title="My Profile"
          subtitle="View and update your personal information."
          action={
            <Button
              id="edit-profile-btn"
              variant="secondary"
              size="sm"
              leftIcon={<Pencil className="w-3.5 h-3.5" />}
              onClick={openModal}
            >
              Edit Profile
            </Button>
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: avatar + basic info */}
          <div className="space-y-4">
            {/* Avatar card */}
            <Card>
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-20 h-20 rounded-full bg-primary-600 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">{initials}</span>
                </div>
                <div>
                  <h2 className="text-base font-semibold text-slate-900">{user?.fullName}</h2>
                  <p className="text-sm text-slate-500 mt-0.5">{user?.designation || user?.role}</p>
                  <p className="text-xs text-slate-400 mt-1">{user?.department}</p>
                </div>
                <Badge label="Active" />
              </div>
            </Card>

            {/* Leave summary */}
            <Card>
              <h3 className="text-sm font-semibold text-slate-800 mb-3">Leave Summary</h3>
              <div className="space-y-2">
                {stats.balanceSummary.map((b) => (
                  <div key={b.code} className="flex items-center justify-between">
                    <span className="text-xs text-slate-600">{b.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">{b.used}/{b.total} used</span>
                      <span className="text-xs font-semibold text-slate-800">
                        {b.remaining} left
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right: detailed info */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <h3 className="text-sm font-semibold text-slate-800 mb-1">
                Personal Information
              </h3>
              <ProfileInfoRow icon={User}     label="Full Name"          value={user?.fullName}            />
              <ProfileInfoRow icon={Mail}     label="Email Address"      value={user?.email}           />
              <ProfileInfoRow icon={Phone}    label="Phone Number"       value={user?.phone}           />
              <ProfileInfoRow icon={MapPin}   label="Location"           value={user?.location || 'Not Specified'}        />
              <ProfileInfoRow icon={Calendar} label="Joining Date"       value={formatDate(user?.createdAt)} />
            </Card>

            <Card>
              <h3 className="text-sm font-semibold text-slate-800 mb-1">
                Employment Details
              </h3>
              <ProfileInfoRow icon={Hash}      label="Employee ID"         value={user?.employeeId}             />
              <ProfileInfoRow icon={Building2} label="Department"          value={user?.department}             />
              <ProfileInfoRow icon={User}      label="Job Title"           value={user?.designation || user?.role}                   />
              <ProfileInfoRow icon={User}      label="Reporting Manager"   value={user?.reportingManager || 'N/A'}       />
            </Card>

            {/* Stats summary row */}
            <Card>
              <h3 className="text-sm font-semibold text-slate-800 mb-4">Leave Overview</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: 'Total Applied', value: stats.total    },
                  { label: 'Approved',      value: stats.approved },
                  { label: 'Pending',       value: stats.pending  },
                  { label: 'Days Taken',    value: stats.totalDaysTaken },
                ].map(({ label, value }) => (
                  <div key={label} className="text-center">
                    <p className="text-2xl font-bold text-slate-900">{value}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>

      <EditProfileModal
        isOpen={modalOpen}
        onClose={closeModal}
        user={user}
        onSave={handleSave}
      />
    </>
  );
}

export default ProfilePage;
