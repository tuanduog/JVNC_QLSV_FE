import { BrowserRouter, Routes, Route} from 'react-router-dom';
import React from 'react';
import Login from './Login/Login';
import Home_Stu from './Student/Home/Home_Stu';
import Stu_info from './Student/Student_info/Student_info';
import Stu_Schedule from './Student/Schedule/Schedule';
import Stu_Response from './Student/Response/Response';
import Course_info from './Student/Course_info/Course_info';

import Home_Lec from './Lecturer/Home/Home_Lec';
import Lec_info from './Lecturer/Lecturer_info/Lecturer_info';
import Lec_Schedule from './Lecturer/Schedule/Schedule';
import Lec_Response from './Lecturer/Response/Response';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/Home_Student' element={<Home_Stu/>}> {/*nested routes */}
            <Route path='Student_info' element={<Stu_info/>}></Route>
            <Route path='Schedule' element={<Stu_Schedule/>}></Route>
            <Route path='Response' element={<Stu_Response/>}></Route>
            <Route path='Course' element={<Course_info/>}></Route>
          </Route>
          <Route path='/Home_Lecturer' element={<Home_Lec/>}>
            <Route path='Lecturer_info' element={<Lec_info/>}></Route>
            <Route path='Schedule' element={<Lec_Schedule/>}></Route>
            <Route path='Response' element={<Lec_Response/>}></Route>
            
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
