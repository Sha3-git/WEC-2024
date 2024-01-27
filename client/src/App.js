import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login'
import Register from './pages/Register'
import FinanceTracker from './pages/FinanceTracker'

function App() {

 
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/finance' element={<FinanceTracker />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
