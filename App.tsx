
import React, { useState, useEffect } from 'react';
import { User, Institution, Post, Category, FeedType } from './types';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Directory from './components/Directory';
import CommunityFeed from './components/CommunityFeed';
import AdminPanel from './components/AdminPanel';
import Login from './components/Login';

const STORAGE_KEY_INSTITUTIONS = 'portal_mocamedes_institutions';
const STORAGE_KEY_POSTS = 'portal_mocamedes_posts';

const initialInstitutions: Institution[] = [
  {
    id: '1',
    name: 'Governo Provincial do Namibe',
    category: Category.PUBLIC,
    description: 'Sede administrativa da província do Namibe.',
    address: 'Avenida Eduardo dos Santos, Moçâmedes',
    phone: '+244 9XX XXX XXX'
  },
  {
    id: '2',
    name: 'Hospital Provincial do Namibe',
    category: Category.HEALTH,
    description: 'Principal unidade de saúde da região.',
    address: 'Rua da Saúde, Bairro 5 de Abril',
    phone: '+244 9XX XXX XXX'
  },
  {
    id: '3',
    name: 'Escola Primária Nº 12',
    category: Category.EDUCATION,
    description: 'Ensino fundamental de qualidade.',
    address: 'Bairro Valódia, Moçâmedes',
    phone: '+244 9XX XXX XXX'
  }
];

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'directory' | 'feed' | 'admin' | 'login'>('home');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  // Load data from localStorage (Simulating SQL database)
  useEffect(() => {
    const savedInst = localStorage.getItem(STORAGE_KEY_INSTITUTIONS);
    const savedPosts = localStorage.getItem(STORAGE_KEY_POSTS);

    if (savedInst) {
      setInstitutions(JSON.parse(savedInst));
    } else {
      setInstitutions(initialInstitutions);
      localStorage.setItem(STORAGE_KEY_INSTITUTIONS, JSON.stringify(initialInstitutions));
    }

    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
  }, []);

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('home');
  };

  const addInstitution = (inst: Omit<Institution, 'id'>) => {
    const newInst = { ...inst, id: Date.now().toString() };
    const updated = [...institutions, newInst];
    setInstitutions(updated);
    localStorage.setItem(STORAGE_KEY_INSTITUTIONS, JSON.stringify(updated));
  };

  const deleteInstitution = (id: string) => {
    const updated = institutions.filter(i => i.id !== id);
    setInstitutions(updated);
    localStorage.setItem(STORAGE_KEY_INSTITUTIONS, JSON.stringify(updated));
  };

  const addPost = (post: Omit<Post, 'id' | 'timestamp' | 'userId' | 'userName'>) => {
    if (!currentUser) return;
    const newPost: Post = {
      ...post,
      id: Date.now().toString(),
      timestamp: Date.now(),
      userId: currentUser.id,
      userName: currentUser.name
    };
    const updated = [newPost, ...posts];
    setPosts(updated);
    localStorage.setItem(STORAGE_KEY_POSTS, JSON.stringify(updated));
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />;
      case 'directory':
        return <Directory institutions={institutions} />;
      case 'feed':
        return <CommunityFeed posts={posts} onAddPost={addPost} user={currentUser} onNavigate={setCurrentPage} />;
      case 'admin':
        return currentUser?.isAdmin ? (
          <AdminPanel 
            institutions={institutions} 
            onAdd={addInstitution} 
            onDelete={deleteInstitution} 
          />
        ) : <Home onNavigate={setCurrentPage} />;
      case 'login':
        return <Login onLogin={setCurrentUser} onNavigate={setCurrentPage} />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        currentPage={currentPage} 
        onNavigate={setCurrentPage} 
        user={currentUser} 
        onLogout={handleLogout} 
      />
      <main className="flex-grow container mx-auto px-4 py-8">
        {renderPage()}
      </main>
      <footer className="bg-slate-900 text-white py-8 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="font-bold text-lg mb-2">Portal Moçâmedes</p>
          <p className="text-slate-400 text-sm">Desenvolvido como projeto educacional para a província do Namibe.</p>
          <p className="text-slate-500 text-xs mt-4">© 2024 - Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
