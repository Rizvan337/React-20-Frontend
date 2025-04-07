import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Welcome, {user?.name || 'User'} 👋</h1>
      <p>You are successfully logged in!</p>
      <button
        style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}
        onClick={() => navigate('/profile')}
      >
        Go to Profile
      </button>


      <button
  style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}
  onClick={() => navigate('/admin-login')}
>
  Go to Admin Login
</button>

    </div>
  );
};

export default Home;
