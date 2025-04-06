import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../services/authService';
import { loginSuccess } from '../redux/slices/authSlice';

type RegisterForm = {
    name: string;
    email: string;
    password: string;
  };
const Register = () => {
  const [form, setForm] = useState<RegisterForm>({ email: '', password: '' ,name:''});
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await registerUser(form);
    dispatch(loginSuccess(res.data));
  };

  return (
    <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email"  value={form.email} type='email' onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
