import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import { UserCircle, LogOut, ShieldCheck, User } from 'lucide-react';
import { logout } from '../redux/slices/authSlice';

const Home: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-tr from-sky-100 via-white to-indigo-100 relative overflow-hidden">
      <div className="absolute w-80 h-80 bg-indigo-300 rounded-full blur-3xl opacity-30 top-[-5rem] left-[-5rem] animate-pulse" />
      <div className="absolute w-80 h-80 bg-pink-300 rounded-full blur-3xl opacity-30 bottom-[-5rem] right-[-5rem] animate-pulse" />

      <button
        onClick={handleLogout}
        className="absolute top-6 right-6 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg transition-all duration-200"
      >
        <LogOut className="w-4 h-4" />
        Logout
      </button>

      <div className="z-10 w-full max-w-md bg-white bg-opacity-90 backdrop-blur-md shadow-2xl rounded-3xl p-10 sm:p-12 text-center space-y-6">
        <div className="flex justify-center">
          <UserCircle className="h-20 w-20 text-blue-600 drop-shadow-md" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
          Welcome, {user?.name || 'User'} 👋
        </h1>
        <p className="text-gray-600">You’re successfully logged in. Let’s get started!</p>

        <div className="space-y-4 pt-2">
          <button
            onClick={() => navigate('/profile')}
            className="w-full py-3 flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium text-lg shadow-md transition"
          >
            <User className="w-5 h-5" />
            Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
