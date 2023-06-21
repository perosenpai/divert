import React, {useState} from 'react'
import '../assets/css/Profile-Edit-Form-styles.css'
import '../assets/css/Profile-Edit-Form.css'
import axios from 'axios';
import { updateRoute } from '../utils/APIRoutes';
import {ToastContainer, toast} from 'react-toastify'; 
import "react-toastify/dist/ReactToastify.css";
import { ReactSession }  from 'react-client-session';
import Avatar from '../assets/img/avatar.png';

let user = localStorage.getItem("divert-user");
user = JSON.parse(user);

let newUser = {
  "avatar": user ? user.avatar : "",
  "email": user ? user.email : "",
  "fullName": user ? user.fullName : "",
  "nickname": user ? user.nickname : "",
  "password": user ? user.password : "",
  "_id": user ? user._id : ""
}

function UserSettings() {
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  }

  const[image, setImage] = useState("");

  const updateAdminInfo= async (e)=>{
    e.preventDefault();

    const {data} = await axios.put(updateRoute, 
      newUser
    );

    
    if(data.status === false){
      toast.error(data.msg, toastOptions);
    }
    else{
      localStorage.setItem("divert-user", JSON.stringify(newUser));
      window.location.reload(false);
    }
  }

  const changeAvatar = (e) =>{
    // console.log(e.target.files[0]);
    document.getElementById('image-avatar-id').src = URL.createObjectURL(e.target.files[0])

    const file = e.target.files[0];
    const reader = new FileReader();

    reader.addEventListener("load", () =>{
      newUser.avatar = reader.result;
    })

    reader.readAsDataURL(file)
  }

  const reloadPage = (e) =>{
    e.preventDefault();
    window.location.reload(false);
  }

  const handleInputChange = (event) => {    
    newUser.email = event.target.value;
  };

  const handleFullnameChange = (event) => {    
    newUser.fullName = event.target.value;
  };

  const handleNickname = (event) => {    
    newUser.nickname = event.target.value;
  };


  return (
    <>
      <div className="container profile profile-view" id="profile" style={{maxHeight: "500px"}}>
        <form>
            <div className="row profile-row" style={{maxHeight: "100px"}}>
     
                <div className="col-md-8">
                    <h1>Profile </h1>
                    <div className="row" style={{maxHeight: "100px"}}>
                        <div className="col-sm-6 col-md-6">
                            <div className="form-group mb-3">
                              <label id="input-name" className="form-label">Full Name </label>
                              <input className="form-control" defaultValue={user.fullName} type="text" name="firstname" onChange={handleFullnameChange}/>
                            </div>
                        </div>
                        <div id="avatar-responsive-change" className="col-sm-6 col-md-6">
                          {/* <div className="avatar content-right">
                            <div id="avatar-id-admin" className="avatar-bg center"></div>
                          </div> */}
                          <img id="image-avatar-id"src={user.avatar ? user.avatar : Avatar}/>
                          <label id="label-avatar-update"htmlFor="input-file">Update image</label>
                          <input onChange={changeAvatar} id="input-file" className="d-none"type="file" accept='image/jpeg, image/jpg, image/png'/>
                          {/* <input className="form-control form-control " type="file" accept='/image/jpeg, image/jpg, image/png' onChange={(e)=>{
                            const file = e.target.files[0];
                            console.log(file)
                            if(file && file.type.substring(0,5) === "image"){
                              setImage(file);
                            }else{
                              setImage(null);
                            }
                            console.log(image)
                          }}name="avatar-file"/> */}
                        </div> 
                    </div>
                    <div className="row" style={{maxHeight: "100px"}}>
                        <div className="col-sm-12 col-md-6" style={{maxHeight: "100px"}}>
                            <div className="form-group mb-3">
                            <label className="form-label">E-mail </label>
                            <input className="form-control" defaultValue={user.email} type="text" name="email" onChange={handleInputChange}/>
                          </div>
                        </div>
                    </div>
                    <div className="row" style={{maxHeight: "100px"}}>
                        <div className="col-sm-12 col-md-6" style={{maxHeight: "100px"}}>
                            <div className="form-group mb-3"><label className="form-label">Nickname </label>
                            <input className="form-control" defaultValue={user.nickname} type="text" name="nickname" onChange={handleNickname}/></div>
                        </div>
                    </div>

                    <div id="button-save-cancel-responsive"className="row" style={{maxHeight: "100px"}}>
                        <div className="col-md-12">
                        <button id="save-btn-id-user"className="btn btn-primary form-btn" onClick={updateAdminInfo}>SAVE </button>
                        <button className="btn btn-danger form-btn" onClick={reloadPage}>CANCEL </button></div>
                    </div>
                </div>
            </div>
        </form>
    </div>
    <ToastContainer>

        </ToastContainer>
    </>
  )
}

export default UserSettings