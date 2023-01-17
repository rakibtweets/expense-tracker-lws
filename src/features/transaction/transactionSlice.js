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
  isError: false,
  error: ''
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
  'transactions/changeTransaction',
  async (data) => {
    const transaction = await addTransaction(data);
    return transaction;
  }
);

export const changeTransactions = createAsyncThunk(
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state, action) => {
        state.isloading = true;
        state.isError = false;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isloading = false;
        state.isError = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.isloading = false;
        state.isError = true;
        state.error = action?.error?.message;
        state.transactions = [];
      })
      .addCase(createTransaction.pending, (state, action) => {
        state.isloading = true;
        state.isError = false;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.isloading = false;
        state.isError = false;
        state.transactions.push(action.payload);
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.isloading = false;
        state.isError = true;
        state.error = action?.error?.message;
      })
      .addCase(changeTransactions.pending, (state, action) => {
        state.isloading = true;
        state.isError = false;
      })
      .addCase(changeTransactions.fulfilled, (state, action) => {
        state.isloading = false;
        state.isError = false;

        const indexToUpdate = state.transactions.findIndex(
          (t) => t.id === action.payload.id
        );
        state.transactions[indexToUpdate] = action.payload;
      })
      .addCase(changeTransactions.rejected, (state, action) => {
        state.isloading = false;
        state.isError = true;
        state.error = action?.error?.message;
        state.transactions = [];
      })
      .addCase(removeTransaction.pending, (state, action) => {
        state.isloading = true;
        state.isError = false;
      })
      .addCase(removeTransaction.fulfilled, (state, action) => {
        state.isloading = false;
        state.isError = false;
        state.transactions = state.transactions.filter(
          (t) => t.id !== action.payload
        );
      })
      .addCase(removeTransaction.rejected, (state, action) => {
        state.isloading = false;
        state.isError = true;
        state.error = action?.error?.message;
        state.transactions = [];
      });
  }
});

// export const {} = transactionSlice.actions;

export default transactionSlice.reducer;
