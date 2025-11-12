import React, { useState } from 'react';

export interface NavItem {
  label: string;
  href: string;
  variant?: 'default' | 'primary';
}

interface HeaderProps {
  brandName?: string;
  navItems: NavItem[];
}

const Header: React.FC<HeaderProps> = ({ brandName = 'CurioCode', navItems }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className='bg-black border-b border-cyan-300'>
      <nav className='container mx-auto px-4 py-4'>
        <div className='flex items-center justify-between'>
          <div className='text-cyan-300 text-xl font-bold'>
            {brandName}
          </div>

          <ul className='hidden md:flex space-x-8 items-center'>
            {navItems.map((item, index) => (
              <li key={index}>
                <a 
                  href={item.href}
                  className={
                    item.variant === 'primary'
                      ? 'bg-cyan-300 text-black px-4 py-2 rounded hover:bg-cyan-400 transition-colors duration-200 font-medium'
                      : 'text-cyan-300 hover:text-cyan-100 transition-colors duration-200 font-medium'
                  }
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            onClick={toggleMenu}
            className='md:hidden text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300 rounded p-2'
            aria-label='Toggle menu'
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <svg 
                className='w-6 h-6' 
                fill='none' 
                stroke='currentColor' 
                viewBox='0 0 24 24'
              >
                <path 
                  strokeLinecap='round' 
                  strokeLinejoin='round' 
                  strokeWidth={2} 
                  d='M6 18L18 6M6 6l12 12' 
                />
              </svg>
            ) : (
              <svg 
                className='w-6 h-6' 
                fill='none' 
                stroke='currentColor' 
                viewBox='0 0 24 24'
              >
                <path 
                  strokeLinecap='round' 
                  strokeLinejoin='round' 
                  strokeWidth={2} 
                  d='M4 6h16M4 12h16M4 18h16' 
                />
              </svg>
            )}
          </button>
        </div>

        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-64 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <ul className='flex flex-col space-y-4 pb-4'>
            {navItems.map((item, index) => (
              <li key={index}>
                <a 
                  href={item.href}
                  className={
                    item.variant === 'primary'
                      ? 'block bg-cyan-300 text-black px-4 py-2 rounded hover:bg-cyan-400 transition-colors duration-200 font-medium text-center'
                      : 'block text-cyan-300 hover:text-cyan-100 transition-colors duration-200 font-medium py-2'
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
