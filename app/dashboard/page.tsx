"use client";

import { useEffect, useState } from 'react';
import api from '../../services/api'; 

export default function Dashboard() {

  const [surveys, setSurveys] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const COMPANY_ID = 1; 

  useEffect(() => {
    api.get(`/admin/companies/${COMPANY_ID}/surveys`)
      .then(response => {
        setSurveys(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erro:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
    
      <nav className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">S</div>
          <span className="font-semibold text-gray-700">Sebrae Feedback</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">Olá, Admin</span>
          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-8">
        <header className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Minhas Pesquisas</h1>
            <p className="text-gray-500 mt-1">Gerencie e monitore os resultados em tempo real</p>
          </div>
          <button className="bg-blue-600 text-white px-5 py-2.5 rounded-lg shadow-sm hover:bg-blue-700 hover:shadow transition font-medium text-sm flex items-center gap-2">
            <span>+</span> Criar Nova Pesquisa
          </button>
        </header>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {surveys.length === 0 ? (
              <div className="col-span-full bg-white p-12 rounded-xl border border-dashed border-gray-300 text-center">
                <p className="text-gray-500">Nenhuma pesquisa encontrada.</p>
              </div>
            ) : (
              surveys.map((survey) => (
                <div key={survey.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition duration-200 group cursor-pointer">
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                      Ativa
                    </span>
                    <span className="text-gray-300 text-xs">ID #{survey.id}</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors mb-2">
                    {survey.title}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-6">
                    {survey.description}
                  </p>
                  
                  <div className="border-t border-gray-50 pt-4 flex justify-between items-center">
                    <div className="flex -space-x-2">
                      {[1,2,3].map(i => (
                        <div key={i} className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white"></div>
                      ))}
                    </div>
                    <span className="text-sm font-medium text-blue-600 flex items-center gap-1 group-hover:underline">
                      Ver Relatório →
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}