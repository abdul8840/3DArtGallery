import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IoMailOutline, IoLockClosedOutline, IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import { login } from '@store/slices/authSlice';
import Button from '@components/common/Button';
import Input from '@components/common/Input';
import { validateEmail, validateRequired } from '@utils/validators';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
  };

  const validate = () => {
    const errs = {};
    const emailErr = validateEmail(formData.email);
    if (emailErr) errs.email = emailErr;
    const pwErr = validateRequired(formData.password, 'Password');
    if (pwErr) errs.password = pwErr;
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      await dispatch(login(formData)).unwrap();
      navigate('/');
    } catch {
      // handled by Redux slice toast
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
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0a1628] mb-1.5" style={{ fontFamily: 'Playfair Display, serif' }}>
          Welcome back
        </h1>
        <p className="text-[#64748b] text-sm">Sign in to your collector account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
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
          type={showPassword ? 'text' : 'password'}
          name="password"
          label="Password"
          placeholder="Your password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          icon={<IoLockClosedOutline className="w-5 h-5" />}
          iconRight={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-[#94a3b8] hover:text-[#0f2447] transition-colors"
            >
              {showPassword ? <IoEyeOffOutline className="w-5 h-5" /> : <IoEyeOutline className="w-5 h-5" />}
            </button>
          }
          required
          autoComplete="current-password"
        />

        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              className="w-4 h-4 accent-[#0f2447] rounded cursor-pointer"
            />
            <span className="text-sm text-[#64748b] group-hover:text-[#0f2447] transition-colors">Remember me</span>
          </label>
          <Link
            to="/forgot-password"
            className="text-sm font-semibold text-[#2563eb] hover:text-[#1d4ed8] transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        <Button type="submit" fullWidth loading={loading} size="lg" className="mt-2">
          Sign In
        </Button>
      </form>

      {/* Divider */}
      <div className="relative my-7">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#e2e8f0]" />
        </div>
        <div className="relative flex justify-center">
          <span className="px-4 bg-white text-xs text-[#94a3b8] font-medium">or continue with</span>
        </div>
      </div>

      {/* Register link */}
      <p className="text-center text-sm text-[#64748b]">
        Don't have an account?{' '}
        <Link to="/register" className="font-bold text-[#0f2447] hover:text-[#2563eb] transition-colors">
          Create one free
        </Link>
      </p>

      {/* Demo credentials */}
      <div className="mt-8 p-4 bg-[#eef5ff] border border-[#a8c8f5] rounded-xl">
        <p className="text-xs font-bold text-[#0f2447] mb-2 tracking-wide uppercase">Demo Access</p>
        <p className="text-xs text-[#475569]">Email: <span className="font-semibold text-[#0f2447]">demo@example.com</span></p>
        <p className="text-xs text-[#475569]">Password: <span className="font-semibold text-[#0f2447]">password123</span></p>
      </div>
    </motion.div>
  );
};

export default LoginForm;
