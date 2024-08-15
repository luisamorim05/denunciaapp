'use client'

import React, { useState } from 'react';
import { AlertTriangle, Send, Camera } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const ComplaintApp = () => {
  const [complaint, setComplaint] = useState({
    type: '',
    description: '',
    location: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar a denúncia
    alert('Denúncia enviada com sucesso!');
    setComplaint({ type: '', description: '', location: '' });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Denúncia Municipal</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Irregularidade
            </label>
            <select 
              className="w-full p-2 border border-gray-300 rounded-md"
              value={complaint.type}
              onChange={(e) => setComplaint({...complaint, type: e.target.value})}
              required
            >
              <option value="">Selecione o tipo</option>
              <option value="lixo">Lixo irregular</option>
              <option value="iluminacao">Problemas de iluminação</option>
              <option value="buraco">Buracos na via</option>
              <option value="outro">Outro</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descrição
            </label>
            <textarea 
              className="w-full p-2 border border-gray-300 rounded-md"
              rows="3"
              value={complaint.description}
              onChange={(e) => setComplaint({...complaint, description: e.target.value})}
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Localização
            </label>
            <input 
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Endereço ou coordenadas"
              value={complaint.location}
              onChange={(e) => setComplaint({...complaint, location: e.target.value})}
              required
            />
          </div>

          <div className="mb-4">
            <button type="button" className="flex items-center text-blue-600 hover:text-blue-800">
              <Camera className="mr-2" size={20} />
              Anexar foto
            </button>
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 flex items-center justify-center"
          >
            <Send className="mr-2" size={20} />
            Enviar Denúncia
          </button>
        </form>

        <Alert className="mt-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Atenção</AlertTitle>
          <AlertDescription>
            Use este serviço com responsabilidade. Denúncias falsas podem resultar em penalidades.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};

export default ComplaintApp;