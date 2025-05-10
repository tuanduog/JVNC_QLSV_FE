import { BrowserRouter, Routes, Route} from 'react-router-dom';
import React from 'react';
import Login from './Login/Login';
import Register from './Register/Register';
import Home from './Home/Home';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/Login' element={<Login/>}></Route>
          <Route path='/Register' element={<Register/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
