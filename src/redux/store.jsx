// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import fileReducer from './fileSlice';

const store = configureStore({
  reducer: {
    files: fileReducer,
  },
});

export default store;
