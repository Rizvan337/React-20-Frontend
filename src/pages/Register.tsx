import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../services/authService';
import { loginSuccess } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';

type RegisterForm = {
  name: string;
  email: string;
  password: string;
};

type Errors = {
  name?: string;
  email?: string;
  password?: string;
};

const Register = () => {
  const [form, setForm] = useState<RegisterForm>({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();


  
  const validate = () => {
    const newErrors: Errors = {};

    if (!form.name.trim()) {
      newErrors.name = 'Name is required.';
    } else if (!/^[A-Za-z\s]{3,}$/.test(form.name)) {
      newErrors.name = 'Name must be at least 3 characters and only contain letters.';
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (
      !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(form.email)
    ) {
      newErrors.email = 'Enter a valid email address.';
    }

    if (!form.password) {
      newErrors.password = 'Password is required.';
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/.test(form.password)
    ) {
      newErrors.password =
        'Password must be at least 6 characters and include uppercase, lowercase, number, and symbol.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: undefined }); 
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      setSubmitError(null);

      const res = await registerUser(form);
      dispatch(loginSuccess(res.data));
      navigate('/login');
    } catch (err: any) {
      setSubmitError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-purple-300 via-pink-200 to-indigo-300 relative overflow-hidden px-4">
      <div className="absolute w-72 h-72 bg-pink-400 rounded-full blur-3xl opacity-30 top-[-3rem] left-[-3rem] animate-pulse"></div>
      <div className="absolute w-72 h-72 bg-indigo-400 rounded-full blur-3xl opacity-30 bottom-[-3rem] right-[-3rem] animate-pulse"></div>

      <form
        onSubmit={handleSubmit}
        className="z-10 w-full max-w-md bg-white/20 backdrop-blur-md border border-white/30 shadow-2xl rounded-2xl p-10 sm:p-12 space-y-6 text-center"
      >
        <div>
          <UserPlus className="w-14 h-14 mx-auto text-indigo-600 mb-2" />
          <h2 className="text-4xl font-bold text-indigo-800 drop-shadow-sm">Register</h2>
          <p className="text-gray-700 mt-1">Create a new account and start your journey</p>
        </div>

<div className="space-y-4">
          <div className="text-left">
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl bg-white bg-opacity-90 border ${
                errors.name ? 'border-red-400' : 'border-indigo-300'
              } focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 shadow`}
            />
            {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
          </div>

          <div className="text-left">
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl bg-white bg-opacity-90 border ${
                errors.email ? 'border-red-400' : 'border-indigo-300'
              } focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 shadow`}
            />
            {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
          </div>

          <div className="text-left">
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl bg-white bg-opacity-90 border ${
                errors.password ? 'border-red-400' : 'border-indigo-300'
              } focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 shadow`}
            />
            {errors.password && (
              <p className="text-sm text-red-600 mt-1">{errors.password}</p>
            )}
          </div>
        </div>
        {submitError && <p className="text-red-600 text-sm font-medium">{submitError}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-purple-600 hover:to-indigo-600 text-white font-bold text-lg rounded-xl transition-all duration-300 shadow-lg"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>

        <p className="text-sm text-gray-700 pt-2">
          Already have an account?{' '}
          <span
            onClick={() => navigate('/login')}
            className="text-indigo-700 hover:underline cursor-pointer font-medium"
          >
            Login here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;


