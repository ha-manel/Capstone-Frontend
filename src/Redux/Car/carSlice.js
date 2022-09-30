import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  cars: [],
};

export const getCars = createAsyncThunk('car/getCars', () => {
  const result = axios
    .get('http://localhost:3000/api/v1/cars')
    .then((response) => response.data);
  return result;
});

export const getCarDetail = createAsyncThunk(
  'car/getCarDetail',
  (id) => {
    const result = fetch(
      `http://localhost:3000/api/v1/car/${id}`,
      {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    ).then((response) => response.json());
    return result;
  },
);

export const carSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {},
  extraReducers: {
    [getCars.fulfilled]: (state, action) => ({
      ...state,
      cars: action.payload.cars,
    }),

    [getCarDetail.fulfilled]: (state, action) => ({
      ...state,
      car: action.payload.car,
    }),
  },
});

export default carSlice.reducer;
