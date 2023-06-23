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
import {usersInTeam, newTask, getGroups, createGroupTask} from '../utils/APIRoutes'
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify'; 
import "react-toastify/dist/ReactToastify.css";

const url = window.location.search;
const urlParams = new URLSearchParams(url);
let teamId = urlParams.get("teamId")
let groupId = urlParams.get('groupId')
let groupName = urlParams.get('groupName')


const date = new Date();
var todaysDate = date.toISOString().split('T')[0]

let groupTask = {
  "name": "",
  "description": "",
  "teamId": teamId,
  "groupId": groupId,
  "groupName": groupName,
  "userEmail": "",
  "startDate": todaysDate,
  "dueDate": "",
  "status": 1
}

function User_Tasks() {  

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
    groupTask.name = ""
    groupTask.description = ""
    groupTask.userEmail = ""
    groupTask.dueDate = ""

    document.querySelector('#task-name').value = ""
    document.querySelector('#task-description').value = ""
    document.querySelector('#task-date').value = ""
    document.querySelector('#select-id').value = ""
  }

  const handleChange = (event) =>{
    groupTask.name = event.target.value;
  }

  const descriptionChange = (event) =>{
    groupTask.description = event.target.value;
  }

  const dateChange = (event) =>{
    groupTask.dueDate = event.target.value;    
  }

  const changeOption = (event) =>{
    groupTask.userEmail = event.target.value;
  }

  const checkTask = () =>{

    var today = new Date();
    var todaysDate = today.toISOString().split('T')[0]

    if(groupTask.name === ""){
      toast.error("Please enter your tasks name.", toastOptions);
      return false;
    }else if(groupTask.description === ""){
      toast.error("Please describe your task.", toastOptions);
      return false;
    }else if(groupTask.dueDate === ""){
      toast.error("Please select due date.", toastOptions); 
      return false;
    }else if(todaysDate > groupTask.dueDate){
      toast.error("Please select valid date and not a date that has already passed.", toastOptions);
      return false;
    }

    setToggleOneModal(!toggleOneModal);
    setTimeout(() => {
      setToggleTwoModal(!toggleTwoModal);
    }, 400);
  }

  const checkTask2 = async () =>{

    if(groupTask.userEmail === ""){
      toast.error("Please assign one User to this Task.", toastOptions);
      return false;
    }

    setToggleTwoModal(!toggleTwoModal)
    
    const {data} = await axios.post(createGroupTask, {
      groupTask
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
      let groups = await axios.put(getGroups, { teamId })

      let foundGroup = groups.data.find(group => group._id == groupId)

      document.querySelector('#select-id').innerHTML = "<option></option>"

      foundGroup.newGroupObj.Users.forEach(user =>{
        document.querySelector('#select-id').innerHTML += `<option>${user}</option>`
      })
    };

    loadData();
  }, [])

 

  return (
    <>
    <button onClick={() => setToggleOneModal(!toggleOneModal)} className='btn' style={{boxShadow: "none", paddingTop:"40px", paddingBottom: "40px" }}><FaPlus style={{paddingBottom: "4px"}}></FaPlus> New Task</button>

    {/* modals */}
    <MDBModal id="first-modal-id"show={toggleOneModal} setShow={setToggleOneModal} tabIndex='-1'>
      <MDBModalDialog centered>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>New task</MDBModalTitle>
            <button style={{boxShadow: "none" }} className='btn-close'
              color='none'
              onClick={() => {initialState();setToggleOneModal(!toggleOneModal)}}></button>
          </MDBModalHeader>
          <MDBModalBody>
          <div className="row">
            <p>Please enter your task name and description.</p>
            <div className="form-group">
              <label style={{color: "#28282"}}>Name:</label>
              <input type="text" className="form-control" id="task-name" onChange={handleChange} style={{boxShadow: "none" }}></input>
            </div>
            <div className="form-group mt-3 mb-3">
              <label>Description:</label>
              <textarea className="form-control" rows="3" id="task-description" onChange={descriptionChange} style={{boxShadow: "none" }}></textarea>
            </div>
            <div>
                <div className="col-md-5">
                  <Form.Group>
                    <Form.Label>Due Date:</Form.Label>
                    <Form.Control style={{boxShadow: "none" }} onChange={dateChange} id="task-date"type="date" name="dob" placeholder="Due Date" />
                    </Form.Group>
                </div>
              </div>
            </div>
          </MDBModalBody>
          <MDBModalFooter>
            <button className='btn btn-primary' style={{boxShadow: "none" }} onClick={() => {
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
            <MDBModalTitle>Select User</MDBModalTitle>
            <button style={{boxShadow: "none" }} className='btn-close'
              color='none'
              onClick={() => {
                initialState();
                setToggleTwoModal(!toggleTwoModal)
                }}>
              
            </button>
          </MDBModalHeader>
          <MDBModalBody>
            <p>Please select one User to assign this task. </p>
            <select id="select-id" style={{boxShadow: "none" }} onChange={changeOption} className="form-select" aria-label="Default select example">
              <option defaultValue="1">One</option>
              <option defaultValue="2">Two</option>
              <option defaultValue="3">Three</option>
            </select>
          </MDBModalBody>
          <MDBModalFooter>
          <button className='btn' style={{boxShadow: "none" }} onClick={() => {
              
                setToggleTwoModal(!toggleTwoModal);
                setTimeout(() => {
                  setToggleOneModal(!toggleOneModal);
                }, 400);
              }}>
              Back
            </button>
            <button style={{boxShadow: "none" }} className='btn btn-primary' 
            onClick={async () => {
              await checkTask2();
            }}>
              Finish
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

export default User_Tasks