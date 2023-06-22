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
import { getTeams, getTasks, deleteTask, usersInTeam, updateTask, getGroups, deleteGroup, updateGroup } from '../utils/APIRoutes';
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

let checkStatus = ['Delayed', 'Pending', 'Done']

let globalGroupFound;

let taskId = "";

let groupObj = {
  "name": "",
  "description": "",
  "teamId": teamId,
  "Users": [],
  "teamAdmin": ""
}

function AllUsers() {

  const [toggleOneModal, setToggleOneModal] = useState(false);
  const [toggleTwoModal, setToggleTwoModal] = useState(false);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  }

  const removeGroup = async (e, teamId) => {
    let confirmAction = window.confirm("Are you sure you want to delete this Task?");

    if (confirmAction) {
      const { data } = await axios.put(deleteGroup,
        { teamId }
      );

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      } else {
        window.location.reload(false);
      }
    }
  }

  const initialState = (values) => {
    groupObj.name = values.newGroupObj.name
    groupObj.description = values.newGroupObj.description
    groupObj.Users = []
    groupObj.teamAdmin = values.newGroupObj.teamAdmin

    document.querySelector('#edit-check-id').innerHTML = ""

    values.newGroupObj.Users.forEach(user => {
      groupObj.Users.push(user)

      document.querySelector('#edit-check-id').innerHTML += `
            <div class="form-check">
            <input class="form-check-input" checked style="box-shadow: none;" type="checkbox" value="${user}" id="${user}">
            <label id="checkbox-existing-user-id" checked class="form-check-label" for="${user}">
                ${user}
            </label>
            </div>
            `;

      let checkBoxes = document.querySelectorAll('#checkbox-existing-user-id');

      checkBoxes.forEach(chBox => {
        chBox.previousElementSibling.addEventListener('change', () => {

          if (chBox.previousElementSibling.checked) {
            groupObj.Users.push(chBox.getAttribute('for'))
          } else {
            const index = groupObj.Users.indexOf(chBox.getAttribute('for'))
            const x = groupObj.Users.splice(index, 1)
          }
        })
      })
    })
  }

  const truncate = (string, limit) => {

    if (string.length <= limit) {
      return string
    }

    return string.slice(0, limit) + "...."
  }

  const handleChange = (event) => {
    groupObj.name = event.target.value;
  }

  const descriptionChange = (event) => {
    groupObj.description = event.target.value;
  }

  const changeUserAdmin = (event) => {
    groupObj.teamAdmin = event.target.value;
  }


  const checkTask = async () => {
    if (groupObj.name === "") {
      toast.error("Please enter your tasks name.", toastOptions);
      return false;
    } else if (groupObj.description === "") {
      toast.error("Please describe info about this group.", toastOptions);
      return false;
    } else if (groupObj.Users.length <= 1) {
      toast.error("Please select at least two users to this group.", toastOptions);
      return false;
    }

    setToggleOneModal(!toggleOneModal);

    const { data } = await axios.put(updateGroup, {
      taskId,
      groupObj
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

      let groups = await axios.put(getGroups, { teamId });

      let usersTable = document.getElementById('table-users-id').querySelector('tbody');

      usersTable.innerHTML = "";

      groups.data.forEach(async (group) => {
        document.querySelector('#table-users-id').removeAttribute('style')
        let desc = truncate(group.newGroupObj.description, 30)
        usersTable.innerHTML += `
        <tr>
            <td>${group.newGroupObj.name}</td>
            <td>${desc}</td>
            <td>${group.newGroupObj.teamAdmin ? group.newGroupObj.teamAdmin : "Group admin not selected yet."}</td>
            <td>
              <div class="dropdown" id="${group._id}">
                <button id="dropdown-id-button" class="btn dropdown-toggle" variant="outline"  type="button" data-toggle="dropdown" aria-expanded="false" style="box-shadow: none">
                <img src="${Dots}" style="height: 20px;"></i>
                </button>
                <ul class="dropdown-menu">
                  ${group.newGroupObj.status == 0 || group.newGroupObj.status == 2 ? `` : `<li><button id="edit-task-id" data-atr="${group.newGroupObj.userEmail}"class="dropdown-item" type="button" style="box-shadow: none">Edit group</button></li>`}
                  <li><button id="remove-task-id" class="dropdown-item" type="button" style="box-shadow: none">Delete group</button></li>
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
          removeGroup(e, btn.parentElement.parentElement.parentElement.getAttribute('id'));
        })
      });

      editTasksBtns.forEach(btn => {
        btn.addEventListener('click', async (e) => {
          taskId = btn.parentElement.parentElement.parentElement.getAttribute('id')
          let groups = await axios.put(getGroups, { teamId });
          let users = (await axios.put(usersInTeam, { teamId })).data.Users;

          let foundGroup = groups.data.find(x => x._id === btn.parentElement.parentElement.parentElement.getAttribute('id'))
          globalGroupFound = foundGroup

          initialState(foundGroup)

          setToggleOneModal(!toggleOneModal)
          document.querySelector('#users-check-id').innerHTML = ""

          users.forEach(user => {

            if (user.email !== foundGroup.newGroupObj.Users.find(x => x == user.email)) {
              document.querySelector('#users-check-id').innerHTML += `
                    <div class="form-check">
                    <input class="form-check-input" style="box-shadow: none;" type="checkbox" value="${user.email}" id="${user.email}">
                    <label id="checkbox-user-id" class="form-check-label" for="${user.email}">
                        ${user.email}
                    </label>
                    </div>
                    `;

              let checkBoxes = document.querySelectorAll('#checkbox-user-id');

              checkBoxes.forEach(chBox => {
                chBox.previousElementSibling.addEventListener('change', () => {

                  if (chBox.previousElementSibling.checked) {
                    groupObj.Users.push(chBox.getAttribute('for'))
                  } else {
                    const index = groupObj.Users.indexOf(chBox.getAttribute('for'))
                    const x = groupObj.Users.splice(index, 1)
                  }
                })
              })
            }

            document.querySelector('#user-admin-selection-id').innerHTML = "<option></option>"

            users.forEach(user => {
              let foundUser = user.email == foundGroup.newGroupObj.teamAdmin
              document.querySelector('#user-admin-selection-id').innerHTML += `<option value="${user.email}" ${foundUser == true ? "selected" : ""} id=${user.email}>${user.email}</option>`
            })
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
              <th scope="col">Group Name</th>
              <th scope="col">Description</th>
              <th scope="col">Group admin</th>
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
              <MDBModalTitle>New group</MDBModalTitle>
              <button style={{ boxShadow: "none" }} className='btn-close'
                color='none'
                onClick={() => { initialState(globalGroupFound); setToggleOneModal(!toggleOneModal) }}></button>
            </MDBModalHeader>
            <MDBModalBody>
              <div className="row">
                <p>Please enter new group name and info.</p>
                <div className="form-group">
                  <label style={{ color: "#28282" }}>Name:</label>
                  <input type="text" className="form-control" id="task-name" defaultValue={groupObj.name} onChange={handleChange} style={{ boxShadow: "none" }}></input>
                </div>
                <div className="form-group mt-3 mb-3">
                  <label>Info:</label>
                  <textarea className="form-control" rows="3" id="task-description" defaultValue={groupObj.description} onChange={descriptionChange} style={{ boxShadow: "none" }}></textarea>
                </div>
                <div>
                  <p>Users in this group: </p>
                  <div id="edit-check-id">
                  </div>
                  <p>Team admin of this group: </p>
                  <select onChange={changeUserAdmin} id="user-admin-selection-id" className="form-select" aria-label="Default select example">
                    <option>qwe</option>
                  </select>
                  <hr></hr>
                  <p>Please select Users to add to this group: </p>
                  <div id="users-check-id">
                  </div>
                </div>
              </div>
            </MDBModalBody>
            <MDBModalFooter>
              <button className='btn btn-primary' style={{ boxShadow: "none" }} onClick={() => {
                checkTask();
              }}>
                Update
              </button>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      <ToastContainer>
      </ToastContainer>

    </>

  )
}

export default AllUsers