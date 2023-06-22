import React, {useState, useEffect} from 'react'
import '../assets/css/tableCss.css'
import axios from 'axios';
import {getTeams, removeUserApi} from '../utils/APIRoutes';
import avatarLogo from '../assets/img/avatar-logo-black.png';
import trashIcon from '../assets/img/icons8-trash-128.png';
import ClipLoader from "react-spinners/ClipLoader";
import {hideLoader} from '../App.js'
import {ToastContainer, toast} from 'react-toastify'; 
import {showElement} from '../helpers'
import { FaLayerGroup, FaEllipsisV, FaComment, FaComments } from "react-icons/fa";
import Avatar from '../assets/img/avatar.png';
import Dots from '../assets/img/icons8-dots-30.png';

const url = window.location.search;
const urlParams = new URLSearchParams(url);
let teamId = urlParams.get("teamId")

function EditUserRoles() {

  const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
  }

  const getCurrentTeam = async () =>{
    let allTeams = await axios.get(getTeams);
  
    let current = "";
  
    allTeams.data.some(currentTeam => {
      if(currentTeam._id === teamId){
        current = currentTeam
      }
    })
    return current
  }

  // const changeUserRole= async (e)=>{
  //   let confirmAction = window.confirm("Are you sure you want to change this Users role?");
  //   if (confirmAction) {
  //     console.log('Will update in near future.')
  //   }
  // }

  const removeUser= async (e, email)=>{
    let confirmAction = window.confirm("Are you sure you want to remove this User?");
    if (confirmAction) {
      const {data} = await axios.put(removeUserApi, 
        {email , teamId}
      );
      
      if(data.status === false){
        toast.error(data.msg, toastOptions);
      }else{
        window.location.reload(false);
      }
    }
  }

  

  useEffect(() => {
    const loadData = async () => {
      let current = await getCurrentTeam();

      let usersTable = document.getElementById('table-users-id').querySelector('tbody');

      usersTable.innerHTML = "";

      if(current.Users.length == 0){
        document.querySelector('.table-responsive').innerHTML = `<p>No current users in this team.</p>`
      }

      current.Users.forEach(async(user) =>{
        document.getElementById('table-users-id').removeAttribute('style')

        usersTable.innerHTML += `
        <tr>
            <td>
            <img
                class="rounded-circle img-fluid"
                src=${user.avatar ? user.avatar : avatarLogo}
                width=${48}
                height=${48}
                style="object-fit: cover; height: 48px;"
            />
            </td>
            <td>${user.email}<small class="d-block">Current e-mail address of the user</small></td>
            <td>
              <div class="dropdown" id="${user.email}">
                <button id="dropdown-id-button" class="btn dropdown-toggle" variant="outline"  type="button" data-toggle="dropdown" aria-expanded="false" style="box-shadow: none">
                <img src="${Dots}" style="height: 20px;"></i>
                </button>
                <ul class="dropdown-menu">
                  <li><button id="remove-user-id" class="dropdown-item" type="button" style="box-shadow: none">Remove User</button></li>
                </ul>
              </div
            </td>
          </tr>`;

        return usersTable;
        });


        let changeRoleBtns = document.querySelectorAll('#change-user-role-id');
        let removeUserBtn = document.querySelectorAll('#remove-user-id');


       

        removeUserBtn.forEach(btn =>{
          btn.addEventListener('click', (e) =>{
            removeUser(e, btn.parentElement.parentElement.parentElement.getAttribute('id'));
          })
        });

          hideLoader();
        };

    loadData();

    
  }, [])

  return (
    <div className="table-responsive" style={{height: "100vh"}}>

        <table id="table-users-id" className="table custom-table" style={{display: "none"}}>
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">E-mail</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>

  )
}

export default EditUserRoles