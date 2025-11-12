import React from 'react';
import Header, { type NavItem } from '../../shared/components/Header';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const adminNavItems: NavItem[] = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'Manage Curiosities', href: '/approved-curiosities' },
  { label: 'Logout', href: '/logout', variant: 'primary' },
];

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="admin-layout">
      <Header brandName="CurioCode Admin" navItems={adminNavItems} />
      <main>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
