import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import axios from 'axios';

interface User {
  profileImage?: string;
  name?: string;
  email?: string;
}

const Profile: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const token = useSelector((state: RootState) => state.auth.token);

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
      alert('Image uploaded successfully!');
      fetchUser(); 
    } catch (error) {
      alert('Upload failed');
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Welcome to Profile Page</h1>
      <input type="file" onChange={(e) => setImage(e.target.files?.[0] || null)} />
      <button onClick={handleUpload}>Upload</button>

      {user?.profileImage && (
        <div>
          <h3>Uploaded Image:</h3>
          <img
            src={`http://localhost:5000/${user.profileImage}`}
            alt="Profile"
            width={150}
            style={{ marginTop: '10px', borderRadius: '10px' }}
          />
        </div>
      )}
    </div>
  );
};

export default Profile;
