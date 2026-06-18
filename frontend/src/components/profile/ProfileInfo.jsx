import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '@store/slices/authSlice';
import Input from '@components/common/Input';
import Button from '@components/common/Button';
import { IoPersonOutline, IoMailOutline, IoCallOutline } from 'react-icons/io5';

const ProfileInfo = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(updateProfile(formData)).unwrap();
      setEditing(false);
    } catch (error) {
      // Error handled by slice
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
    });
    setEditing(false);
  };

  if (!editing) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-display font-bold text-gray-900">
            Personal Information
          </h2>
          <Button variant="outline" onClick={() => setEditing(true)}>
            Edit
          </Button>
        </div>

        <div className="space-y-4">
          <InfoRow icon={IoPersonOutline} label="Name" value={user?.name} />
          <InfoRow icon={IoMailOutline} label="Email" value={user?.email} />
          <InfoRow icon={IoCallOutline} label="Phone" value={user?.phone || 'Not provided'} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
        Edit Personal Information
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          icon={<IoPersonOutline />}
          required
        />

        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          icon={<IoMailOutline />}
          required
        />

        <Input
          label="Phone"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          icon={<IoCallOutline />}
        />

        <div className="flex gap-3">
          <Button type="submit" loading={loading}>
            Save Changes
          </Button>
          <Button variant="outline" onClick={handleCancel} disabled={loading}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

const InfoRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-center space-x-3">
    <Icon className="w-5 h-5 text-gray-400" />
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-semibold text-gray-900">{value}</p>
    </div>
  </div>
);

export default ProfileInfo;