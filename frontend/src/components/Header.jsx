import React from 'react';
import { UploadCloud, FileText } from 'lucide-react';
import logo from '../assests/logo.png';

const Header = ({ onUploadClick, fileName }) => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-2 sm:px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          {/* <img src="https://i.imgur.com/YEK3kXz.png" alt="Planet" className="h-8" /> */}
          <img src={logo} alt="Logo" className="h-12" />
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          {fileName && (
            <div className="flex items-center border border-green-400 rounded px-1.5 py-1 bg-green-50 max-w-[120px] sm:max-w-xs overflow-x-auto">
              <FileText className="h-5 w-5 text-green-600 mr-1 shrink-0" />
              <span className="text-green-700 text-xs sm:text-sm truncate">{fileName}</span>
            </div>
          )}
          <button 
            onClick={onUploadClick}
            className="bg-green-600 hover:bg-green-700 text-white px-2 py-2 sm:px-4 rounded-lg transition-colors flex items-center text-xs sm:text-base"
          >
            <UploadCloud className="h-5 w-5 mr-1 sm:mr-2" />
            <span className="hidden xs:inline">Upload PDF</span>
            <span className="inline xs:hidden">Upload</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;