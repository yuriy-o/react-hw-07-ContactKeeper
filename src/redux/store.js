import { configureStore } from '@reduxjs/toolkit';
import { PhonebookReducer } from 'redux/phonebookSlice';

export const store = configureStore({
  reducer: {
    phonebook: PhonebookReducer,
  },
});
