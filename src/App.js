import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import NavbarKrystin from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <div>
        <NavbarKrystin/>
        <Routes>
          <Route exact path='/' render={()=>{return <Navigate to='/home'/>}}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
