import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getTransactions,
  addTransaction,
  editTransaction,
  deleteTransaction
} from './transactionAPI';

const initialState = {
  transactions: [],
  isloading: false,
  isError: ''
};

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async () => {
    const transactions = await getTransactions();
    return transactions;
  }
);

export const createTransaction = createAsyncThunk(
  'transactions/createTransaction',
  async (data) => {
    const transaction = await addTransaction(data);
    return transaction;
  }
);

export const editTransactions = createAsyncThunk(
  'transactions/editTransactions',
  async ({ id, data }) => {
    const transaction = await editTransaction(id, data);
    return transaction;
  }
);

export const removeTransaction = createAsyncThunk(
  'transactions/removeTransaction',
  async ({ id, data }) => {
    const transaction = await deleteTransaction(id);
    return transaction;
  }
);

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {}
});

// export const {} = transactionSlice.actions;

export default transactionSlice.reducer;
