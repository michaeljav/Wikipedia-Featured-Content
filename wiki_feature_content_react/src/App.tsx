import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Home from './pages/Home';

function App() {
  return (
    <div className='w-screen h-screen bg-green-400'>
      <Home />
    </div>
  );
}

export default App;
