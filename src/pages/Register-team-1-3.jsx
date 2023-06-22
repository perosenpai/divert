import React,{useState, useEffect} from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify'; 
import "react-toastify/dist/ReactToastify.css";
import { register_team_1_1 } from '../utils/APIRoutes';
import ClipLoader from "react-spinners/ClipLoader";
import DivertLogo from '../assets/img/divert-logo.png';
import {allUsersRoute} from '../utils/APIRoutes';
import {hideLoader, showLoader} from '../App.js'
import {setElementFixed} from '../helpers';

let existingUsers = []

const url = window.location.search;
const urlParams = new URLSearchParams(url);
let teamId = urlParams.get("teamId")

function Register_team_1_3() {
  let i=Math.random().toString(36).substr(2);
  const url = window.location.search;
  const urlParams = new URLSearchParams(url);
  const navigate = useNavigate();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  }

  const getCurrentTeam = async () =>{
    let allUsers = await axios.get(allUsersRoute);

    allUsers.data.forEach(user =>{
      existingUsers.push(user)
    })

    let current = "";

    allUsers.data.some(currentTeam => {
      if(currentTeam._id === teamId){
        current = currentTeam
      }
    })
    return current
  }

  const [name, setName] = useState('');
  

  const [values, setValues] = useState({
    teamName: urlParams.get("teamName"),
    teamAdmin: urlParams.get("teamAdmin"),
    paymentMethod: urlParams.get("paymentMethod"),
    Users: [],
    notes: "",
    teamInfo: "",
    whatsNext: ""
  });
  

  const handleSubmit = async (e) => {
    
    e.preventDefault();

        setValues([
          ...values.Users,
          { id: i, email: name, avatar: "" },
      ]);

    const {teamName, teamAdmin, paymentMethod, Users, notes, teamInfo, whatsNext} = values;
      
    const {data} = await axios.post(register_team_1_1, {
      teamName,
      teamAdmin,
      paymentMethod,
      Users,
      notes,
      teamInfo,
      whatsNext
    });
    
      if(data.status === false){
        toast.error(data.msg, toastOptions);
      }      
      
      if(data.status === true){
        navigate("/divert");
      }  
    
  };
//page loading
    
  useEffect(() => {
    showLoader()
    const loadData = async () => {

      let current = await getCurrentTeam();
      await new Promise((r) => setTimeout(r, 1000));
      hideLoader();
      setElementFixed(document.querySelector('#footer-id'));

    };

    loadData();
  }, [])

  return (
    <>
  <meta charSet="utf-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0, shrink-to-fit=no"
  />
  <title>Login - Brand</title>
  <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css" />
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800&display=swap"
  />
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Merriweather:400,300,300italic,400italic,700,700italic,900,900italic&display=swap"
  />
  <link rel="stylesheet" href="assets/fonts/font-awesome.min.css" />
  <link rel="stylesheet" href="assets/css/Articles-Cards-images.css" />
  <link rel="stylesheet" href="assets/css/Footer-Dark-Multi-Column-icons.css" />
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css"
  />
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/magnific-popup.min.css"
  />
  <link rel="stylesheet" href="assets/css/Pricing-Free-Paid-badges.css" />
  <link rel="stylesheet" href="assets/css/styles.css" />
  <div
    className="row"
    style={{
      height: "100vh !important",
      marginLeft: "0 !important",
      marginRight: "0 !important"
      , height: '100vh'
    }}
  >
    <div className="col-lg-6 column-first shadow-lg">
      <div className="p-5">
        <div className="text-left" style={{ textAlign: "left !important" }}>
        <a id="divert-logo-app-id"className="navbar-brand align-items-center" href="/divert" style={{ marginLeft: '0' }}>
                <img src={DivertLogo} style={{width: "30px", height: "30px"}}></img>
                <span id="divert-name-id" style={{fontSize: "18px"}}>Divert</span>
              </a>
          <h4 className="text-dark mb-4" style={{ marginTop: 30 }}>
            Add new users to your Team.
          </h4>
          <p className="mb-4" style={{marginTop: "-15px", color: "gray"}}>Invite your team members trough here. Remember that the amount of users is limited in relation to your chosen payment method. Please enter valid e-mail. </p>
        </div>
        <form className="user" onSubmit={(event) => handleSubmit(event)}>
          <div className="input-group mb-3 input-users-email">
            <input
              type="email"
              className="form-control"
              placeholder="Users e-mail address"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <div className="input-group-append">
              <button id="btn-send-ivnite" className="btn btn-primary btn-square-md" type="button"
                onClick={() => {
                  if(values.paymentMethod === "Free"){
                    if(values.Users.length > 2){
                      toast.error("Cannot add more than 3 users this free version.", toastOptions);
                      return false;
                    }else{
                      if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(name)){
                        toast.error("Invalid e-mail address.", toastOptions);
                      }else{
                        

                        let existingUser = existingUsers.find(x => x.email === name)

                        if(existingUser){
                          values.Users.push({
                            id: existingUser._id,
                            email: existingUser.email,
                            avatar: existingUser.avatar,
                            status: 2,
                            completedTasks: 0
                          });
                          toast.error("Added.", toastOptions);
                          setName('');
                        }else{
                          toast.error("Invitation has been sent.", toastOptions);
                          setName('');
                        
                          values.Users.push({
                            id: i,
                            email: name,
                            avatar: "",
                            status: 1,
                            completedTasks: 0
                          });
                        }
                      }
                      
                    }
                    return true;
                  }else if(values.paymentMethod === "Pro"){
                    if(values.Users.length > 9){
                      toast.error("Cannot add more than 10 on Pro version.", toastOptions);
                      return false;
                    }else{
                      if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(name)){
                        toast.error("Invalid e-mail address.", toastOptions);
                      }else{
                        let existingUser = existingUsers.find(x => x.email === name)

                        if(existingUser){
                          values.Users.push({
                            id: existingUser._id,
                            email: existingUser.email,
                            avatar: existingUser.avatar,
                            status: 2,
                            completedTasks: 0
                          });
                          toast.error("Added.", toastOptions);
                          setName('');
                        }else{
                          toast.error("Invitation has been sent.", toastOptions);
                          setName('');
                        
                          values.Users.push({
                            id: i,
                            email: name,
                            avatar: "",
                            status: 1,
                            completedTasks: 0
                          });
                        }

                        
                      }
                    }
                    return true;
                  }else{
                    if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(name)){
                      toast.error("Invalid e-mail address.", toastOptions);
                    }else{
                        let existingUser = existingUsers.find(x => x.email === name)

                        if(existingUser){
                          values.Users.push({
                            id: existingUser._id,
                            email: existingUser.email,
                            avatar: existingUser.avatar,
                            status: 2,
                            completedTasks: 0
                          });
                          toast.error("Added.", toastOptions);
                          setName('');
                        }else{
                          toast.error("Invitation has been sent.", toastOptions);
                          setName('');
                        
                          values.Users.push({
                            id: i,
                            email: name,
                            avatar: "",
                            status: 1,
                            completedTasks: 0
                          });
                        }
                    }

                    return true;
                  }
                }}
              >
                Send
              </button>
            </div>
          </div>
          <button id="register-1-btn"className="btn btn-primary btn-block text-white btn-user" type="submit">Next</button>
          <hr />
        </form>
        <div className="text-center" />
        <div className="text-center">
          <a className="small" href="register.html" />
        </div>
      </div>
    </div>
  </div>
  <footer 
id="footer-id"
    className="text-white bg-dark"
    style={{ overflow: "hidden" }}
  >
    <div className="container py-4 py-lg-5 footer-styled">
      <div
        className="d-flex justify-content-between pt-3"
      >
        <p className="mb-0" style={{color: 'gray !important'}}>Copyright © 2023 Divert</p>
        <ul className="list-inline text-white-50 mb-0">
        <a id="social-media-links" href="https://www.facebook.com/divert-app">
          <li className="list-inline-item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              fill="currentColor"
              viewBox="0 0 16 16"
              className="bi bi-facebook"
            >
              <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
            </svg>
          </li>
          </a>
          <a id="social-media-links" href="https://www.twitter.com/divert-app">
          <li className="list-inline-item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              fill="currentColor"
              viewBox="0 0 16 16"
              className="bi bi-twitter"
            >
              <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
            </svg>
          </li>
          </a>
          <a id="social-media-links" href="https://www.instagram.com/divert-app">
          <li className="list-inline-item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              fill="currentColor"
              viewBox="0 0 16 16"
              className="bi bi-instagram"
            >
              <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
            </svg>
          </li>
          </a>
        </ul>
      </div>
    </div>
  </footer>
  <footer
    className="text-white bg-dark fixed-bottom"
    style={{ overflow: "hidden" }}
  >
    <div className="container py-4 py-lg-5 footer-styled">
      <div
        className="d-flex justify-content-between pt-3"
      >
        <p className="mb-0" style={{color: 'gray'}}>Copyright © 2023 Divert</p>
        <ul className="list-inline text-white-50 mb-0">
        <a id="social-media-links" href="https://www.facebook.com/divert-app">
          <li className="list-inline-item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              fill="currentColor"
              viewBox="0 0 16 16"
              className="bi bi-facebook"
            >
              <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
            </svg>
          </li>
          </a>
          <a id="social-media-links" href="https://www.twitter.com/divert-app">
          <li className="list-inline-item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              fill="currentColor"
              viewBox="0 0 16 16"
              className="bi bi-twitter"
            >
              <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
            </svg>
          </li>
          </a>
          <a id="social-media-links" href="https://www.instagram.com/divert-app">
          <li className="list-inline-item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              fill="currentColor"
              viewBox="0 0 16 16"
              className="bi bi-instagram"
            >
              <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
            </svg>
          </li>
          </a>
        </ul>
      </div>
    </div>
  </footer>
  <ToastContainer>

      </ToastContainer>
</>


  )
}

export default Register_team_1_3