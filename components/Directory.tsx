
import React, { useState } from 'react';
import { Institution, Category } from '../types';

interface DirectoryProps {
  institutions: Institution[];
}

const Directory: React.FC<DirectoryProps> = ({ institutions }) => {
  const [filter, setFilter] = useState<Category | 'Todos'>('Todos');
  const [search, setSearch] = useState('');

  const filtered = institutions.filter(inst => {
    const matchesFilter = filter === 'Todos' || inst.category === filter;
    const matchesSearch = inst.name.toLowerCase().includes(search.toLowerCase()) || 
                          inst.description.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-3xl font-bold text-slate-800 mb-4">Diretório de Moçâmedes</h1>
        <p className="text-slate-600">Encontre instituições públicas, escolas, centros de saúde e serviços comerciais locais em um só lugar.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl shadow-sm border">
        <div className="relative w-full md:w-96">
          <i className="fas fa-search absolute left-3 top-3 text-slate-400"></i>
          <input 
            type="text"
            placeholder="Buscar por nome ou descrição..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
          {['Todos', ...Object.values(Category)].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat as any)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition ${
                filter === cat 
                ? 'bg-blue-600 text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length > 0 ? (
          filtered.map(inst => (
            <div key={inst.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${
                  inst.category === Category.PUBLIC ? 'bg-blue-100 text-blue-700' :
                  inst.category === Category.HEALTH ? 'bg-red-100 text-red-700' :
                  inst.category === Category.EDUCATION ? 'bg-green-100 text-green-700' :
                  'bg-amber-100 text-amber-700'
                }`}>
                  {inst.category}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">{inst.name}</h3>
              <p className="text-slate-600 text-sm mb-4 flex-grow">{inst.description}</p>
              
              <div className="space-y-2 mt-auto pt-4 border-t text-sm text-slate-500">
                <div className="flex items-center">
                  <i className="fas fa-map-marker-alt w-5 text-blue-600"></i>
                  <span>{inst.address}</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-phone w-5 text-blue-600"></i>
                  <span>{inst.phone}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-slate-400">
            <i className="fas fa-inbox text-5xl mb-4"></i>
            <p>Nenhum resultado encontrado para sua busca.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Directory;
