import { BrowserRouter, Routes, Route} from 'react-router-dom';
import React from 'react';
import Login from './Login/Login';
import Home from './Student/Home/Home';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/Login' element={<Login/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
