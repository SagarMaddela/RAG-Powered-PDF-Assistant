import React, { useState } from 'react';
import { UploadCloud } from 'lucide-react';
import UploadForm from './components/UploadForm';
import QuestionBox from './components/QuestionBox';
import Header from './components/Header';
import EmptyState from './components/EmptyState'; 

function App() {
  const [uploaded, setUploaded] = useState(false);
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const handleUploadSuccess = (name) => {
    setUploaded(true);
    setFileName(name);
    setLoading(false);
    setShowUploadModal(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onUploadClick={() => setShowUploadModal(true)} fileName={fileName} />
      
      <main className="container px-4 py-8 h-full">
        {showUploadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 max-w-lg w-full mx-4">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <UploadCloud className="mr-2 h-6 w-6 text-green-600" />
                Upload Document
              </h2>
              <UploadForm 
                onUploaded={handleUploadSuccess} 
                setLoading={setLoading}
                loading={loading}
                onCancel={() => setShowUploadModal(false)}
              />
            </div>
          </div>
        )}
        
         {!uploaded ? (
          <EmptyState />
        ) : (
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Ask Questions about <span className="text-green-600">{fileName}</span>
            </h2>
            <QuestionBox fileName={fileName} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
