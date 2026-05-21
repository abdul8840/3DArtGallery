import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  IoPersonOutline,
  IoMailOutline,
  IoLockClosedOutline,
} from 'react-icons/io5';
import { register } from '@store/slices/authSlice';
import Button from '@components/common/Button';
import Input from '@components/common/Input';
import {
  validateEmail,
  validateRequired,
  validatePassword,
  validatePasswordConfirmation,
} from '@utils/validators';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
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

    const nameError = validateRequired(formData.name, 'Name');
    if (nameError) newErrors.name = nameError;

    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;

    const passwordError = validatePassword(formData.password);
    if (passwordError) newErrors.password = passwordError;

    const confirmPasswordError = validatePasswordConfirmation(
      formData.password,
      formData.confirmPassword
    );
    if (confirmPasswordError) newErrors.confirmPassword = confirmPasswordError;

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
      const { confirmPassword, ...registerData } = formData;
      await dispatch(register(registerData)).unwrap();
      navigate('/');
    } catch (error) {
      // Error handled by Redux slice
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-display font-bold text-gray-900 mb-2">
          Create Account
        </h2>
        <p className="text-gray-600">Join our community of art enthusiasts</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          type="text"
          name="name"
          label="Full Name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          icon={<IoPersonOutline className="w-5 h-5" />}
          required
        />

        <Input
          type="email"
          name="email"
          label="Email Address"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          icon={<IoMailOutline className="w-5 h-5" />}
          required
        />

        <Input
          type="password"
          name="password"
          label="Password"
          placeholder="Create a password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          icon={<IoLockClosedOutline className="w-5 h-5" />}
          helperText="Must be at least 8 characters"
          required
        />

        <Input
          type="password"
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          icon={<IoLockClosedOutline className="w-5 h-5" />}
          required
        />

        <div className="flex items-start">
          <input
            type="checkbox"
            required
            className="w-4 h-4 mt-1 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
          />
          <label className="ml-2 text-sm text-gray-600">
            I agree to the{' '}
            <Link to="/terms" className="text-yellow-600 hover:text-yellow-700">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-yellow-600 hover:text-yellow-700">
              Privacy Policy
            </Link>
          </label>
        </div>

        <Button type="submit" fullWidth loading={loading} size="lg">
          Create Account
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-yellow-600 hover:text-yellow-700 font-semibold"
          >
            Sign in
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default RegisterForm;