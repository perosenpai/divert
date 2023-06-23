import React, {useState, useEffect} from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';
import '../assets/css/tableCss.css'
import axios from 'axios';
import {getTeams, getTasks, deleteTask, usersInTeam, updateTask, getGroups, deleteGroup, updateGroup} from '../utils/APIRoutes';
import avatarLogo from '../assets/img/avatar-logo.png';
import ClipLoader from "react-spinners/ClipLoader";
import {hideLoader} from '../App.js'
import Avatar from '../assets/img/avatar.png';
import avatarLogoBlack from '../assets/img/avatar-logo-black.png';
import Dots from '../assets/img/icons8-dots-30.png';
import {ToastContainer, toast} from 'react-toastify';
import { Form } from 'react-bootstrap';

const url = window.location.search;
const urlParams = new URLSearchParams(url);
let teamId = urlParams.get("teamId")

let user = localStorage.getItem("divert-user");

let checkStatus = ['Delayed', 'Pending', 'Done']

let globalGroupFound; 

let taskId = "";

let groupObj = {
  "name": "",
  "description": "",
  "teamId": teamId,
  "Users": []
}

function User_Groups() {

  const [toggleOneModal, setToggleOneModal] = useState(false);
  const [toggleTwoModal, setToggleTwoModal] = useState(false);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
}

  const removeGroup = async (e, teamId) =>{
    let confirmAction = window.confirm("Are you sure you want to delete this Task?");

    if (confirmAction) {
      const {data} = await axios.put(deleteGroup, 
        {teamId}
      );
      
      if(data.status === false){
        toast.error(data.msg, toastOptions);
      }else{
        window.location.reload(false);
      }
    }
  }

  const initialState = (values) =>{
    groupObj.name = values.newGroupObj.name
    groupObj.description = values.newGroupObj.description
    groupObj.Users = []

    document.querySelector('#edit-check-id').innerHTML =""

    values.newGroupObj.Users.forEach(user =>{
        groupObj.Users.push(user)

        document.querySelector('#edit-check-id').innerHTML += `
        <label id="checkbox-existing-user-id" onclick="return false;" checked for="${user}">
        ${user}
        </label><br>
            `;
    })
  }

  const truncate = (string, limit) =>{

    if(string.length <= limit){
      return string
    }

    return string.slice(0, limit) + "...."
  }

  const handleChange = (event) =>{
    groupObj.name = event.target.value;
  }

  const descriptionChange = (event) =>{
    groupObj.description = event.target.value;
  }


  const checkTask = async () =>{
    if(groupObj.name === ""){
        toast.error("Please enter your tasks name.", toastOptions);
        return false;
      }else if(groupObj.description === ""){
        toast.error("Please describe info about this group.", toastOptions);
        return false;
      }else if(groupObj.Users.length <= 1){
        toast.error("Please select at least two users to this group.", toastOptions);
        return false;
      }

    setToggleOneModal(!toggleOneModal);
    
    const {data} = await axios.put(updateGroup, {
        taskId,
        groupObj
      });
  
      if(data.status === false){
        toast.error(data.msg, toastOptions);
      }      
      
      if(data){
        await new Promise((r) => setTimeout(r, 1000));
        window.location.reload(false);
      }
  }


  useEffect(() => {
    const loadData = async () => {

      let groups = await axios.put(getGroups, {teamId});

      let usersTable = document.getElementById('table-users-id').querySelector('tbody');

      usersTable.innerHTML = "";

      groups.data.forEach(async(group) =>{
        let current = JSON.parse(user)
        document.querySelector('#table-users-id').removeAttribute('style')
        let desc = truncate(group.newGroupObj.description, 30)
        usersTable.innerHTML += `
        <tr>
            <td>${group.newGroupObj.name}</td>
            <td>${desc}</td>
            <td>${group.newGroupObj.teamAdmin}</td>
            ${group.newGroupObj.teamAdmin == current.email? `<td><button class="btn btn-primary"><a href="/user-groups-admin?teamId=${teamId}">Go to group</a></button></td>` : ``}
            <td>
              <div class="dropdown" id="${group._id}">
                <button id="dropdown-id-button" class="btn dropdown-toggle" variant="outline"  type="button" data-toggle="dropdown" aria-expanded="false" style="box-shadow: none">
                <img src="${Dots}" style="height: 20px;"></i>
                </button>
                <ul class="dropdown-menu">
                  ${group.newGroupObj.status == 0 || group.newGroupObj.status == 2 ? `` : `<li><button id="edit-task-id" data-atr="${group.newGroupObj.userEmail}"class="dropdown-item" type="button" style="box-shadow: none">See group</button></li>`}
                </ul>
              </div
            </td>
        </tr>`;

        return usersTable;
        });

        let removeTasksBtns = document.querySelectorAll('#remove-task-id');
        let editTasksBtns = document.querySelectorAll('#edit-task-id');


        removeTasksBtns.forEach(btn =>{
          btn.addEventListener('click', (e) =>{
            removeGroup(e, btn.parentElement.parentElement.parentElement.getAttribute('id'));
          })
        });

        editTasksBtns.forEach(btn =>{
          btn.addEventListener('click', async (e) =>{
            taskId = btn.parentElement.parentElement.parentElement.getAttribute('id')
            let groups = await axios.put(getGroups, {teamId});
            let users = (await axios.put(usersInTeam, {teamId})).data.Users;

            let foundGroup = groups.data.find(x => x._id === btn.parentElement.parentElement.parentElement.getAttribute('id'))
            globalGroupFound = foundGroup

            initialState(foundGroup)
            
            setToggleOneModal(!toggleOneModal)
          })
        });
      
          hideLoader();
        };

    loadData();
  }, [])


  return (
    <>
    <div className="table-responsive" style={{paddingBottom: "100px"}}>
        <table id="table-users-id" className="table custom-table" style={{display: "none"}}>
          <thead>
            <tr>
              <th scope="col">Group Name</th>
              <th scope="col">Description</th>
              <th scope="col">Group admin</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>
      <MDBModal id="first-modal-id"show={toggleOneModal} setShow={setToggleOneModal} tabIndex='-1'>
      <MDBModalDialog centered>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>See group details</MDBModalTitle>
            <button style={{boxShadow: "none" }} className='btn-close'
              color='none'
              onClick={() => {initialState(globalGroupFound);setToggleOneModal(!toggleOneModal)}}></button>
          </MDBModalHeader>
          <MDBModalBody>
          <div className="row">
            <div className="form-group">
              <label style={{color: "#28282"}}>Name:</label>
              <input type="text" className="form-control" id="task-name" defaultValue={groupObj.name} onChange={handleChange} readOnly={true} style={{boxShadow: "none" }}></input>
            </div>
            <div className="form-group mt-3 mb-3">
              <label>Info:</label>
              <textarea className="form-control" rows="3" id="task-description" defaultValue={groupObj.description} onChange={descriptionChange} readOnly={true} style={{boxShadow: "none" }}></textarea>
            </div>
            <div>
            <p>Users in this group. </p>
            <div id="edit-check-id">
            </div>
            </div>
            </div>
          </MDBModalBody>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
    <ToastContainer>
    </ToastContainer>

    </>

  )
}

export default User_Groups