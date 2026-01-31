
import React, { useState } from 'react';
import { User } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
  onNavigate: (page: any) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Simulate different users for testing
    if (email === 'admin@mocamedes.ao' && password === 'admin123') {
      onLogin({ id: '1', name: 'Administrador Local', email, isAdmin: true });
      onNavigate('admin');
    } else if (email === 'cidadao@mocamedes.ao' && password === '123456') {
      onLogin({ id: '2', name: 'João Silva', email, isAdmin: false });
      onNavigate('feed');
    } else {
      setError('Credenciais inválidas. Use admin@mocamedes.ao (senha: admin123) ou cidadao@mocamedes.ao (senha: 123456)');
    }
  };

  return (
    <div className="flex justify-center items-center py-12">
      <div className="bg-white p-8 rounded-2xl shadow-xl border w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
            <i className="fas fa-user-lock"></i>
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Área do Cidadão</h1>
          <p className="text-slate-500">Acesse para participar da comunidade.</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-xs mb-6 border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">E-mail</label>
            <input 
              type="email" 
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="exemplo@mocamedes.ao"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Senha</label>
            <input 
              type="password" 
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg mt-4">
            Entrar no Portal
          </button>
        </form>

        <div className="mt-8 pt-6 border-t text-center text-sm text-slate-500">
          <p>Dicas de Acesso:</p>
          <p className="mt-2">Admin: <span className="font-mono bg-slate-100 px-1">admin@mocamedes.ao</span> / <span className="font-mono bg-slate-100 px-1">admin123</span></p>
          <p className="mt-1">Cidadão: <span className="font-mono bg-slate-100 px-1">cidadao@mocamedes.ao</span> / <span className="font-mono bg-slate-100 px-1">123456</span></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
