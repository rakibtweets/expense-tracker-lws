import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="App">
      {/* header */}
      <div className="header">
        <h1>Expense Tracker</h1>
      </div>
      {/* main */}
      <div className="main">
        <div className="container">{children}</div>
      </div>

      {/* Footer */}

      <div className="footer">&copy;2022 Learn with Sumit</div>
    </div>
  );
};

export default Layout;
