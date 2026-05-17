import { useState } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { User, Mail, Building, FileText } from 'lucide-react';
import useAdminAuth from '../hooks/useAdminAuth';
import PageHeader from '../components/common/PageHeader';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import { getInitials } from '../utils/formatters';

export default function AdminProfilePage() {
  const { adminUser, updateProfile } = useAdminAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      name: adminUser?.name || '',
      email: adminUser?.email || '',
    }
  });

  const onSubmit = async (data) => {
    // Simulate API call
    await new Promise((res) => setTimeout(res, 600));
    updateProfile(data);
    setIsEditModalOpen(false);
    toast.success('Profile updated successfully');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader title="Profile Settings" />

      <Card className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="w-24 h-24 rounded-full bg-primary-100 text-primary-700 font-bold text-3xl flex items-center justify-center flex-shrink-0">
          {getInitials(adminUser?.name)}
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-2xl font-bold text-slate-900">{adminUser?.name}</h2>
          <p className="text-slate-500 font-medium mb-4">{adminUser?.role}</p>
          <Button variant="secondary" onClick={() => setIsEditModalOpen(true)}>
            Edit Profile
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Personal Information</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-slate-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-slate-500">Full Name</p>
                <p className="text-slate-900">{adminUser?.name}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-slate-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-slate-500">Email Address</p>
                <p className="text-slate-900">{adminUser?.email}</p>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Organizational Role</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-slate-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-slate-500">Employee ID</p>
                <p className="text-slate-900">{adminUser?.id}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Building className="w-5 h-5 text-slate-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-slate-500">Department</p>
                <p className="text-slate-900">{adminUser?.department}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Profile">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            label="Full Name"
            {...register('name', { required: 'Name is required' })}
            error={errors.name?.message}
          />
          <Input
            label="Email Address"
            type="email"
            {...register('email', { 
              required: 'Email is required',
              pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' }
            })}
            error={errors.email?.message}
          />
          
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button type="button" variant="ghost" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" isLoading={isSubmitting}>
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
