// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { registerUser } from '../services/authService';
// import { loginSuccess } from '../redux/slices/authSlice';
// import { useNavigate } from 'react-router-dom';

// type RegisterForm = {
//   name: string;
//   email: string;
//   password: string;
// };

// const Register = () => {
//   const [form, setForm] = useState<RegisterForm>({ name: '', email: '', password: '' });
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Basic validation
//     if (!form.name || !form.email || !form.password) {
//       return setError('Please fill in all fields.');
//     }

//     try {
//       setLoading(true);
//       setError(null);

//       const res = await registerUser(form);

//       // Assuming the API returns token/user details
//       dispatch(loginSuccess(res.data));

//       // Navigate to login page after successful registration
//       navigate('/login');
//     } catch (err: any) {
//       setError(err.response?.data?.message || 'Something went wrong');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Register</h2>

//       <input
//         placeholder="Name"
//         value={form.name}
//         onChange={(e) => setForm({ ...form, name: e.target.value })}
//       />

//       <input
//         placeholder="Email"
//         type="email"
//         value={form.email}
//         onChange={(e) => setForm({ ...form, email: e.target.value })}
//       />

//       <input
//         placeholder="Password"
//         type="password"
//         value={form.password}
//         onChange={(e) => setForm({ ...form, password: e.target.value })}
//       />

//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       <button type="submit" disabled={loading}>
//         {loading ? 'Registering...' : 'Register'}
//       </button>
//     </form>
//   );
// };

// export default Register;








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

const Register = () => {
  const [form, setForm] = useState<RegisterForm>({ name: '', email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      return setError('Please fill in all fields.');
    }

    try {
      setLoading(true);
      setError(null);

      const res = await registerUser(form);
      dispatch(loginSuccess(res.data));
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-purple-300 via-pink-200 to-indigo-300 relative overflow-hidden px-4">
      {/* Floating colorful blobs */}
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
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-white bg-opacity-90 border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 shadow"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-white bg-opacity-90 border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 shadow"
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-white bg-opacity-90 border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 shadow"
          />
        </div>

        {error && <p className="text-red-600 text-sm font-medium">{error}</p>}

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


