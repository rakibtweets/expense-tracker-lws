import axios from '../../utils/axios';

export const getTransactions = async () => {
  const { data } = await axios.get('/transactions');
  return data;
};

// add transaction to database
export const addTransaction = async (data) => {
  const response = await axios.post('/transactions', data);
  return response.data;
};

// edit single transaction
export const editTransaction = async (id, data) => {
  const response = await axios.put(`/transactions/${id}`, data);
  return response.data;
};

export const deleteTransaction = async (id) => {
  const response = await axios.delete(`/transactions/${id}`);
  return response.data;
};
