
import React from 'react';
import { User } from '../types';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: any) => void;
  user: User | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, user, onLogout }) => {
  return (
    <nav className="bg-blue-700 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <div 
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => onNavigate('home')}
        >
          <i className="fas fa-city text-2xl"></i>
          <span className="font-bold text-xl tracking-tight">Portal Moçâmedes</span>
        </div>
        
        <div className="hidden md:flex space-x-6 items-center">
          <button 
            onClick={() => onNavigate('home')}
            className={`hover:text-blue-200 transition ${currentPage === 'home' ? 'font-bold underline underline-offset-4' : ''}`}
          >
            Início
          </button>
          <button 
            onClick={() => onNavigate('directory')}
            className={`hover:text-blue-200 transition ${currentPage === 'directory' ? 'font-bold underline underline-offset-4' : ''}`}
          >
            Diretório
          </button>
          <button 
            onClick={() => onNavigate('feed')}
            className={`hover:text-blue-200 transition ${currentPage === 'feed' ? 'font-bold underline underline-offset-4' : ''}`}
          >
            Feed Comunitário
          </button>
          {user?.isAdmin && (
            <button 
              onClick={() => onNavigate('admin')}
              className={`hover:text-blue-200 transition ${currentPage === 'admin' ? 'font-bold underline underline-offset-4' : ''}`}
            >
              Administração
            </button>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-3">
              <span className="hidden sm:inline-block text-sm">Olá, {user.name}</span>
              <button 
                onClick={onLogout}
                className="bg-blue-800 hover:bg-blue-900 px-3 py-1 rounded text-sm transition"
              >
                Sair
              </button>
            </div>
          ) : (
            <button 
              onClick={() => onNavigate('login')}
              className="bg-white text-blue-700 hover:bg-blue-50 px-4 py-1.5 rounded-full font-semibold text-sm transition"
            >
              Entrar
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
