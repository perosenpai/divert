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
import { Form } from 'react-bootstrap';
import {FaPlus} from "react-icons/fa";
import { event } from 'jquery';
import {usersInTeam, newTask, newGroup} from '../utils/APIRoutes'
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify'; 
import "react-toastify/dist/ReactToastify.css";

const url = window.location.search;
const urlParams = new URLSearchParams(url);
let teamId = urlParams.get("teamId")

let newGroupObj = {
  "name": "",
  "description": "",
  "teamId": teamId,
  "Users": []
}

function Groups() {  

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  }

  const [toggleOneModal, setToggleOneModal] = useState(false);
  const [toggleTwoModal, setToggleTwoModal] = useState(false);

  const initialState = () =>{
    newGroupObj.name = ""
    newGroupObj.description = ""
    newGroupObj.teamId = teamId
    newGroupObj.Users = []

    document.querySelector('#task-name').value = ""
    document.querySelector('#task-description').value = ""
    document.querySelector('#task-date').value = ""
  }

  const handleChange = (event) =>{
    newGroupObj.name = event.target.value;
  }

  const descriptionChange = (event) =>{
    newGroupObj.description = event.target.value;
  }

  const addUser = (event) =>{
    console.log(event)
  }

  const checkTask = async () =>{

    if(newGroupObj.name === ""){
      toast.error("Please enter your tasks name.", toastOptions);
      return false;
    }else if(newGroupObj.description === ""){
      toast.error("Please describe info about this group.", toastOptions);
      return false;
    }else if(newGroupObj.Users.length <= 1){
      toast.error("Please select at least two users to this group.", toastOptions);
      return false;
    }

    setToggleOneModal(!toggleOneModal);

    const {data} = await axios.post(newGroup, {
      newGroupObj
    });
    
    if(data.status === false){
      toast.error(data.msg, toastOptions);
    }      
      
    if(data.status === true){
      window.location.reload(false);
    } 
  }

  useEffect(() => {
    const loadData = async () => {
      let users = (await axios.put(usersInTeam, {teamId})).data.Users;

      users.forEach(user =>{
        document.querySelector('#form-check-id').innerHTML += `
        <div class="form-check">
          <input class="form-check-input" style="box-shadow: none;" type="checkbox" value="${user.email}" id="${user.email}">
          <label id="checkbox-user-id" class="form-check-label" for="${user.email}">
            ${user.email}
          </label>
        </div>
        `;

        let checkBoxes = document.querySelectorAll('#checkbox-user-id');

        checkBoxes.forEach(chBox =>{
          chBox.previousElementSibling.addEventListener('change', () =>{

            if(chBox.previousElementSibling.checked){
              newGroupObj.Users.push(chBox.getAttribute('for'))
            }else{
              const index = newGroupObj.Users.indexOf(chBox.getAttribute('for'))
              const x = newGroupObj.Users.splice(index, 1)
            }
          })
        })

      })
    };

    loadData();
  }, [])

  return (
    <>
    <button onClick={() => setToggleOneModal(!toggleOneModal)} className='btn' style={{boxShadow: "none", paddingTop:"40px", paddingBottom: "40px" }}><FaPlus style={{paddingBottom: "4px"}}></FaPlus> New Group</button>

    {/* modals */}
    <MDBModal id="first-modal-id"show={toggleOneModal} setShow={setToggleOneModal} tabIndex='-1'>
      <MDBModalDialog centered>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>New group</MDBModalTitle>
            <button style={{boxShadow: "none" }} className='btn-close'
              color='none'
              onClick={() => {initialState();setToggleOneModal(!toggleOneModal)}}></button>
          </MDBModalHeader>
          <MDBModalBody>
          <div className="row">
            <p>Please enter new group name and info.</p>
            <div className="form-group">
              <label style={{color: "#28282"}}>Name:</label>
              <input type="text" className="form-control" id="task-name" onChange={handleChange} style={{boxShadow: "none" }}></input>
            </div>
            <div className="form-group mt-3 mb-3">
              <label>Info:</label>
              <textarea className="form-control" rows="3" id="task-description" onChange={descriptionChange} style={{boxShadow: "none" }}></textarea>
            </div>
            <div>
            <p>Please select Users to this group. </p>
            <div id="form-check-id">
            </div>
            </div>
            </div>
          </MDBModalBody>
          <MDBModalFooter>
            <button className='btn btn-primary' style={{boxShadow: "none" }} onClick={() => {
                checkTask();
              }}>
                Create
            </button>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
    <ToastContainer>
    </ToastContainer>
    {/* /modals */}
    <hr></hr>
    </>
  )
}

export default Groups