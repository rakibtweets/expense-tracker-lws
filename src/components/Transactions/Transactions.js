import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions } from '../../features/transaction/transactionSlice';

import Transaction from './Transaction';

const Transactions = () => {
  const dispatch = useDispatch();
  const { transactions, isLoading, isError, error } = useSelector(
    (state) => state.transaction
  );

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  let content = null;

  if (isLoading) {
    content = <h3 className="error">Loading...</h3>;
  }
  if (!isLoading && isError) {
    content = <h4 className="error">{error}</h4>;
  }
  if (!isLoading && !isError && transactions?.length > 0) {
    content = transactions.map((transaction) => (
      <Transaction key={transaction.id} transaction={transaction} />
    ));
  }
  if (!isLoading && !isError && transactions?.length === 0) {
    content = <h4>No transaction found !</h4>;
  }

  return (
    <>
      <p className="second_heading">Your Transactions:</p>

      <div className="conatiner_of_list_of_transactions">
        <ul>{content}</ul>
      </div>
    </>
  );
};

export default Transactions;
