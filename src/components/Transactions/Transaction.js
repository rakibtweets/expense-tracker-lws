import React from 'react';
import deleteImage from '../../assets/images/delete.svg';
import editImage from '../../assets/images/edit.svg';

const Transaction = ({ transaction }) => {
  const { name, amount, type } = transaction || {};
  return (
    <li className={`transaction ${type}`}>
      <p>{name}</p>
      <div className="right">
        <p>৳ {amount}</p>
        <button className="link">
          <img alt="" className="icon" src={editImage} />
        </button>
        <button className="link">
          <img alt="" className="icon" src={deleteImage} />
        </button>
      </div>
    </li>
  );
};

export default Transaction;
