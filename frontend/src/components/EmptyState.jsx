import React from 'react';
import { FileQuestion, FileText, Search } from 'lucide-react';

const EmptyState = () => {
  return (
    <div className="mt-12 text-center">
      <h3 className="text-xl font-medium text-slate-700 mb-6">
        How it works
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="h-6 w-6 text-blue-600" />
          </div>
          <h4 className="font-medium text-slate-800 mb-2">Upload Document</h4>
          <p className="text-slate-600 text-sm">
            Upload your PDF document to start interacting with its contents.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileQuestion className="h-6 w-6 text-purple-600" />
          </div>
          <h4 className="font-medium text-slate-800 mb-2">Ask Questions</h4>
          <p className="text-slate-600 text-sm">
            Ask specific questions about the content in natural language.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="bg-teal-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="h-6 w-6 text-teal-600" />
          </div>
          <h4 className="font-medium text-slate-800 mb-2">Get Answers</h4>
          <p className="text-slate-600 text-sm">
            Receive accurate answers and insights based on your document.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
