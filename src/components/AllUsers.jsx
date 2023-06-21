import React, {useState, useEffect} from 'react'
import '../assets/css/tableCss.css'
import axios from 'axios';
import {getTeams} from '../utils/APIRoutes';
import avatarLogo from '../assets/img/avatar-logo-black.png';
import ClipLoader from "react-spinners/ClipLoader";
import {hideLoader} from '../App.js'

const url = window.location.search;
const urlParams = new URLSearchParams(url);
let teamId = urlParams.get("teamId")

let checkStatus = ['Delayed', 'Inactive', 'Active']

function AllUsers() {

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

  useEffect(() => {
    const loadData = async () => {
      let current = await getCurrentTeam();

      let usersTable = document.getElementById('table-users-id').querySelector('tbody');

      usersTable.innerHTML = "";

      if(current.Users.length == 0){
        document.querySelector('.table-responsive').innerHTML = `<p>No current users in this team.</p>`
      }

      current.Users.forEach(async(user) =>{
        console.log(user)
        console.log(document.querySelector('#table-users-id'))
        document.querySelector('#table-users-id').removeAttribute('style')

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
            <td><span data-toggle="tooltip" data-placement="top" title="Active/Inactive depends on whether the user has set up a profile." class="${checkStatus[user.status]}">${checkStatus[user.status]}</span></td>
            <td>
              ${user.groups ? user.groups : "User is not in a group."}
            </td>
          </tr>`;

        return usersTable;
          });
      
          hideLoader();
        };

    loadData();
  }, [])


  return (
    <div className="table-responsive">

        <table id="table-users-id" className="table custom-table" style={{display: "none"}}>
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">E-mail</th>
              <th scope="col">Status</th>
              <th scope="col">Groups</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>

  )
}

export default AllUsers