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
import {getTeams, getTasks, deleteTask, usersInTeam, updateTask, updateCompleteTaskByUser, getDashboard} from '../utils/APIRoutes';
import {hideLoader} from '../App.js'
import avatarLogoBlack from '../assets/img/avatar-logo-black.png';
import Dots from '../assets/img/icons8-dots-30.png';
import {ToastContainer, toast} from 'react-toastify';
import { Form } from 'react-bootstrap';

const url = window.location.search;
const urlParams = new URLSearchParams(url);
let teamId = urlParams.get("teamId")
let userEmail = "";

let user = localStorage.getItem("divert-user");
user = JSON.parse(user);

let taskId = "";
let checkStatus = ['Delayed', 'Pending', 'Done']
const icons = ['\uf00d','\uf110','\uf00c']
let userCompletedTasks = 0;

let task = {
  "name": "",
  "description": "",
  "teamId": teamId,
  "userEmail": "",
  "dueDate": "",
  "startDate": "",
  "status": ""
}

function User_Tasks() {

  const [toggleOneModal, setToggleOneModal] = useState(false);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
}

const truncate = (string, limit) =>{

  if(string.length <= limit){
    return string
  }

  return string.slice(0, limit) + "...."
}

const updateTaskFunciton = async () =>{
  userCompletedTasks = userCompletedTasks + 1;
  const updateComplete = await axios.post(updateCompleteTaskByUser, {
    teamId,
    userEmail,
    userCompletedTasks
  })
}

const finishTask = async (num) =>{
  task.status = num

  const {data} = await axios.put(updateTask, {
    taskId,
    task
  });

  if(data.status === false){
    toast.error(data.msg, toastOptions);
  }      
  
  // if(data){
  //   await new Promise((r) => setTimeout(r, 1000));
  //   window.location.reload(false);
  // }
}


  useEffect(() => {
    const loadData = async () => {
      const items = JSON.parse(localStorage.getItem('divert-user'));

      userEmail = items.email

      let tasks = await axios.put(getTasks, {teamId});
      let dashboard = await axios.post(getDashboard, { teamId })

      let myCompletedTasks = dashboard.data.Users.find(user => user.email == items.email)

      userCompletedTasks = myCompletedTasks.completedTasks

      let usersTable = document.getElementById('table-users-id').querySelector('tbody');

      usersTable.innerHTML = "";

      tasks.data.forEach(async(task) =>{

        if(task.task.userEmail == user.email){
          let desc = truncate(task.task.description, 30)
          usersTable.innerHTML += `
          <tr>
              <td>${task.task.name}</td>
              <td>${desc}</td>
              <td>${task.task.userEmail}</td>
              <td>${task.task.dueDate}</td>
              <td>${checkStatus[task.task.status]}</td>
              ${task.task.status == 0 || task.task.status == 2 ? `
                <td>
                <svg style="width: 20px; "xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
                <td>
              ` 
              : `
              <td>
                <div class="dropdown" id="${task._id}">
                  <button id="dropdown-id-button" class="btn dropdown-toggle" variant="outline"  type="button" style="box-shadow: none">
                  <img src="${Dots}" style="height: 20px;"></i>
                  </button>
                </div
              </td>
              `}
          </tr>`;
        }
        

        return usersTable;
          });

        let confirmTask = document.querySelectorAll('#dropdown-id-button');


        confirmTask.forEach(btn =>{
          btn.addEventListener('click', async (e) =>{
            taskId = btn.parentElement.getAttribute('id')
            let tasks = await axios.put(getTasks, {teamId});
            let foundTask = tasks.data.find(x => x._id === btn.parentElement.getAttribute('id'))

            task.name =  foundTask.task.name;
            task.description =  foundTask.task.description;
            task.teamId = foundTask.task.teamId;
            task.userEmail = foundTask.task.userEmail;
            task.dueDate = foundTask.task.dueDate;
            task.startDate = foundTask.task.startDate;
            task.status = foundTask.task.status

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
        <table id="table-users-id" className="table custom-table">
          <thead>
            <tr>
              <th scope="col">Task Name</th>
              <th scope="col">Description</th>
              <th scope="col">User</th>
              <th scope="col">Due Date</th>
              <th scope="col">Status</th>
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
            <MDBModalTitle>Assigned Task</MDBModalTitle>
            <button style={{boxShadow: "none" }} className='btn-close'
              color='none'
              onClick={() => {setToggleOneModal(!toggleOneModal)}}></button>
          </MDBModalHeader>
          <MDBModalBody>
          <div className="row">
            <p>Please state your work on this task.</p>
            <div className="form-group mb-3">
              <p style={{marginBottom: "0"}}>Task name:</p>
              <input id="input-name" className="form-control" type="text" name="firstname" readOnly={true} defaultValue={task.name} style={{backgroundColor: "rgb(251, 251, 251)", boxShadow: "none"}}></input>
            </div>
            <div className="form-group mb-3">
              <p style={{marginBottom: "0"}}>Task description:</p>
              <textarea id="input-name" className="form-control" type="text" name="firstname" readOnly={true} defaultValue={task.description} style={{backgroundColor: "rgb(251, 251, 251)", boxShadow: "none"}}></textarea>
            </div>
            <div className="form-group mb-3">
              <p style={{marginBottom: "0"}}>Task assigned to user:</p>
              <input id="input-name" className="form-control" type="text" name="firstname" readOnly={true} defaultValue={task.userEmail} style={{backgroundColor: "rgb(251, 251, 251)", boxShadow: "none"}}></input>
            </div>
            <div className="form-group mb-3">
              <p style={{marginBottom: "0"}}>Start date:</p>
              <input id="input-name" className="form-control" type="text" name="firstname" readOnly={true} defaultValue={task.startDate} style={{backgroundColor: "rgb(251, 251, 251)", boxShadow: "none"}}></input>
            </div>
            <div className="form-group mb-3">
              <p style={{marginBottom: "0"}}>Due date:</p>
              <input id="input-name" className="form-control" type="text" name="firstname" readOnly={true} defaultValue={task.dueDate} style={{backgroundColor: "rgb(251, 251, 251)", boxShadow: "none"}}></input>
            </div>
            </div>
          </MDBModalBody>
          <MDBModalFooter>
            <button className='btn btn-primary' style={{boxShadow: "none" }} onClick={() => {
                finishTask(0);
              }}>
                Delay
            </button>
            <button className='btn btn-success' style={{boxShadow: "none" }} onClick={() => {
                finishTask(2);
                updateTaskFunciton();
              }}>
                Finish
            </button>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
    </>

  )
}

export default User_Tasks