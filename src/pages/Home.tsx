// import React from 'react';
// import { useSelector } from 'react-redux';
// import { RootState } from '../redux/store';
// import { useNavigate } from 'react-router-dom';

// const Home: React.FC = () => {
//   const user = useSelector((state: RootState) => state.auth.user);
//   const navigate = useNavigate();

//   return (
//     <div style={{ padding: '2rem', textAlign: 'center' }}>
//       <h1>Welcome, {user?.name || 'User'} 👋</h1>
//       <p>You are successfully logged in!</p>
//       <button
//         style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}
//         onClick={() => navigate('/profile')}
//       >
//         Go to Profile
//       </button>


//       <button
//   style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}
//   onClick={() => navigate('/admin-login')}
// >
//   Go to Admin Login
// </button>

//     </div>
//   );
// };

// export default Home;




import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-white px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome, <span className="text-blue-600">{user?.name || 'User'}</span> 👋
        </h1>
        <p className="text-gray-600 mb-6">You are successfully logged in!</p>
        
        <button
          onClick={() => navigate('/profile')}
          className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-300 mb-3"
        >
          Go to Profile
        </button>

        <button
          onClick={() => navigate('/admin-login')}
          className="w-full bg-gray-200 text-gray-800 py-2 rounded-xl hover:bg-gray-300 transition duration-300"
        >
          Go to Admin Login
        </button>
      </div>
    </div>
  );
};

export default Home;
