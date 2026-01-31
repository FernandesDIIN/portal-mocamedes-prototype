
import React, { useState } from 'react';
import { Institution, Category } from '../types';

interface AdminPanelProps {
  institutions: Institution[];
  onAdd: (inst: Omit<Institution, 'id'>) => void;
  onDelete: (id: string) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ institutions, onAdd, onDelete }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: Category.PUBLIC,
    description: '',
    address: '',
    phone: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.address) return;
    onAdd(formData);
    setFormData({
      name: '',
      category: Category.PUBLIC,
      description: '',
      address: '',
      phone: ''
    });
  };

  return (
    <div className="space-y-10">
      <div className="bg-slate-800 text-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-2">Painel de Administração</h1>
        <p className="opacity-80">Gerencie as instituições e serviços listados no portal.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form Column */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-sm border sticky top-24">
            <h2 className="text-xl font-bold mb-6 text-slate-800 flex items-center">
              <i className="fas fa-plus-circle mr-2 text-blue-600"></i> Cadastrar Novo
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Nome</label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Categoria</label>
                <select 
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value as Category})}
                >
                  {Object.values(Category).map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Endereço</label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.address}
                  onChange={e => setFormData({...formData, address: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Telefone</label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                  placeholder="+244..."
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Descrição</label>
                <textarea 
                  className="w-full p-2 border rounded-lg h-24 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                ></textarea>
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-md">
                Salvar Cadastro
              </button>
            </form>
          </div>
        </div>

        {/* List Column */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="p-6 border-b bg-slate-50 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-800">Registros Existentes ({institutions.length})</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-100 text-slate-500 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Nome / Categoria</th>
                    <th className="px-6 py-4">Endereço</th>
                    <th className="px-6 py-4 text-center">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {institutions.map(inst => (
                    <tr key={inst.id} className="hover:bg-slate-50 transition">
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-800">{inst.name}</div>
                        <div className="text-xs text-blue-600">{inst.category}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">{inst.address}</td>
                      <td className="px-6 py-4 text-center">
                        <button 
                          onClick={() => onDelete(inst.id)}
                          className="text-red-500 hover:bg-red-50 p-2 rounded transition"
                          title="Remover"
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                  {institutions.length === 0 && (
                    <tr>
                      <td colSpan={3} className="px-6 py-12 text-center text-slate-400">
                        Nenhum registro cadastrado.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
