"use client";

import { useEffect, useState } from 'react';
import api from '../../services/api';
import { useRouter } from 'next/navigation';

export default function Perfil() {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
 
    const email = localStorage.getItem('user_email');
    
    if (!email) {
      router.push('/'); 
      return;
    }

    api.get(`/auth/profile/${email}`)
      .then(res => {
        setUserData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="flex h-screen justify-center items-center text-blue-600">Carregando perfil...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center items-center">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden">
        
       
        <div className="bg-blue-600 p-8 text-center text-white">
          <div className="w-20 h-20 bg-white/20 rounded-full mx-auto flex items-center justify-center text-3xl font-bold backdrop-blur-sm">
            {userData?.user?.nome?.charAt(0) || 'U'}
          </div>
          <h2 className="text-2xl font-bold mt-4">{userData?.user?.nome}</h2>
          <p className="text-blue-100 text-sm">{userData?.user?.email}</p>
        </div>

      
        <div className="p-8">
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-xl text-center border border-gray-100">
              <p className="text-gray-500 text-xs uppercase tracking-wide font-semibold">Pontos</p>
              <p className="text-3xl font-bold text-blue-600">{userData?.ranking?.points || 0}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl text-center border border-gray-100">
              <p className="text-gray-500 text-xs uppercase tracking-wide font-semibold">Nível</p>
              <p className="text-3xl font-bold text-yellow-500">{userData?.ranking?.level || 1}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-500">Telefone Vinculado</span>
              <span className="font-medium text-gray-800">{userData?.user?.phoneNumber || 'Não vinculado'}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-500">Role</span>
              <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                {userData?.user?.role}
              </span>
            </div>
          </div>

          <button 
            onClick={() => router.push('/')}
            className="w-full mt-8 border border-gray-300 text-gray-600 font-medium py-3 rounded-lg hover:bg-gray-50 transition"
          >
            Sair da conta
          </button>
        </div>
      </div>
    </div>
  );
}