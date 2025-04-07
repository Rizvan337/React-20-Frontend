import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../services/authService';
import { loginSuccess } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

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

    // Basic validation
    if (!form.name || !form.email || !form.password) {
      return setError('Please fill in all fields.');
    }

    try {
      setLoading(true);
      setError(null);

      const res = await registerUser(form);

      // Assuming the API returns token/user details
      dispatch(loginSuccess(res.data));

      // Navigate to login page after successful registration
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>

      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Email"
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        placeholder="Password"
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
};

export default Register;
