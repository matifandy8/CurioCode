import React from 'react';
import AdminSidebar from '@/shared/components/AdminSidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="admin-layout">
      <div className="flex min-h-screen bg-gray-950">
        <AdminSidebar />
        <main className="flex-1 ml-56 p-8">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
