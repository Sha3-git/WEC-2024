import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login'
import Register from './pages/Register'
import FinanceTracker from './pages/FinanceTracker'
import Piechart from './components/piechart.jsx';
function App() {

 
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/finance' element={<FinanceTracker />}/>
          <Route path='/p' element={<Piechart />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
