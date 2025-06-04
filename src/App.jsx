import { BrowserRouter, Routes, Route} from 'react-router-dom';
import React from 'react';
import Login from './Login/Login';

import Home_Stu from './Student/Home/Home_Stu';
import Stu_info from './Student/Student_info/Student_info';
import Stu_Schedule from './Student/Schedule/Schedule';
import Stu_Response from './Student/Response/Response';
import Course_info from './Student/Course_info/Course_info';
import Hello_Stu from './Student/Hello_Stu/Hello_Stu';

import Home_Lec from './Lecturer/Home/Home_Lec';
import Lec_info from './Lecturer/Lecturer_info/Lecturer_info';
import Lec_Schedule from './Lecturer/Schedule/Schedule';
import Lec_Response from './Lecturer/Response/Response';
import Hello_Lec from './Lecturer/Hello_Lec/Hello_Lec';
import Course_info_lec from './Lecturer/Course_info/Course_info';
import ManageMarks from './Lecturer/Course_info/ManageMarks';

import Home_Admin from './Admin/Home/Home_Admin';
import Manage_Course from './Admin/Manage_Course/Manage_Course';
import Manage_GiangVien from './Admin/Manage_GiangVien/Manage_GiangVien';
import Manage_Response from './Admin/Manage_Response/Manage_Response';
import Manage_SinhVien from './Admin/Manage_SinhVien/Manage_SinhVien';
import Fix_SinhVien from './Admin/Manage_SinhVien/Fix_SinhVien';
import Add_SinhVien from './Admin/Manage_SinhVien/Add_SinhVien';
import Add_GiangVien from './Admin/Manage_GiangVien/Add_GiangVien';
import Fix_GiangVien from './Admin/Manage_GiangVien/Fix_GiangVien';
import Hellopage from './Admin/Hellopage.jsx/Hellopage';
import Fix_Course from './Admin/Manage_Course/Fix_Course';
import Add_Course from './Admin/Manage_Course/Add_Course';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/Home_Student' element={<Home_Stu/>}> {/*nested routes */}
            <Route path='Hello_Stu' element={<Hello_Stu/>}></Route>
            <Route path='Student_info' element={<Stu_info/>}></Route>
            <Route path='Schedule' element={<Stu_Schedule/>}></Route>
            <Route path='Response' element={<Stu_Response/>}></Route>
            <Route path='Course' element={<Course_info/>}></Route>
          </Route>

          <Route path='/Home_Lecturer' element={<Home_Lec/>}>
            <Route path='Hello_Lec' element={<Hello_Lec/>}></Route>
            <Route path='Lecturer_info' element={<Lec_info/>}></Route>
            <Route path='Schedule' element={<Lec_Schedule/>}></Route>
            <Route path='Response' element={<Lec_Response/>}></Route>
            <Route path='Course' element={<Course_info_lec/>}></Route>
            <Route path='Marks' element={<ManageMarks/>}></Route>
          </Route>

          <Route path='/Home_Admin' element={<Home_Admin/>}>
            <Route path='Hellopage' element={<Hellopage/>}></Route>
            <Route path='Manage_Course' element={<Manage_Course/>}></Route>
            <Route path='Manage_SinhVien' element={<Manage_SinhVien/>}></Route>
            <Route path='Manage_GiangVien' element={<Manage_GiangVien/>}></Route>
            <Route path='Manage_Response' element={<Manage_Response/>}></Route>
            <Route path='Fix_SinhVien' element={<Fix_SinhVien/>}></Route>
            <Route path='Add_SinhVien' element={<Add_SinhVien/>}></Route>
            <Route path='Add_GiangVien' element={<Add_GiangVien/>}></Route>
            <Route path='Fix_GiangVien' element={<Fix_GiangVien/>}></Route>
            <Route path='Fix_Course' element={<Fix_Course/>}></Route>
            <Route path='Add_Course' element={<Add_Course/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
