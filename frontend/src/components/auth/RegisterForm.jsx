import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  IoPersonOutline,
  IoMailOutline,
  IoLockClosedOutline,
  IoEyeOutline,
  IoEyeOffOutline,
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
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
  };

  const validate = () => {
    const errs = {};
    const nameErr = validateRequired(formData.name, 'Name');
    if (nameErr) errs.name = nameErr;
    const emailErr = validateEmail(formData.email);
    if (emailErr) errs.email = emailErr;
    const pwErr = validatePassword(formData.password);
    if (pwErr) errs.password = pwErr;
    const confirmErr = validatePasswordConfirmation(formData.password, formData.confirmPassword);
    if (confirmErr) errs.confirmPassword = confirmErr;
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      const { confirmPassword, ...data } = formData;
      await dispatch(register(data)).unwrap();
      navigate('/');
    } catch {
      // handled by Redux slice
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0a1628] mb-1.5" style={{ fontFamily: 'Playfair Display, serif' }}>
          Create account
        </h1>
        <p className="text-[#64748b] text-sm">Join the world's premier virtual art gallery</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          name="name"
          label="Full Name"
          placeholder="Your full name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          icon={<IoPersonOutline className="w-5 h-5" />}
          required
          autoComplete="name"
        />

        <Input
          type="email"
          name="email"
          label="Email Address"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          icon={<IoMailOutline className="w-5 h-5" />}
          required
          autoComplete="email"
        />

        <Input
          type={showPw ? 'text' : 'password'}
          name="password"
          label="Password"
          placeholder="Create a strong password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          helperText="Minimum 8 characters"
          icon={<IoLockClosedOutline className="w-5 h-5" />}
          iconRight={
            <button type="button" onClick={() => setShowPw(!showPw)} className="text-[#94a3b8] hover:text-[#0f2447] transition-colors">
              {showPw ? <IoEyeOffOutline className="w-5 h-5" /> : <IoEyeOutline className="w-5 h-5" />}
            </button>
          }
          required
        />

        <Input
          type={showConfirm ? 'text' : 'password'}
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Repeat your password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          icon={<IoLockClosedOutline className="w-5 h-5" />}
          iconRight={
            <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="text-[#94a3b8] hover:text-[#0f2447] transition-colors">
              {showConfirm ? <IoEyeOffOutline className="w-5 h-5" /> : <IoEyeOutline className="w-5 h-5" />}
            </button>
          }
          required
        />

        <div className="flex items-start gap-2.5 pt-1">
          <input
            type="checkbox"
            required
            className="w-4 h-4 mt-0.5 accent-[#0f2447] rounded cursor-pointer shrink-0"
          />
          <label className="text-sm text-[#64748b] leading-relaxed">
            I agree to the{' '}
            <Link to="/terms" className="font-semibold text-[#2563eb] hover:text-[#1d4ed8]">Terms of Service</Link>
            {' '}and{' '}
            <Link to="/privacy" className="font-semibold text-[#2563eb] hover:text-[#1d4ed8]">Privacy Policy</Link>
          </label>
        </div>

        <Button type="submit" fullWidth loading={loading} size="lg" className="mt-2">
          Create Free Account
        </Button>
      </form>

      <p className="mt-7 text-center text-sm text-[#64748b]">
        Already have an account?{' '}
        <Link to="/login" className="font-bold text-[#0f2447] hover:text-[#2563eb] transition-colors">
          Sign in
        </Link>
      </p>
    </motion.div>
  );
};

export default RegisterForm;
