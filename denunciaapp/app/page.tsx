'use client'

import React, { useState, useRef, useEffect } from 'react';
import { AlertTriangle, Send, Camera } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface Complaint {
  type: string;
  description: string;
  location: string;
}

const ComplaintApp: React.FC = () => {
  const [complaint, setComplaint] = useState<Complaint>({
    type: '',
    description: '',
    location: '',
  });
  const [photo, setPhoto] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Lógica para enviar a denúncia
    console.log('Denúncia:', complaint, 'Foto:', photo);
    alert('Denúncia enviada com sucesso!');
  };

  const startCamera = async () => {
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(newStream);
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }
      setShowCamera(true);
    } catch (err) {
      console.error("Erro ao acessar a câmera:", err);
      alert("Não foi possível acessar a câmera. Por favor, verifique as permissões do seu navegador.");
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext('2d')?.drawImage(videoRef.current, 0, 0);
      const photoDataUrl = canvas.toDataURL('image/jpeg');
      setPhoto(photoDataUrl);
      stopCamera();
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setShowCamera(false);
  };

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

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
              className="w-full p-2 border border-gray-300 rounded-md text-gray-700"
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
              className="w-full p-2 border border-gray-300 rounded-md text-gray-700"
              rows={3}
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
              className="w-full p-2 border border-gray-300 rounded-md text-gray-700"
              placeholder="Endereço ou coordenadas"
              value={complaint.location}
              onChange={(e) => setComplaint({...complaint, location: e.target.value})}
              required
            />
          </div>

          <div className="mb-4">
            {!showCamera && !photo && (
              <button 
                type="button" 
                className="flex items-center text-blue-600 hover:text-blue-800"
                onClick={startCamera}
              >
                <Camera className="mr-2" size={20} />
                Anexar foto
              </button>
            )}
            {showCamera && (
              <div className="relative">
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline
                  className="w-full mb-2 border border-gray-300 rounded-md"
                />
                <div className="mt-2 flex justify-between">
                  <button 
                    type="button" 
                    className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                    onClick={capturePhoto}
                  >
                    Capturar Foto
                  </button>
                  <button 
                    type="button" 
                    className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                    onClick={stopCamera}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
            {photo && (
              <div>
                <img src={photo} alt="Foto capturada" className="w-full mb-2 border border-gray-300 rounded-md"/>
                <button 
                  type="button" 
                  className="text-red-600 hover:text-red-800"
                  onClick={() => setPhoto(null)}
                >
                  Remover Foto
                </button>
              </div>
            )}
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
          <AlertDescription className="text-gray-700">
            Use este serviço com responsabilidade. Denúncias falsas podem resultar em penalidades.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};

export default ComplaintApp;