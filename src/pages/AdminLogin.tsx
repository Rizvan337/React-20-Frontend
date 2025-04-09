// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { loginUser } from '../services/authService';
// import { loginSuccess } from '../redux/slices/authSlice';
// import { useNavigate } from 'react-router-dom';

// const AdminLogin: React.FC = () => {
//   const [form, setForm] = useState({ email: '', password: '' });
//   const [error, setError] = useState('');
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');

//     try {
//       const res = await loginUser(form);
//       const user = res.data.user;

//       console.log('Login response:', user); 

//       if (user.role === 'admin') {
//         dispatch(loginSuccess(res.data));
//         navigate('/admin/dashboard');
//       } else {
//         setError('❌ You are not authorized as admin');
//       }
//     } catch (err: any) {
//       console.error('Login error:', err);
//       setError(err.response?.data?.msg || 'Login failed. Please try again.');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         placeholder="Admin Email"
//         value={form.email}
//         onChange={(e) => setForm({ ...form, email: e.target.value })}
//       />
//       <input
//         placeholder="Password"
//         type="password"
//         value={form.password}
//         onChange={(e) => setForm({ ...form, password: e.target.value })}
//       />
//       <button type="submit">Login as Admin</button>
      
//       {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
//     </form>
//   );
// };

// export default AdminLogin;






import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../services/authService';
import { loginSuccess } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const AdminLogin: React.FC = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await loginUser(form);
      const user = res.data.user;

      if (user.role === 'admin') {
        dispatch(loginSuccess(res.data));
        navigate('/admin/dashboard');
      } else {
        setError('❌ You are not authorized as admin');
      }
    } catch (err: any) {
      setError(err.response?.data?.msg || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-purple-900 to-violet-600 px-4">
      <div className="bg-white shadow-xl rounded-2xl px-10 py-12 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">🔐 Admin Login</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="admin@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
              required
            />
          </div>

          {error && (
            <div className="bg-red-100 text-red-600 rounded-lg px-4 py-2 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Login as Admin
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
