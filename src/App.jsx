import { BrowserRouter, Routes, Route} from 'react-router-dom';
import React from 'react';
import Login from './Login/Login';
import Home_Stu from './Student/Home/Home_Stu';
import Home_Lec from './Lecturer/Home/Home_Lec';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/Home_Student' element={<Home_Stu/>}></Route>
          <Route path='/Home_Lecturer' element={<Home_Lec/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
