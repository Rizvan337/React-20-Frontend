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

      console.log('Login response:', user); 

      if (user.role === 'admin') {
        dispatch(loginSuccess(res.data));
        navigate('/admin/dashboard');
      } else {
        setError('❌ You are not authorized as admin');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.response?.data?.msg || 'Login failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Admin Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        placeholder="Password"
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button type="submit">Login as Admin</button>
      
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </form>
  );
};

export default AdminLogin;
