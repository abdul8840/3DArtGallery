import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changePassword } from '@store/slices/authSlice';
import Input from '@components/common/Input';
import Button from '@components/common/Button';
import { IoLockClosedOutline } from 'react-icons/io5';
import { validatePassword, validatePasswordConfirmation } from '@utils/validators';

const PasswordChange = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }

    const passwordError = validatePassword(formData.newPassword);
    if (passwordError) newErrors.newPassword = passwordError;

    const confirmError = validatePasswordConfirmation(
      formData.newPassword,
      formData.confirmPassword
    );
    if (confirmError) newErrors.confirmPassword = confirmError;

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      await dispatch(
        changePassword({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        })
      ).unwrap();

      // Reset form
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      // Error handled by slice
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
        Change Password
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          type="password"
          label="Current Password"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          error={errors.currentPassword}
          icon={<IoLockClosedOutline />}
          required
        />

        <Input
          type="password"
          label="New Password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          error={errors.newPassword}
          icon={<IoLockClosedOutline />}
          helperText="Must be at least 8 characters"
          required
        />

        <Input
          type="password"
          label="Confirm New Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          icon={<IoLockClosedOutline />}
          required
        />

        <Button type="submit" loading={loading}>
          Update Password
        </Button>
      </form>
    </div>
  );
};

export default PasswordChange;