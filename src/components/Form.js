import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeTransaction,
  createTransaction
} from '../features/transaction/transactionSlice';

const Form = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [amount, setAmount] = useState('');
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const { isLoading, isError, error } = useSelector(
    (state) => state.transaction
  );

  // select current editing transaction
  const { editing } = useSelector((state) => state.transaction) || {};

  // listen for edit mode active
  useEffect(() => {
    const { id, name, type, amount } = editing || {};
    if (id) {
      setEditMode(true);
      setName(name);
      setAmount(amount);
      setType(type);
    } else {
      setEditMode(false);
      reset();
    }
  }, [editing]);

  const reset = () => {
    setName('');
    setAmount('');
    setType('');
  };

  const handleCreate = (e) => {
    e.preventDefault();
    dispatch(
      createTransaction({
        name,
        type,
        amount: Number(amount)
      })
    );
    reset();
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    dispatch(
      changeTransaction({
        id: editing?.id,
        data: {
          name: name,
          amount: Number(amount),
          type: type
        }
      })
    );
    setEditMode(false);
    reset();
  };

  const cancelEditMode = () => {
    reset();
    setEditMode(false);
  };

  return (
    <div className="form">
      <h3>Add new transaction</h3>

      <form onSubmit={editMode ? handleUpdate : handleCreate}>
        <div className="form-group">
          <label htmlFor="transaction_name">Name</label>
          <input
            type="text"
            name="name"
            required
            placeholder="Enter Title"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group radio">
          <label htmlFor="transaction_type">Type</label>
          <div className="radio_group">
            <input
              type="radio"
              required
              value="income"
              name="type"
              checked={type === 'income'}
              onChange={(e) => setType(e.target.value)}
            />
            <label htmlFor="transaction_type">Income</label>
          </div>
          <div className="radio_group">
            <input
              type="radio"
              value="expense"
              name="type"
              placeholder="Expense"
              checked={type === 'expense'}
              onChange={(e) => setType(e.target.value)}
            />
            <label htmlFor="transaction_type">Expense</label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="transaction_amount">Amount</label>
          <input
            type="number"
            placeholder="Enter Amount"
            name="amount"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <button disabled={isLoading} type="submit" className="btn">
          {editMode ? 'Update Transaction' : 'Add Transaction'}
        </button>
        {!isLoading && isError && <p className="error">{error} </p>}
      </form>

      {editMode && (
        <button onClick={cancelEditMode} className="btn cancel_edit">
          Cancel Edit
        </button>
      )}
    </div>
  );
};

export default Form;
