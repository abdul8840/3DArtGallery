import React, { useState } from 'react';
import Input from '@components/common/Input';
import Button from '@components/common/Button';
import { validateRequired } from '@utils/validators';

const AddressForm = ({ onSubmit, initialData = {}, loading = false }) => {
  const [formData, setFormData] = useState({
    fullName: initialData.fullName || '',
    email: initialData.email || '',
    phone: initialData.phone || '',
    street: initialData.street || '',
    city: initialData.city || '',
    state: initialData.state || '',
    country: initialData.country || 'United States',
    zipCode: initialData.zipCode || '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    Object.keys(formData).forEach((key) => {
      if (key !== 'country') {
        const error = validateRequired(formData[key], key);
        if (error) newErrors[key] = error;
      }
    });

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          error={errors.fullName}
          required
        />
        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
        />
      </div>

      <Input
        label="Phone Number"
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        error={errors.phone}
        required
      />

      <Input
        label="Street Address"
        name="street"
        value={formData.street}
        onChange={handleChange}
        error={errors.street}
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
          error={errors.city}
          required
        />
        <Input
          label="State / Province"
          name="state"
          value={formData.state}
          onChange={handleChange}
          error={errors.state}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Country
          </label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Australia">Australia</option>
            <option value="Germany">Germany</option>
            <option value="France">France</option>
          </select>
        </div>
        <Input
          label="ZIP / Postal Code"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
          error={errors.zipCode}
          required
        />
      </div>

      <Button type="submit" fullWidth size="lg" loading={loading}>
        Continue to Payment
      </Button>
    </form>
  );
};

export default AddressForm;