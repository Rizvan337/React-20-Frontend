import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUser, updateUser } from '../redux/slices/adminSlice';
import { logout } from '../redux/slices/authSlice';
import { RootState, AppDispatch } from '../redux/store';
import { Trash2, PencilLine, Plus } from 'lucide-react';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

const AdminDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users } = useSelector((state: RootState) => state.admin);
  const [search, setSearch] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1); 
  }, [search]);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );


  const indexOfLastUser = currentPage * usersPerPage;
const indexOfFirstUser = indexOfLastUser - usersPerPage;
const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleDelete = (id: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This user will be deleted permanently!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUser(id));
        Swal.fire('Deleted!', 'User has been deleted.', 'success');
      }
    });
  };
  

  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setEditedName(user.name);
    setEditedEmail(user.email);
    setEditModalOpen(true);
  };


  const validateInputs = () => {
    const newErrors: { name?: string; email?: string } = {};
  
    const nameRegex = /^[a-zA-Z\s.'-]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!editedName.trim()) {
      newErrors.name = "Name is required.";
    } else if (!nameRegex.test(editedName.trim())) {
      newErrors.name = "Name should only contain letters and valid characters.";
    }
  
    if (!editedEmail.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(editedEmail.trim())) {
      newErrors.email = "Enter a valid email address.";
    }
  
    setErrors(newErrors);
  
    return Object.keys(newErrors).length === 0;
  };
  

  const handleEditSubmit = async () => {
    if (validateInputs() && selectedUser) {
      await dispatch(updateUser({ id: selectedUser._id, name: editedName, email: editedEmail }));
      dispatch(fetchUsers());
      setEditModalOpen(false);
      setErrors({});
    }
  };
  

  const handleLogout = () => {
    dispatch(logout());
    navigate('/admin-login');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <button
  onClick={handleLogout}
  className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-5 py-2 rounded-full shadow-lg transition transform hover:scale-105"
>
  <LogOut size={18} />
  Logout
</button>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:max-w-md px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <div className="overflow-x-auto rounded-lg shadow">
          <table className="w-full bg-white">
            <thead className="bg-gray-200 text-gray-700 text-sm uppercase">
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Role</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-gray-500">
                    No users found.
                  </td>
                </tr>
              ) : (
                currentUsers.map((user, idx) => (
                  <tr
                    key={user._id}
                    className={`transition hover:bg-gray-50 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                  >
                    <td className="px-6 py-4 text-gray-800">{user.name}</td>
                    <td className="px-6 py-4 text-gray-700">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center space-x-2">
                      <button
                        onClick={() => openEditModal(user)}
                        className="inline-flex items-center gap-1 px-3 py-1 text-sm text-yellow-600 hover:text-yellow-700 hover:bg-yellow-100 rounded transition"
                      >
                        <PencilLine size={16} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="inline-flex items-center gap-1 px-3 py-1 text-sm text-red-600 hover:text-red-700 hover:bg-red-100 rounded transition"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>



 {/* Pagination Buttons */}
 {totalPages > 1 && (
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
                } hover:bg-blue-500 transition`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}

        
      </div>

      {/* Edit Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value.replace(/\s\s+/g, ' '))}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.name ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
                }`}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={editedEmail}
                onChange={(e) => setEditedEmail(e.target.value)}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.email ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
                }`}
              />
               {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
