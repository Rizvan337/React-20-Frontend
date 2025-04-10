import axios from 'axios';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from '../store'; 

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface AdminState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: AdminState = {
  users: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk(
  "admin/fetchUsers",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const token = state.auth.token;

    try {
      const response = await fetch('http://localhost:5000/api/admin/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message || "Error fetching users");
    }
  }
);


export const createUser = createAsyncThunk(
  'admin/createUser',
  async (
    userData: { name: string; email: string; password: string; role: string },
    thunkAPI
  ) => {
    const state = thunkAPI.getState() as RootState;
    const token = state.auth.token;

    try {
      const response = await axios.post(
        'http://localhost:5000/api/admin/create-user',
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Error creating user'
      );
    }
  }
);


export const updateUser = createAsyncThunk(
  'admin/updateUser',
  async ({ id, name, email }: { id: string; name: string; email: string }, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const token = state.auth.token;

    try {
      const response = await axios.put(
        `http://localhost:5000/api/admin/users/${id}`,
        { name, email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Error updating user");
    }
  }
);



export const deleteUser = createAsyncThunk( 
  'admin/deleteUser',
  async (id: string, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const token = state.auth.token;

    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
       
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Error deleting user");
    }
  }
);


const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = action.payload;
        const index = state.users.findIndex((user) => user._id === updatedUser._id);
        if (index !== -1) {
          state.users[index] = updatedUser;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((user) => user._id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload); 
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
      
  },
});

export default adminSlice.reducer;
