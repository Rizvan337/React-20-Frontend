// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { RootState } from '../redux/store';
// import axios from 'axios';

// interface User {
//   profileImage?: string;
//   name?: string;
//   email?: string;
// }

// const Profile: React.FC = () => {
//   const [image, setImage] = useState<File | null>(null);
//   const [user, setUser] = useState<User | null>(null);
//   const token = useSelector((state: RootState) => state.auth.token);

//   const fetchUser = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/users/me', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUser(res.data);
//     } catch (err) {
//       console.error('Failed to fetch user', err);
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   const handleUpload = async () => {
//     if (!image) return;

//     const formData = new FormData();
//     formData.append('image', image);

//     try {
//       await axios.post('http://localhost:5000/api/users/upload-profile', formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       alert('Image uploaded successfully!');
//       fetchUser(); 
//     } catch (error) {
//       alert('Upload failed');
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <h1>Welcome to Profile Page</h1>
//       <input type="file" onChange={(e) => setImage(e.target.files?.[0] || null)} />
//       <button onClick={handleUpload}>Upload</button>

//       {user?.profileImage && (
//         <div>
//           <h3>Uploaded Image:</h3>
//           <img
//             src={`http://localhost:5000/${user.profileImage}`}
//             alt="Profile"
//             width={150}
//             style={{ marginTop: '10px', borderRadius: '10px' }}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profile;







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
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center px-4">
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
            className="bg-purple-600 text-white font-semibold py-3 rounded-lg hover:bg-purple-700 transition duration-300"
          >
            Upload Image
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
