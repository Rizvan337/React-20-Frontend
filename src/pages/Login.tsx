import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../services/authService';
import { loginSuccess } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      return setError('Please fill in all fields.');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      return setError('Please enter a valid email address.');
    }
  
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
    if (!passwordRegex.test(form.password)) {
      return setError(
        'Password must be at least 6 characters and include uppercase, lowercase, number, and symbol.'
      );
    }

    try {
      setLoading(true);
      setError(null);
      const res = await loginUser(form);
      dispatch(loginSuccess(res.data));
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 px-4">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-2xl rounded-2xl p-10 max-w-md w-full"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back 👋
        </h2>

        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          {error && (
            <p className="text-red-500 text-sm font-medium">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-purple-600 text-white font-semibold py-3 rounded-lg hover:bg-purple-700 transition duration-300 disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
  Don’t have an account?{' '}
  <span
    className="text-purple-600 hover:underline cursor-pointer font-medium"
    onClick={() => navigate('/register')}
  >
    Register here
  </span>
</p>

        </div>
      </motion.form>
    </div>
  );
};

export default Login;

