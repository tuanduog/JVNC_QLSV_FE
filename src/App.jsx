import { BrowserRouter, Routes, Route} from 'react-router-dom';
import React from 'react';
import Login from './Login/Login';
import Home_Stu from './Student/Home/Home_Stu';
import Home_Lec from './Lecturer/Home/Home_Lec';
import Stu_info from './Student/Student_info/Student_info';
import Schedule from './Student/Schedule/Schedule';
import Response from './Student/Response/Response';
import Course_info from './Student/Course_info/Course_info';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/Home_Student' element={<Home_Stu/>}> {/*nested routes */}
            <Route path='Student_info' element={<Stu_info/>}></Route>
            <Route path='Schedule' element={<Schedule/>}></Route>
            <Route path='Response' element={<Response/>}></Route>
            <Route path='Course' element={<Course_info/>}></Route>
          </Route>
          <Route path='/Home_Lecturer' element={<Home_Lec/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
