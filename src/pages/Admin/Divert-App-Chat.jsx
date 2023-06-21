import React, {useState, useEffect} from 'react'
import {NavLink} from 'react-router-dom'
import '../../assets/css/styles.css'
import '../../assets/css/header-navigation.css';
import "../../assets/css/sidebar.css"
import "../../assets/css/sidebar-dark.css";
import "../../assets/fonts/font-awesome.min.css"
import axios from 'axios';
import {getTeams} from '../../utils/APIRoutes';
import { FaComments, FaBell, FaDashcube, FaTasks, FaUsers, FaLayerGroup, FaRegSun, FaAngleRight, FaSearch } from "react-icons/fa";
import {Route, Routes, useNavigate } from 'react-router-dom'
import '../../assets/js/Sidebar-Menu.js'
import avatarLogo from '../../assets/img/avatar-logo.png';
import avatarLogoBlack from '../../assets/img/avatar-logo-black.png';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Chat from '../../components/Chat'
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import Collapse from 'react-bootstrap/Collapse';
import $ from 'jquery';
import ClipLoader from "react-spinners/ClipLoader";
import DivertLogo from '../../assets/img/divert-logo.png';

let user = localStorage.getItem("divert-user");
user = JSON.parse(user);

const url = window.location.search;
const urlParams = new URLSearchParams(url);
let teamId = urlParams.get("teamId")

function Divert_App_Chat() {

  const [open, setOpen] = useState(false);

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

  $('.main_links a').each(function(){
    if($(this).hasClass('active'))
        alert($(this).attr('id'));
 });
  

  const navigate = useNavigate();

  const handleSubmit = () => {
    localStorage.removeItem("divert-user");
      navigate('/');
  };

  //page loading
  const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };

  const [loading, setLoading] = useState(true);
      
    useEffect(() => {
      const loadData = async () => {
        await new Promise((r) => setTimeout(r, 1000));
        setLoading((loading) => !loading);

        let current = await getCurrentTeam();
    
    let teamName = document.getElementById('sidebar-team-name');
    let userElement = document.getElementById('user-div-creating')

    userElement.innerHTML = "";
    
    current.Users.forEach(async(user) =>{
      userElement.innerHTML += `
                <div class="user-container" style="padding: 10px; width: 300px">
                  <a class="user-avatar" style="margin-right: 10px" href="/divert-app-chat?teamId=${teamId}">
                    <img
                    class="rounded-circle img-fluid"
                      src=${user.avatar ? user.avatar : avatarLogo}
                      width=${48}
                      height=${48}
                      style="height:35px; object-fit: cover"
                    />
                    <p class="user-name" style="display: contents; font-size: 10px">
                      <b>${user.email}</b>
                    </p>
                  </a>
                  </div>`;

      return userElement;
    });
  
    teamName.innerText = current.teamName;
      };
        
      loadData();
    }, [])
    if (loading) {
        return <div style={style}>
                <ClipLoader 
                  color={"#f05f40"}
                  loading={loading}
                  alignitems= {'center'}
                  justifycontent = {'center'}
                  flex= {1}
                  size={50}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>
    }else{
    return (
      <>
        <nav className="navbar navbar-light navbar-expand-md py-3" style={{ width: "100%", position: "fixed", zIndex:"999" }}>
          <div id="navcol-1" className="navbar-collapse" style={{ color: "rgb(33, 37, 41)" }}>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item" />
              <a id="divert-logo-app-id"className="navbar-brand d-flex align-items-center" href="/divert">
                <img src={DivertLogo} style={{width: "30px", height: "30px"}}></img>
                <span id="divert-name-id" style={{fontSize: "18px"}}>Divert</span>
              </a>
            </ul>
            {/* Notifications */}
            <Dropdown>
              <Dropdown.Toggle  className="text-lowercase" variant="outline"  style={{boxShadow: "none", margin: "0", padding: "0" }}>
              <FaBell style={{  color: "#5a5c69" }} className="fas fa-bell" aria-hidden="true"/>
              </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>No new notifications.</Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>
            {/* Messages */}
            <Dropdown >
              <Dropdown.Toggle  className="text-lowercase" variant="outline" style={{boxShadow: "none", margin: "0", padding: "0" }}>
              <a href="#"><FaComments style={{ color: "#5a5c69" }} className="fas fa-comment" aria-hidden="true" /></a>
              </Dropdown.Toggle>
            <Dropdown.Menu>
            <Dropdown.Item>No new messages.</Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>
             {/* USER */}
             <div className="topbar-divider d-sm-block" style={{width: "0", borderRight: "1px solid #e3e6f0", height: "calc(4.375rem - 2rem)", marginLeft: "12px"}}></div>
            <Dropdown >
              <Dropdown.Toggle  className="text-lowercase" variant="outline" id="dropdown-basic" style={{boxShadow: "none" }}>
              <img className="rounded-circle img-fluid" src={user.avatar ? user.avatar : avatarLogoBlack} style={{marginRight: "6px", height: "35px", objectFit: "cover"}}width="35" height="35"/>
                <span id="welcome-user" style={{fontWeight: "600", fontSize: "80%", color: "#5a5c69" , boxShadow: "none"}}>Welcome <b>{user.nickname}</b></span>
              </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href={`/admin-settings?teamId=${teamId}`}>Options</Dropdown.Item>
              <form style={{marginLeft: "2px"}} onSubmit={(event) => handleSubmit(event)}>
                <button style={{color: "red"}}className='btn btn-primary-outline'>SIGN OUT</button>
              </form>
            </Dropdown.Menu>
            </Dropdown>
          </div>
        </nav>
        <div className="row">
          <div id="sidebar-flex" className="col-3 col-md-3" style={{marginTop: "79px", paddingLeft: "0px", position: "fixed", marginRight: "auto"}}>
            <Container style={{paddingLeft: "0px"}}>
              <div id="layoutSidenav_nav">
                <div id="sidenavAccordion" className="sb-sidenav accordion sb-sidenav-dark">
                  <div className="sb-sidenav-menu" style={{height: "100vh", display: "flex"}}>
                    <div className="nav" style={{ height: "100vh !important" }}>
                      <div>
                        <div className="sb-sidenav-menu-heading">
                          <span id="sidebar-team-name"className="team-name-span" style={{ fontSize: 30 }}>Team Name</span>
                        </div>
                        <a className="nav-link" href={`/divert-app-admin?teamId=${teamId}`}>
                          <div className="sb-nav-link-icon">
                            <FaDashcube className="fas fa-dashboard" />
                          </div>
                          <span>Dashboard</span>
                        </a>
                        <a className="nav-link" href={`/tasks?teamId=${teamId}`}>
                          <div className="sb-nav-link-icon">
                            <FaTasks className="fas fa-tasks" aria-hidden="true" />
                          </div>
                          <span>Tasks</span>
                        </a>
                      </div>
                      <div id="responsive-users-more-menu">
                        <a onClick={() => setOpen(!open)} className="nav-link"  data-toggle="collapse" data-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                          <div className="sb-nav-link-icon">
                            <FaUsers className="fas fa-users" aria-hidden="true" />
                          </div>
                          <span>Users</span>
                          <div className="sb-sidenav-collapse-arrow">
                            <FaAngleRight className="fas fa-angle-down" />
                          </div>
                        </a>
                        <Collapse in={open}>
                          <div id="users-responsive-menu"className="sb-sidenav-menu-nested nav">
                            <a className="nav-link" href={`/all-users?teamId=${teamId}`}> All Users</a>
                            <a className="nav-link" href={`/edit-users?teamId=${teamId}`}> Edit User Roles </a>
                          </div>
                        </Collapse>
                      </div>
                      <a className="nav-link" href={`/groups?teamId=${teamId}`}>
                        <div className="sb-nav-link-icon">
                          <FaLayerGroup className="fas fa-tasks" aria-hidden="true" />
                        </div>
                        <span>Groups</span>
                      </a>
                      <a className="nav-link" href={`/settings?teamId=${teamId}`}>
                        <div className="sb-nav-link-icon">
                          <FaRegSun className="fas fa-tasks" aria-hidden="true" />
                        </div>
                        <span>Settings</span>
                      </a>
                      <div>
                        <div id="user-search" className="float-left float-md-right mt-4 mt-md-4 search-area" style={{marginTop: "20px !important", paddingLeft: 20, paddingRight: 20}}>
                          <FaSearch className="fass fa-search float-left search-icon" />
                          <input className="float-left float-sm-right custom-search-input" type="search" placeholder="Type to seach by Name"/>
                        </div>
                        <div id="user-div-creating">
                        <a  className="nav-link" href="#">
                            <div className="col-12 col-sm-6 col-md-4 col-lg-3 user-item">
                              <div className="user-container" style={{ marginBottom: 10, position: "absolute" }}>
                                <div className="user-avatar" style={{marginRight:"10px"}}href="#">
                                  <img className="rounded-circle img-fluid" src={avatarLogo}width={48} height={48}/>
                                </div>
                                <p className="user-name" style={{display: "contents", fontSize: "10px"}}>
                                  <b>Mark Smith Peterson</b>
                                </p>
                              </div>  
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </div>
          <div id="main" className="col-9 col-md-9" style={{marginTop: "79px", marginLeft: "auto"}}>
            <Chat></Chat>
          </div>
        </div>
      </>
  )}
}

export default Divert_App_Chat