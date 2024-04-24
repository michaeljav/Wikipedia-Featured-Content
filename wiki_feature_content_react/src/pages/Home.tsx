import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContentType';
import ContentPage from './ContentPage';
import { ScrollToTopButton } from '../components/ScrollToTopButton';

const Home: React.FC = () => {
  const {
    selectedDate,
    setSelectedDate,
    selectedLanguage,
    setSelectedLanguage,
  } = useContext(AppContext);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(e.target.value);
  };

  return (
    // <div className='container mx-auto min-w-96 '>
    <main className=' min-w-96 flex flex-col items-center justify-center  font-semibold'>
      {/* <div className='text-2xl font-bold mb-4'>Wikipedia Featured Content</div> */}
      <h1 className='text-2xl font-extrabold shadow-xl mt-10'>
        WIKIPEDIA FEATURED CONTENT
      </h1>
      {/* <div className='flex items-center space-x-4 mb-4'> */}
      <div className=' mt-10 mb-4'>
        <input
          type='date'
          value={selectedDate}
          onChange={handleDateChange}
          className='border border-gray-300 rounded px-2 py-1 w-40 mr-3'
        />
        <select
          value={selectedLanguage}
          onChange={handleLanguageChange}
          className='border border-gray-300 rounded px-2 py-1 w-36'
        >
          <option value='en'>English</option>
          <option value='es'>Spanish</option>
        </select>
      </div>
      {/* <Link
        to='/content'
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Explore Content
      </Link> */}

      {/* {showContent && <ContentPage />}{' '} */}
      {/* Conditional rendering of ContentPage */}
      <ContentPage />

      {/* ScrollToTopButton component */}
      <ScrollToTopButton />
    </main>
  );
};

export default Home;
