import React from 'react';
import PublicHeader from '@/shared/components/PublicHeader';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen">
      <PublicHeader />
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
