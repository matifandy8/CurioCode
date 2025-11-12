import React from 'react';
import Header, { type NavItem } from '../../shared/components/Header';

interface MainLayoutProps {
  children: React.ReactNode;
}

const mainNavItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Login', href: '/login' },
  { label: 'Register', href: '/register', variant: 'primary' },
];

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div>
      <Header brandName="CurioCode" navItems={mainNavItems} />
      <main>
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
