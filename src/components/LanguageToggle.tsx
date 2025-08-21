'use client';

import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as 'vi' | 'en');
  };

  return (
    <div className="relative">
      <select
        value={language}
        onChange={handleLanguageChange}
        className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm cursor-pointer"
        aria-label="Select language"
      >
        <option value="vi" className="flex items-center">
          🇻🇳 Tiếng Việt
        </option>
        <option value="en" className="flex items-center">
          🇺🇸 English
        </option>
      </select>
      {/* Custom dropdown arrow */}
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};

export default LanguageToggle;