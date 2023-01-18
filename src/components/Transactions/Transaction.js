import React from 'react';
import { useDispatch } from 'react-redux';
import deleteImage from '../../assets/images/delete.svg';
import editImage from '../../assets/images/edit.svg';
import {
  editActive,
  removeTransaction
} from '../../features/transaction/transactionSlice';

const Transaction = ({ transaction }) => {
  const { id, name, amount, type } = transaction || {};
  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(editActive(transaction));
  };

  const handleDelete = () => {
    dispatch(removeTransaction(id));
  };

  return (
    <li className={`transaction ${type}`}>
      <p>{name}</p>
      <div className="right">
        <p>৳ {amount}</p>
        <button onClick={handleEdit} className="link">
          <img alt="handle_edit" className="icon" src={editImage} />
        </button>
        <button onClick={handleDelete} className="link">
          <img alt="delete" className="icon" src={deleteImage} />
        </button>
      </div>
    </li>
  );
};

export default Transaction;
