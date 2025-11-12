import React from 'react';

const AdminPage: React.FC = () => {
  return (
      <div className="p-8">
        <h1>Admin Dashboard</h1>
        <div className="">
          <div className="">
            <h3>Total Users</h3>
            <p>1,234</p>
          </div>
          <div className="">
            <h3>Active Users</h3>
            <p>789</p>
          </div>
        </div>
      </div>
  );
};

export default AdminPage;
