import React from 'react';

const AdminDashboard: React.FC = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>👋 Welcome, Admin!</h1>
      <p>Here’s your dashboard overview.</p>

      <div style={{ marginTop: '2rem' }}>
        <ul>
          <li>📋 View All Users</li>
          <li>🛠️ Manage Roles</li>
          <li>📦 Manage Products/Services</li>
          <li>📊 Analytics & Reports</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
