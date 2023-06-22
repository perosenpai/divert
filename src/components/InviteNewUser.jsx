import React, {useState, useEffect} from 'react'
import '../assets/css/tableCss.css'
import axios from 'axios';
import {getTeams} from '../utils/APIRoutes';
import avatarLogo from '../assets/img/avatar-logo.png';
import ClipLoader from "react-spinners/ClipLoader";
import {ToastContainer, toast} from 'react-toastify'; 
import { addNewUserToTeam } from '../utils/APIRoutes';
import emailjs from '@emailjs/browser';


const url = window.location.search;
const urlParams = new URLSearchParams(url);
let teamId = urlParams.get("teamId")

let existingUsers = []

function InviteNewUser() {

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }
    
    let i=Math.random().toString(36).substr(2);

    const handleSubmit = async (e) => {
        e.preventDefault();
    };

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

    

    const inviteNewUserMember = async () => {
      
        let curent = await getCurrentTeam();

        if(curent.paymentMethod === "Free"){
          if(curent.Users.length > 2){
            toast.error("Cannot add more than 3 users this free version.", toastOptions);
            return false;
          }else{
            if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(name)){
              toast.error("Invalid e-mail address.", toastOptions);
            }else{
              
              let existingUserInTeam = curent.Users.find(x => x.email === name);
              let existingUser = curent.Users.find(x => x.email === name)

              if(existingUserInTeam){
                toast.error("The user is already in team.", toastOptions);
                return;
              }

              if(existingUser){
                values.Users.push({
                  id: existingUser._id,
                  email: existingUser.email,
                  avatar: existingUser.avatar,
                  status: 2,
                  teamId: teamId,
                  completedTasks: 0
                });
                toast.error("Added.", toastOptions);
                await new Promise((r) => setTimeout(r, 1500));
                window.location.reload(false);
                //send tobackend
              }else{
                toast.error("Invitation has been sent.", toastOptions);
                setName('');
              
                values.Users.push({
                  id: i,
                  email: name,
                  avatar: "",
                  status: 1,
                  teamId: teamId,
                  completedTasks: 0
                });

                const {data} = await axios.put(addNewUserToTeam, 
                  values.Users[0]
                );

                await new Promise((r) => setTimeout(r, 1500));
                window.location.reload(false);

              }
            }
            
          }
          return true;
        }else if(curent.paymentMethod === "Pro"){
          if(curent.Users.length > 9){
            toast.error("Cannot add more than 10 on Pro version.", toastOptions);
            return false;
          }else{
            if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(name)){
              toast.error("Invalid e-mail address.", toastOptions);
            }else{
              
              let existingUserInTeam = curent.Users.find(x => x.email === name);
              let existingUser = curent.Users.find(x => x.email === name)

              if(existingUserInTeam){
                toast.error("The user is already in team.", toastOptions);
                return;
              }

              if(existingUser){
                values.Users.push({
                  id: existingUser._id,
                  email: existingUser.email,
                  avatar: existingUser.avatar,
                  status: 2,
                  teamId: teamId,
                  completedTasks: 0
                });
                toast.error("Added.", toastOptions);
                await new Promise((r) => setTimeout(r, 1500));
                window.location.reload(false);
                //send tobackend
              }else{
                toast.error("Invitation has been sent.", toastOptions);
                setName('');
              
                values.Users.push({
                  id: i,
                  email: name,
                  avatar: "",
                  status: 1,
                  teamId: teamId,
                  completedTasks: 0
                });

                const {data} = await axios.put(addNewUserToTeam, 
                  values.Users[0]
                );

                await new Promise((r) => setTimeout(r, 1500));
                window.location.reload(false);

              }
            }
          }
          return true;
        }else{
          if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(name)){
            toast.error("Invalid e-mail address.", toastOptions);
          }else{

              
            let existingUserInTeam = curent.Users.find(x => x.email === name);
            let existingUser = curent.Users.find(x => x.email === name)

            if(existingUserInTeam){
              toast.error("The user is already in team.", toastOptions);
              return;
            }

            if(existingUser){
              values.Users.push({
                id: existingUser._id,
                email: existingUser.email,
                avatar: existingUser.avatar,
                status: 2,
                teamId: teamId,
                completedTasks: 0
              });
              toast.error("Added.", toastOptions);
              await new Promise((r) => setTimeout(r, 1500));
              window.location.reload(false);
              //send tobackend
            }else{
              toast.error("Invitation has been sent.", toastOptions);
              setName('');
            
              values.Users.push({
                id: i,
                email: name,
                avatar: "",
                status: 1,
                teamId: teamId,
                completedTasks: 0
              });

              const {data} = await axios.put(addNewUserToTeam, 
                values.Users[0]
              );

              await new Promise((r) => setTimeout(r, 1500));
              window.location.reload(false);

            }
          
          }

          return true;
        }
    }

    const [name, setName] = useState('');
  

    const [values, setValues] = useState({
        teamId: teamId,
        Users: []
    });

    return (
        <form className="user" style={{paddingBottom: "20px", marginTop: "40px"}}onSubmit={(event) => handleSubmit(event)}>
            <div className="input-group mb-3 input-users-email" style={{boxShadow: "none" }}>
                <input
                type="email"
                className="form-control"
                placeholder="Insert new users email address here"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                value={name}
                onChange={e => setName(e.target.value)}
                style={{boxShadow: "none" }}
                />
                <div className="input-group-append">
                <button id="send-invite-btn-id"className="btn btn-primary btn-square-md" type="button" style={{boxShadow: "none" }}
                    onClick={inviteNewUserMember}>
                    Send
                </button>
                </div>
            </div>
            <hr />
            <ToastContainer>

</ToastContainer>
            </form>

    )
}

export default InviteNewUser
