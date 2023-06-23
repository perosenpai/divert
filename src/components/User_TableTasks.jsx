import React, { useState, useEffect } from 'react';
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
import { getTeams, getTasks, deleteGroupTask, usersInTeam, updateGroupTask, getGroups, getGropTasks } from '../utils/APIRoutes';
import avatarLogo from '../assets/img/avatar-logo.png';
import ClipLoader from "react-spinners/ClipLoader";
import { hideLoader } from '../App.js'
import Avatar from '../assets/img/avatar.png';
import avatarLogoBlack from '../assets/img/avatar-logo-black.png';
import Dots from '../assets/img/icons8-dots-30.png';
import { ToastContainer, toast } from 'react-toastify';
import { Form } from 'react-bootstrap';

const url = window.location.search;
const urlParams = new URLSearchParams(url);
let teamId = urlParams.get("teamId")
let groupId = urlParams.get('groupId')
let groupName = urlParams.get('groupName')

let checkStatus = ['Delayed', 'Pending', 'Done']

let groupTaskId = "";

let groupTask = {
  "name": "",
  "description": "",
  "teamId": teamId,
  "groupId": groupId,
  "groupName": groupName,
  "userEmail": "",
  "dueDate": "",
  "startDate": "",
  "status": ""
}

function User_TableTasks() {

  const [toggleOneModal, setToggleOneModal] = useState(false);
  const [toggleTwoModal, setToggleTwoModal] = useState(false);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  }

  const removeTask = async (e, teamId) => {
    let confirmAction = window.confirm("Are you sure you want to delete this Task?");

    if (confirmAction) {
      const { data } = await axios.put(deleteGroupTask,
        { teamId }
      );

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      } else {
        window.location.reload(false);
      }
    }
  }

  const truncate = (string, limit) => {

    if (string.length <= limit) {
      return string
    }

    return string.slice(0, limit) + "...."
  }

  const handleChange = (event) => {
    groupTask.name = event.target.value;
  }

  const descriptionChange = (event) => {
    groupTask.description = event.target.value;
  }

  const dateChange = (event) => {
    groupTask.dueDate = event.target.value;
  }

  const changeOption = (event) => {
    groupTask.userEmail = event.target.value;
  }

  const checkTask = () => {

    var today = new Date();
    var todaysDate = today.toISOString().split('T')[0]


    if (groupTask.name === "") {
      toast.error("Please enter your tasks name.", toastOptions);
      return false;
    } else if (groupTask.description === "") {
      toast.error("Please describe your task.", toastOptions);
      return false;
    } else if (groupTask.dueDate === "") {
      toast.error("Please select due date.", toastOptions);
      return false;
    } else if (todaysDate > groupTask.dueDate) {
      toast.error("Please select valid date and not a date that has already passed.", toastOptions);
      return false;
    }

    setToggleOneModal(!toggleOneModal);
    setTimeout(() => {
      setToggleTwoModal(!toggleTwoModal);
    }, 400);
  }

  const checkTask2 = async () => {

    if (groupTask.userEmail === "") {
      toast.error("Please assign one User to this Task.", toastOptions);
      return false;
    }

    setToggleTwoModal(!toggleTwoModal)

    const { data } = await axios.put(updateGroupTask, {
      groupTaskId,
      groupTask
    });

    if (data.status === false) {
      toast.error(data.msg, toastOptions);
    }

    if (data) {
      await new Promise((r) => setTimeout(r, 1000));
      window.location.reload(false);
    }
  }

  useEffect(() => {
    const loadData = async () => {

      let groupTasks = await axios.put(getGropTasks, {groupId});

      let usersTable = document.getElementById('table-users-id').querySelector('tbody');

      usersTable.innerHTML = "";

      groupTasks.data.forEach(async (task) => {
        document.querySelector('#table-users-id').removeAttribute('style')
        let desc = truncate(task.groupTask.description, 30)
        usersTable.innerHTML += `
        <tr>
            <td>${task.groupTask.name}</td>
            <td>${desc}</td>
            <td>${task.groupTask.userEmail}</td>
            <td>${task.groupTask.dueDate}</td>
            <td>${checkStatus[task.groupTask.status]}</td>
            <td>
              <div class="dropdown" id="${task._id}">
                <button id="dropdown-id-button" class="btn dropdown-toggle" variant="outline"  type="button" data-toggle="dropdown" aria-expanded="false" style="box-shadow: none">
                <img src="${Dots}" style="height: 20px;"></i>
                </button>
                <ul class="dropdown-menu">
                  ${task.groupTask.status == 0 || task.groupTask.status == 2 ? `` : `<li><button id="edit-task-id" data-atr="${task.groupTask.userEmail}"class="dropdown-item" type="button" style="box-shadow: none">Edit task</button></li>`}
                  <li><button id="remove-task-id" class="dropdown-item" type="button" style="box-shadow: none">Remove task</button></li>
                </ul>
              </div
            </td>
        </tr>`;

        return usersTable;
      });

      let removeTasksBtns = document.querySelectorAll('#remove-task-id');
      let editTasksBtns = document.querySelectorAll('#edit-task-id');


      removeTasksBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          removeTask(e, btn.parentElement.parentElement.parentElement.getAttribute('id'));
        })
      });

      editTasksBtns.forEach(btn => {
        btn.addEventListener('click', async (e) => {
          groupTaskId = btn.parentElement.parentElement.parentElement.getAttribute('id')
          let groupTasks = await axios.put(getGropTasks, {groupId});
          let foundTask = groupTasks.data.find(x => x._id === btn.parentElement.parentElement.parentElement.getAttribute('id'))

          groupTask.name = foundTask.groupTask.name;
          groupTask.description = foundTask.groupTask.description;
          groupTask.teamId = foundTask.groupTask.teamId;
          groupTask.userEmail = foundTask.groupTask.userEmail;
          groupTask.dueDate = foundTask.groupTask.dueDate;
          groupTask.startDate = foundTask.groupTask.startDate;
          groupTask.status = foundTask.groupTask.status

          setToggleOneModal(!toggleOneModal)

          let groups = await axios.put(getGroups, { teamId })
          let foundGroup = groups.data.find(group => group._id == groupId)

          document.querySelector('#select-id-edit').innerHTML = "<option></option>"

          foundGroup.newGroupObj.Users.forEach(user => {
            let foundUser = user == foundTask.groupTask.userEmail
            document.querySelector('#select-id-edit').innerHTML += `<option value="${user}" ${foundUser == true ? "selected" : ""} id=${user}>${user}</option>`
          })
        })
      });

      hideLoader();
    };

    loadData();
  }, [])


  return (
    <>
      <div className="table-responsive" style={{ paddingBottom: "100px" }}>
        <table id="table-users-id" className="table custom-table" style={{ display: "none" }}>
          <thead>
            <tr>
              <th scope="col">Task Name</th>
              <th scope="col">Description</th>
              <th scope="col">User/Group</th>
              <th scope="col">Due Date</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>
      <MDBModal id="first-modal-id" show={toggleOneModal} setShow={setToggleOneModal} tabIndex='-1'>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>New task</MDBModalTitle>
              <button style={{ boxShadow: "none" }} className='btn-close'
                color='none'
                onClick={() => { setToggleOneModal(!toggleOneModal) }}></button>
            </MDBModalHeader>
            <MDBModalBody>
              <div className="row">
                <p>Please enter your task name and description.</p>
                <div className="form-group">
                  <label style={{ color: "#28282" }}>Name:</label>
                  <input type="text" className="form-control" id="task-name" defaultValue={groupTask.name} onChange={handleChange} style={{ boxShadow: "none" }}></input>
                </div>
                <div className="form-group mt-3 mb-3">
                  <label>Description:</label>
                  <textarea className="form-control" rows="3" id="task-description" defaultValue={groupTask.description} onChange={descriptionChange} style={{ boxShadow: "none" }}></textarea>
                </div>
                <div>
                  <div className="col-md-5">
                    <Form.Group>
                      <Form.Label>Due Date:</Form.Label>
                      <Form.Control style={{ boxShadow: "none" }} onChange={dateChange} defaultValue={groupTask.dueDate} id="task-date" type="date" name="dob" placeholder="Due Date" />
                    </Form.Group>
                  </div>
                </div>
              </div>
            </MDBModalBody>
            <MDBModalFooter>
              <button className='btn btn-primary' style={{ boxShadow: "none" }} onClick={() => {
                checkTask();
              }}>
                Next
              </button>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      {/* second modal */}
      <MDBModal show={toggleTwoModal} setShow={setToggleTwoModal} tabIndex='-1'>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Select User or Group</MDBModalTitle>
              <button style={{ boxShadow: "none" }} className='btn-close'
                color='none'
                onClick={() => {
                  setToggleTwoModal(!toggleTwoModal)
                }}>

              </button>
            </MDBModalHeader>
            <MDBModalBody>
              <p>Please select one User or Group to assign this task. </p>
              <select id="select-id-edit" style={{ boxShadow: "none" }} name="users-emails" onChange={changeOption} className="form-select" aria-label="Default select example">
                <option defaultValue="1">One</option>
                <option defaultValue="2">Two</option>
                <option defaultValue="3">Three</option>
              </select>
            </MDBModalBody>
            <MDBModalFooter>
              <button className='btn' style={{ boxShadow: "none" }} onClick={() => {

                setToggleTwoModal(!toggleTwoModal);
                setTimeout(() => {
                  setToggleOneModal(!toggleOneModal);
                }, 400);
              }}>
                Back
              </button>
              <button style={{ boxShadow: "none" }} className='btn btn-primary'
                onClick={async () => {
                  await checkTask2();
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

export default User_TableTasks