import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

interface User {
  profileImage?: string;
  name?: string;
  email?: string;
}

const Profile: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const token = useSelector((state: RootState) => state.auth.token);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (err) {
      console.error('Failed to fetch user', err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleUpload = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append('image', image);

    try {
      await axios.post('http://localhost:5000/api/users/upload-profile', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      Swal.fire({
        title: 'Success!',
        text: 'Image uploaded successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
      });
  
      fetchUser();
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Upload failed. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f3f4f6] via-[#e5e7eb] to-[#f9fafb] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-lg w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
           Profile Page
        </h1>

        {user && (
          <div className="text-center mb-6">
            <p className="text-lg font-medium text-gray-700">Name: {user.name || 'Unknown'}</p>
            <p className="text-md text-gray-500">Email: {user.email}</p>
          </div>
        )}

        {user?.profileImage && (
          <div className="flex flex-col items-center mb-6">
            <img
              src={`http://localhost:5000/${user.profileImage}`}
              alt="Profile"
              className="w-32 h-32 object-cover rounded-full shadow-md"
            />
            <p className="text-sm text-gray-500 mt-2">Current Profile Picture</p>
          </div>
        )}

        <div className="flex flex-col gap-4">
          <input
            type="file"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="block w-full text-sm text-gray-600
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-purple-50 file:text-purple-700
              hover:file:bg-purple-100
              cursor-pointer"
          />

          <button
            onClick={handleUpload}
            className="bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg"
>
            Upload Image
          </button>
          <button
  onClick={() => navigate('/')}
  className="absolute top-4 left-4 bg-white text-blue-600 border border-blue-600 font-medium px-4 py-2 rounded-full shadow hover:bg-blue-50 hover:scale-105 transform transition-all duration-300 ease-in-out flex items-center gap-2"
>
  <span className="text-lg">⬅</span>
  <span className="text-sm sm:text-base">Back to Home</span>
</button>

        </div>
      </div>
    </div>
  );
};

export default Profile;
