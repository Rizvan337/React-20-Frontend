import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Profile from './pages/Profile';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import './index.css';

const App = () => {
  const token = useSelector((state: RootState) => state.auth.token);  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={token ? <Home /> : <Navigate to="/register" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={token ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
        <Route path="/admin" element={<Navigate to="/admin-login" />} /> 
        <Route path="/admin/dashboard" element={<ProtectedAdminRoute>
        <AdminDashboard />
        </ProtectedAdminRoute>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
