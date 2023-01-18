import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getTransactions,
  addTransaction,
  editTransaction,
  deleteTransaction
} from './transactionAPI';

const initialState = {
  transactions: [],
  isLoading: false,
  isError: false,
  error: '',
  editing: {}
};

// async thunks
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

export const changeTransaction = createAsyncThunk(
  'transactions/editTransactions',
  async ({ id, data }) => {
    const transaction = await editTransaction(id, data);
    return transaction;
  }
);

export const removeTransaction = createAsyncThunk(
  'transactions/removeTransaction',
  async (id) => {
    const transaction = await deleteTransaction(id);
    return transaction;
  }
);

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    editActive: (state, action) => {
      state.editing = action.payload;
    },
    editInActive: (state, action) => {
      state.editing = {};
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action?.error?.message;
        state.transactions = [];
      })
      .addCase(createTransaction.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.transactions.push(action.payload);
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action?.error?.message;
      })
      .addCase(changeTransaction.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(changeTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;

        const indexToUpdate = state.transactions.findIndex(
          (t) => t.id === action.payload.id
        );
        state.transactions[indexToUpdate] = action.payload;
      })
      .addCase(changeTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action?.error?.message;
        state.transactions = [];
      })
      .addCase(removeTransaction.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(removeTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.transactions = state.transactions.filter(
          (t) => t.id !== action.meta.arg
        );
      })
      .addCase(removeTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action?.error?.message;
        state.transactions = [];
      });
  }
});

export const { editActive, editInActive } = transactionSlice.actions;

export default transactionSlice.reducer;
