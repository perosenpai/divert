import React, { useEffect, useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home'
import Register from './pages/Register';
import Login from './pages/Login';
import Divert from './pages/Divert';
import Divert_App_User from './pages/User/Divert-App-User';
import Divert_App_Admin from './pages/Admin/Divert-App-Admin';
import RegisterTeam_1_1 from './pages/Register-team-1-1';
import RegisterTeam_1_2 from './pages/Register-team-1-2';
import RegisterTeam_1_3 from './pages/Register-team-1-3';
import Divert_App_Chat from './pages/Admin/Divert-App-Chat'
import Divert_App_Tasks from './pages/Admin/Divert-App-Tasks';
import Divert_App_Groups from './pages/Admin/Divert-App-Groups';
import Divert_All_Users from './pages/Admin/Divert-App-All-Users';
import Divert_Edit_All_Users from './pages/Admin/Divert-App-Edit-User-Roles';
import Divert_App_Settings from './pages/Admin/Divert-App-Settings';
import Divert_App_User_Settings from './pages/Admin/Divert-App-Admin-Settings';
import User_Tasks from './pages/User/Divert-App-User-Tasks'
import User_Settings from './pages/User/Divert-App-User-Settings'
import User_Groups from './pages/User/Divert-App-User-Groups'
import User_Chat from './pages/User/Divert-App-User-Chat'
import Settings from './pages/Admin/Divert-App-Settings'
import ClipLoader from "react-spinners/ClipLoader";

export const hideLoader = () =>{
  const loaderEl = document.getElementById('page-loader-id');
  loaderEl.style.display = "none"
}

export const showLoader = () =>{
  const loaderEl = document.getElementById('page-loader-id');
  loaderEl.style.display = "block"
}

export default function App() {
  let user = localStorage.getItem("divert-user");
  const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: "9999" };
  const [loading, setLoading] = useState(true);

  return (
      <BrowserRouter>
      <div id="page-loader-id" style={{height: '100%', width: '100%'}}>
        <div style={style}>
          <ClipLoader 
            display="none"
            color={"#f05f40"}
            loading={loading}
            alignitems= {'center'}
            justifycontent = {'center'}
            flex= {1}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      </div>
      <Routes>
        user ? 
        <Route path='/divert' element={<Divert/>}></Route> :
        <Route path='/' element={<Home/>} ></Route>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/divert" element={<Divert/>}/>
        <Route path="/register-team-1-1" element={<RegisterTeam_1_1/>}/>
        <Route path="/register-team-1-2" element={<RegisterTeam_1_2/>}/>
        <Route path="/register-team-1-3" element={<RegisterTeam_1_3/>}/>
        <Route path="/divert-app-user" element={<Divert_App_User/>}/>
        <Route path="/divert-app-admin" element={<Divert_App_Admin/>}/>
        <Route path="/divert-app-chat" element={<Divert_App_Chat/>}/>
        <Route path='/tasks' element={<Divert_App_Tasks />}/>
        <Route path='/groups' element={<Divert_App_Groups />}/>
        <Route path='/all-users' element={<Divert_All_Users />}/>
        <Route path='/edit-users' element={<Divert_Edit_All_Users />}/>
        <Route path='/divert-settings' element={<Divert_App_Settings />}/>
        <Route path='/admin-settings' element={<Divert_App_User_Settings />}/>
        <Route path='/user-tasks' element={<User_Tasks />}/>
        <Route path='/user-settings' element={<User_Settings />}/>
        <Route path='/user-groups' element={<User_Groups />}/>
        <Route path='/divert-app-user-chat' element={<User_Chat />}/>
        <Route path='/settings' element={<Settings />}/>
      </Routes>
    </BrowserRouter>
  );
}
