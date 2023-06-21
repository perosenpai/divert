import React, {useState,} from 'react'
import {Route, Routes, useNavigate } from 'react-router-dom'
import '../assets/css/Profile-Edit-Form-styles.css'
import '../assets/css/Profile-Edit-Form.css'
import {getTeams} from '../utils/APIRoutes';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify'; 
import "react-toastify/dist/ReactToastify.css";
import { deleteTeamApi } from '../utils/APIRoutes';

let user = localStorage.getItem("divert-user");
user = JSON.parse(user);

const url = window.location.search;
const urlParams = new URLSearchParams(url);
let teamId = urlParams.get("teamId")

function UserSettings() {
  const navigate = useNavigate();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  }

  const deleteTeam= async (e)=>{
    e.preventDefault();

    let confirmAction = window.confirm("Are you sure to execute this action?");
    if (confirmAction) {

      const {data} = await axios.put(deleteTeamApi, 
        {teamId}
      );

      if(data.status === false){
        toast.error(data.msg, toastOptions);
      }else{
        navigate("/divert")
      }
      
    }
    
  }
  
  let teamCurrent = "";

  useState( async ()=>{
    let allTeams = await axios.get(getTeams);
    
    allTeams.data.some(team =>{
      if(team._id === teamId){
        teamCurrent = team;
        return team;
      }
    })

    document.getElementById('input-name').value = teamCurrent.teamName;
    document.getElementById('input-payment').value = teamCurrent.paymentMethod;
    document.getElementById('input-admin').value = teamCurrent.teamAdmin;
  })

  useState();


  return (
    <>
      <div className="container profile profile-view" id="profile" style={{maxHeight: "500px"}}>
        <form>
            <div className="row profile-row" style={{maxHeight: "100px"}}>
     
                <div className="col-md-8">
                    <h1>Team Settings </h1>
                    <p className='p-3 text-secondary'>If you want to change the name of your team or if you want to change the method of payment please contact us. All these fields are locked when creating your team in the fields you entered and you cannot change them yourself. Thank you for your understanding </p>
                    
                    <div className="row" style={{maxHeight: "100px"}}>
                        <div className="col-sm-6 col-md-6">
                            <div className="form-group mb-3">
                              <label  className="form-label" >Team Name </label><input id="input-name" className="form-control" defaultValue=""  type="text" name="firstname" readOnly={true} style={{backgroundColor: "#fbfbfb", boxShadow: "none" }}/></div>
                        </div>
                        
                    </div>
                    <div className="row" style={{maxHeight: "100px"}}>
                        <div className="col-sm-12 col-md-6" style={{maxHeight: "100px"}}>
                            <div className="form-group mb-3"><label className="form-label">Payment Type </label><input id="input-payment" className="form-control" defaultValue="" type="text" name="email" readOnly={true} style={{backgroundColor: "#fbfbfb", boxShadow: "none" }}/></div>
                        </div>
                    </div>
                    <div className="row" style={{maxHeight: "100px"}}>
                        <div className="col-sm-12 col-md-6" style={{maxHeight: "100px"}}>
                            <div className="form-group mb-3"><label className="form-label">Team Admin </label><input id="input-admin" className="form-control" defaultValue="" type="text" name="nickname" readOnly={true} style={{backgroundColor: "#fbfbfb", boxShadow: "none" }}/></div>
                        </div>
                    </div>
                    <div id="button-save-cancel-responsive"className="row" style={{maxHeight: "100px"}}>
                        <div className="col-md-12">
                          <button className="btn btn-primary-outline form-btn text-danger text-capitalize p-0 ml-0" type="submit" onClick={deleteTeam} style={{marginLeft: "0", marginTop: "10px", outline: "none", boxShadow: "none"}}>Delete team</button></div>
                    </div>
                </div>
            </div>
        </form>
    </div>
    </>
  )
}

export default UserSettings