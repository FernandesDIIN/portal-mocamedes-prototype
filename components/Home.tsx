
import React from 'react';

interface HomeProps {
  onNavigate: (page: any) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden bg-blue-600 h-[400px] flex items-center">
        <img 
          src="https://picsum.photos/id/10/1200/400" 
          alt="Moçâmedes Landscape" 
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40"
        />
        <div className="relative z-10 px-8 md:px-16 text-white max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Bem-vindo ao Portal de Moçâmedes</h1>
          <p className="text-xl mb-8 opacity-90">Sua central única de informações, serviços e conexão com a nossa comunidade no Namibe.</p>
          <div className="flex space-x-4">
            <button 
              onClick={() => onNavigate('directory')}
              className="bg-white text-blue-700 px-6 py-3 rounded-lg font-bold hover:bg-blue-50 transition"
            >
              Ver Diretório
            </button>
            <button 
              onClick={() => onNavigate('feed')}
              className="bg-blue-800 text-white border border-blue-400 px-6 py-3 rounded-lg font-bold hover:bg-blue-900 transition"
            >
              Feed Comunitário
            </button>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-slate-800">O que você procura hoje?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition cursor-pointer" onClick={() => onNavigate('directory')}>
            <div className="text-blue-600 mb-4 text-3xl"><i className="fas fa-university"></i></div>
            <h3 className="font-bold mb-2">Instituições</h3>
            <p className="text-slate-500 text-sm">Contatos e endereços de órgãos públicos e privados.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition cursor-pointer" onClick={() => onNavigate('directory')}>
            <div className="text-green-600 mb-4 text-3xl"><i className="fas fa-heartbeat"></i></div>
            <h3 className="font-bold mb-2">Saúde</h3>
            <p className="text-slate-500 text-sm">Hospitais, clínicas e postos de saúde da cidade.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition cursor-pointer" onClick={() => onNavigate('directory')}>
            <div className="text-amber-600 mb-4 text-3xl"><i className="fas fa-shopping-bag"></i></div>
            <h3 className="font-bold mb-2">Comércio</h3>
            <p className="text-slate-500 text-sm">Apoie os negócios locais e encontre o que precisa.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition cursor-pointer" onClick={() => onNavigate('feed')}>
            <div className="text-purple-600 mb-4 text-3xl"><i className="fas fa-users"></i></div>
            <h3 className="font-bold mb-2">Comunidade</h3>
            <p className="text-slate-500 text-sm">Notícias, anúncios de vendas e eventos locais.</p>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-white rounded-2xl p-8 shadow-sm border grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Sobre Moçâmedes</h2>
          <p className="text-slate-600 mb-4 leading-relaxed">
            Moçâmedes, a capital da província do Namibe em Angola, é uma cidade vibrante entre o deserto e o mar. Conhecida pela sua arquitetura colonial e o seu clima único, a cidade está em constante crescimento.
          </p>
          <p className="text-slate-600 mb-6 leading-relaxed">
            Este portal nasceu da necessidade de organizar as informações do nosso município, facilitando a vida do cidadão e promovendo o desenvolvimento local de forma digital e inclusiva.
          </p>
          <button className="text-blue-600 font-bold hover:underline">Saiba mais sobre a história do Namibe →</button>
        </div>
        <div className="rounded-xl overflow-hidden shadow-lg h-64 md:h-full">
          <img 
            src="https://picsum.photos/id/28/600/400" 
            alt="Namibe Coast" 
            className="w-full h-full object-cover"
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
