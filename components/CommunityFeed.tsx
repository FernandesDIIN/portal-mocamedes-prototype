
import React, { useState } from 'react';
import { Post, FeedType, User } from '../types';

interface CommunityFeedProps {
  posts: Post[];
  onAddPost: (post: Omit<Post, 'id' | 'timestamp' | 'userId' | 'userName'>) => void;
  user: User | null;
  onNavigate: (page: any) => void;
}

const CommunityFeed: React.FC<CommunityFeedProps> = ({ posts, onAddPost, user, onNavigate }) => {
  const [filter, setFilter] = useState<FeedType | 'Todos'>('Todos');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '', type: FeedType.UTILITY });

  const filtered = posts.filter(p => filter === 'Todos' || p.type === filter);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title || !newPost.content) return;
    onAddPost(newPost);
    setNewPost({ title: '', content: '', type: FeedType.UTILITY });
    setShowAddForm(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Feed Comunitário</h1>
        <p className="text-slate-600">Espaço para moradores compartilharem notícias, vendas e eventos.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="flex gap-2 overflow-x-auto w-full sm:w-auto">
          {['Todos', ...Object.values(FeedType)].map(type => (
            <button
              key={type}
              onClick={() => setFilter(type as any)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                filter === type 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-slate-600 border hover:bg-slate-50'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        
        {user ? (
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition flex items-center justify-center"
          >
            <i className={`fas ${showAddForm ? 'fa-times' : 'fa-plus'} mr-2`}></i>
            {showAddForm ? 'Cancelar' : 'Nova Publicação'}
          </button>
        ) : (
          <div className="text-sm text-slate-500 italic">
            <button onClick={() => onNavigate('login')} className="text-blue-600 hover:underline font-bold">Entre</button> para publicar no feed.
          </div>
        )}
      </div>

      {showAddForm && user && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border-2 border-blue-100 shadow-md animate-in fade-in duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Título</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={newPost.title}
                onChange={e => setNewPost({...newPost, title: e.target.value})}
                placeholder="Ex: Vendo fogão usado"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Categoria</label>
              <select 
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={newPost.type}
                onChange={e => setNewPost({...newPost, type: e.target.value as FeedType})}
              >
                {Object.values(FeedType).map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold text-slate-700 mb-1">Conteúdo</label>
            <textarea 
              className="w-full p-2 border rounded-lg h-32 focus:ring-2 focus:ring-blue-500 outline-none"
              value={newPost.content}
              onChange={e => setNewPost({...newPost, content: e.target.value})}
              placeholder="Descreva sua publicação com detalhes..."
              required
            ></textarea>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 transition">
            Publicar Agora
          </button>
        </form>
      )}

      <div className="space-y-6">
        {filtered.length > 0 ? (
          filtered.map(post => (
            <div key={post.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                    {post.userName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">{post.userName}</h4>
                    <span className="text-[10px] text-slate-400">{new Date(post.timestamp).toLocaleString('pt-AO')}</span>
                  </div>
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${
                  post.type === FeedType.NEWS ? 'bg-blue-100 text-blue-700' :
                  post.type === FeedType.SALE ? 'bg-green-100 text-green-700' :
                  post.type === FeedType.EVENT ? 'bg-purple-100 text-purple-700' :
                  'bg-orange-100 text-orange-700'
                }`}>
                  {post.type}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">{post.title}</h3>
              <p className="text-slate-600 whitespace-pre-line leading-relaxed">{post.content}</p>
              <div className="mt-4 pt-4 border-t flex space-x-6 text-slate-400 text-sm">
                <button className="hover:text-blue-600 transition flex items-center">
                  <i className="far fa-thumbs-up mr-2"></i> Útil
                </button>
                <button className="hover:text-blue-600 transition flex items-center">
                  <i className="far fa-comment mr-2"></i> Comentar
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 text-slate-400 bg-white rounded-xl border border-dashed">
            <p>Nenhuma publicação encontrada nesta categoria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityFeed;
