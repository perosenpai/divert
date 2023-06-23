import React, { PureComponent, useEffect, useState } from 'react'
import { FaLayerGroup, FaEllipsisV, FaComment, FaComments } from "react-icons/fa";
import { getDashboard, getGroups, getTasks, updateNote, updateTeamInfo, updateWhatsNext, getGropTasks } from '../utils/APIRoutes'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
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
import { FaPlus } from "react-icons/fa";
import { Form } from 'react-bootstrap';

const url = window.location.search;
const urlParams = new URLSearchParams(url);
let teamId = urlParams.get("teamId")

let notesValue = ""
let teamInfoValue = ""
let whatsNextValue = ""

function Dashboard() {

    const [toggleOneModal, setToggleOneModal] = useState(false);
    const [toggleTwoModal, setToggleTwoModal] = useState(false);
    const [toggleThirdModal, setToggleThirdModal] = useState(false);

    const initialState = () => {

    }

    const handleChange = (event) => {
        notesValue = event.target.value;
    }

    const handleChangeTeamInfo = (event) => {
        teamInfoValue = event.target.value;
    }

    const handleChangeWhatsNext = (event) => {
        whatsNextValue = event.target.value;
    }

    const saveNotes = async (event) => {
        let data = await axios.post(updateNote, {
            teamId, notesValue
        });

        if (data.status === false) {
            alert(data.msg);
        } else {
            window.location.reload();
        }

    }

    const saveTeamInfo = async (event) => {
        let data = await axios.post(updateTeamInfo, {
            teamId, teamInfoValue
        });

        if (data.status === false) {
            alert(data.msg);
        } else {
            window.location.reload();
        }

    }
    const saveWhatsNext = async (event) => {
        let data = await axios.post(updateWhatsNext, {
            teamId, whatsNextValue
        });

        if (data.status === false) {
            alert(data.msg);
        } else {
            window.location.reload();
        }

    }

    

    let [totalUsers, setTotalUsers] = useState(0);
    let [totalGroups, setTotalGroups] = useState(0);
    let [totalTasks, setTotalTasks] = useState(0)
    let [pendingUsers, setPendingUsers] = useState(0)
    let [data, setData] = useState([])
    let [user, setUsers] = useState();
    let [notes, setNotes] = useState("");
    let [teamInfo, setTeamInfo] = useState("");
    let [whatsNext, setWhatsNext] = useState("");

    useEffect(() => {
        const loadData = async () => {
            let arr = [];
            let complete = 0;

            let dashboard = await axios.post(getDashboard, { teamId })
            let groups = await axios.put(getGroups, { teamId })
            let tasks = await axios.put(getTasks, { teamId })
            setTotalUsers(dashboard.data.Users.length)
            setUsers(dashboard.data.Users)
            setTotalGroups(groups.data.length)

            tasks.data.forEach(task => {

                if (task.task.status == 2) {
                    complete = complete + 1;
                }
            })

            let tasksPercentage = complete / tasks.data.length * 100;

            if (!tasksPercentage) {
                document.querySelector('#percentage-tasks-id').innerHTML = 0 + "%"
                document.querySelector('#percentage-tasks-bar-id').style.ariaValueNow = 0
                document.querySelector('#percentage-tasks-bar-id').style.width = 0 + "%"
            } else {
                document.querySelector('#percentage-tasks-id').innerHTML = Math.trunc(tasksPercentage) + "%"
                document.querySelector('#percentage-tasks-bar-id').style.ariaValueNow = Math.trunc(tasksPercentage)
                document.querySelector('#percentage-tasks-bar-id').style.width = Math.trunc(tasksPercentage) + "%"
            }

            setTotalTasks(tasksPercentage)


            dashboard.data.Users.forEach(user => {
                if (user.status == 1) {
                    pendingUsers = pendingUsers + 1;
                }

                arr.push({
                    name: user.email,
                    uv: 100,
                    Completed: user.completedTasks,
                    amt: 100
                })

                setData(arr)
            })

            document.querySelector('#notes-div-id').innerHTML = ""

            if (dashboard.data.notes == "") {
                document.querySelector('#notes-div-id').innerHTML = "<p>Write some notes.</p>"
            } else {
                document.querySelector('#notes-div-id').innerHTML = `<p>${dashboard.data.notes}</p>`
                document.querySelector('#task-name').value = dashboard.data.notes
            }

            if (dashboard.data.teamInfo == "") {
                document.querySelector('#team-info-dashboard-id').innerHTML = "<p>Write about your team.</p>"
            } else {
                document.querySelector('#team-info-dashboard-id').innerHTML = `<p>${dashboard.data.teamInfo}</p>`
                document.querySelector('#team-info-id').value = dashboard.data.teamInfo
            }

            if (dashboard.data.whatsNext == "") {
                document.querySelector('#whats-next-dashboard-id').innerHTML = "<p>Write your ideas about future.</p>"
            } else {
                document.querySelector('#whats-next-dashboard-id').innerHTML = `<p>${dashboard.data.whatsNext}</p>`
                document.querySelector('#whats-next-value-id').value = dashboard.data.whatsNext
            }

            document.querySelector('#groups-card-id').innerHTML = ``

            //call all group tasks

            groups.data.forEach(async (group) => {
                let i = 0;
                let groupId = group._id
                let groupTasks = await axios.put(getGropTasks, {groupId});

                groupTasks.data.forEach(task =>{
                    if(task.groupTask.status == 2){
                        i=i+1;
                    }
                })

                let percentage = i/groupTasks.data.length*100;

                if(!percentage){
                    percentage = 0;
                }

                document.querySelector('#groups-card-id').innerHTML += `
                        <h4 class="small font-weight-bold">${group.newGroupObj.name} (${Math.trunc(percentage)}%)<span class="float-right"></span></h4>
                                    <div class="progress mb-4">
                                        <div class="progress-bar bg-danger" role="progressbar" style="width: ${Math.trunc(percentage)}%"
                                            aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                `
            })

            if (groups.data.length == 0) {
                document.querySelector('#groups-card-id').innerHTML = `
                <h4 class="small font-weight-bold">There are no current groups created.</h4>
                `
            }

            document.querySelector('#pending-users-id').innerHTML = `${pendingUsers}`;

            document.querySelector('#dashboard-main-id').removeAttribute('style')
        }

        loadData()



    }, [])

    return (

        <div id="dashboard-main-id" style={{ display: "none" }} className="container-fluid">

            {/* modals */}
            <MDBModal id="notes-modal-id" show={toggleOneModal} setShow={setToggleOneModal} tabIndex='-1'>
                <MDBModalDialog centered>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Notes</MDBModalTitle>
                            <button style={{ boxShadow: "none" }} className='btn-close'
                                color='none'
                                onClick={() => { initialState(); setToggleOneModal(!toggleOneModal) }}></button>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <div className="row">
                                <div className="form-group">
                                    <textarea type="text" className="form-control" id="task-name" onChange={handleChange} style={{ boxShadow: "none", minHeight: "50px" }}></textarea>
                                </div>
                            </div>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <button className='btn btn-primary' style={{ boxShadow: "none" }} onClick={() => {
                                saveNotes();
                            }}>
                                Save
                            </button>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
            <MDBModal id="team-info-modal-id" show={toggleTwoModal} setShow={setToggleTwoModal} tabIndex='-1'>
                <MDBModalDialog centered>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Team info</MDBModalTitle>
                            <button style={{ boxShadow: "none" }} className='btn-close'
                                color='none'
                                onClick={() => { initialState(); setToggleTwoModal(!toggleTwoModal) }}></button>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <div className="row">
                                <div className="form-group">
                                    <textarea id="team-info-id"type="text" className="form-control" onChange={handleChangeTeamInfo} style={{ boxShadow: "none", minHeight: "50px" }}></textarea>
                                </div>
                            </div>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <button className='btn btn-primary' style={{ boxShadow: "none" }} onClick={() => {
                                saveTeamInfo();
                            }}>
                                Save
                            </button>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
            <MDBModal id="whats-next-modal-id" show={toggleThirdModal} setShow={setToggleThirdModal} tabIndex='-1'>
                <MDBModalDialog centered>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>What's next?</MDBModalTitle>
                            <button style={{ boxShadow: "none" }} className='btn-close'
                                color='none'
                                onClick={() => { initialState(); setToggleThirdModal(!toggleThirdModal) }}></button>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <div className="row">
                                <div className="form-group">
                                    <textarea type="text" className="form-control" id="whats-next-value-id" onChange={handleChangeWhatsNext} style={{ boxShadow: "none", minHeight: "50px" }}></textarea>
                                </div>
                            </div>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <button className='btn btn-primary' style={{ boxShadow: "none" }} onClick={() => {
                                saveWhatsNext();
                            }}>
                                Save
                            </button>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
            <div className="row">

                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-primary shadow h-100 py-2" style={{ borderLeft: ".25rem solid #F05F40" }}>
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <h6 className="m-0 font-weight-bold mb-3" style={{ color: "#F05F40" }}>Total Users</h6>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800" style={{ color: "#5a5c69" }}>{totalUsers}</div>
                                </div>
                                <div className="col-auto">
                                    <FaLayerGroup style={{ color: "#DDDFEB" }}></FaLayerGroup>
                                    {/* <i className="fas fa-calendar fa-2x text-gray-300"></i> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-success shadow h-100 py-2" style={{ borderLeft: ".25rem solid #1cc88a" }}>
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <h6 className="m-0 font-weight-bold text-success mb-3">Total Groups</h6>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800" style={{ color: "#5a5c69" }}>{totalGroups}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-info shadow h-100 py-2" style={{ borderLeft: ".25rem solid #36b9cc" }}>
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <h6 className="m-0 font-weight-bold text-info mb-3">Tasks</h6>
                                    <div className="row no-gutters align-items-center">
                                        <div className="col-auto">
                                            <div id="percentage-tasks-id" className="h5 mb-0 mr-3 font-weight-bold text-gray-800" style={{ color: "#5a5c69" }}>50%</div>
                                        </div>
                                        <div className="col">
                                            <div className="progress progress-sm mr-2">
                                                <div id="percentage-tasks-bar-id" className="progress-bar bg-info" role="progressbar"
                                                    style={{ width: "50%", ariaValueNow: "50", ariaValueMin: "0" }}
                                                    aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-warning shadow h-100 py-2" style={{ borderLeft: ".25rem solid #f6c23e" }}>
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <h6 className="m-0 font-weight-bold text-warning mb-3">Pending User Requests</h6>
                                    <div id="pending-users-id" className="h5 mb-0 font-weight-bold text-gray-800" style={{ color: "#5a5c69" }}>{pendingUsers}</div>
                                </div>
                                <div className="col-auto">
                                    <FaComment style={{ color: "#DDDFEB" }}></FaComment>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row justify-content-center">
                <div className="col-xl-4 col-lg-5 ">
                    <div className="card shadow mb-4">
                        <div
                            className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <h6 className="m-0 font-weight-bold" style={{ color: "#F05F40" }}>Notes</h6>
                            <div className="dropdown no-arrow">
                                <a className="dropdown-toggle" role="button" id="dropdownMenuLink"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" href="#">
                                    <FaEllipsisV style={{ color: "#5a5c69" }} aria-hidden="true" /></a>
                                <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                </a>
                                <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                                    aria-labelledby="dropdownMenuLink">
                                    <a className="dropdown-item" href="#" onClick={() => setToggleOneModal(!toggleOneModal)}>Edit note</a>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div id="notes-div-id" className="chart-pie pb-3">
                                <h6>Plans for this week</h6>
                                <ul>
                                    <li style={{ color: "#b3b3b3" }}>Add some quality</li>
                                    <li style={{ color: "#b3b3b3" }}>Svg illustrations</li>
                                    <li style={{ color: "#b3b3b3" }}>Constantly updated collection</li>
                                    <li style={{ color: "#b3b3b3" }}>Lorem ipsum</li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4">
                        <div
                            className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <h6 className="m-0 font-weight-bold" style={{ color: "#F05F40" }}>All previous and current tasks comlepted by User</h6>
                        </div>
                        <div className="card-body">
                            <BarChart
                                id="barchart-id"
                                width={1200}
                                height={300}
                                data={data}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: -15,
                                    bottom: 5,
                                }}
                                barSize={20}
                                fontSize={10}
                            >
                                <XAxis dataKey="name" scale="point" padding={{ left: 50, right: 50 }} />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <CartesianGrid strokeDasharray="4 3" />
                                <Bar dataKey="Completed" fill="#8884d8" background={{ fill: '#eee' }} />
                            </BarChart>
                        </div>
                    </div>
                </div>


            </div>

            <div className="row">

                <div className="col-lg-6 mb-4">

                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold" style={{ color: "#F05F40" }}>Work progress of groups</h6>
                        </div>
                        <div id="groups-card-id" className="card-body">
                            <h4 className="small font-weight-bold">UX/UI creation <span
                                className="float-right">90%</span></h4>
                            <div className="progress mb-4">
                                <div className="progress-bar bg-danger" role="progressbar" style={{ width: "90%" }}
                                    aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            <h4 className="small font-weight-bold">Backend progress <span
                                className="float-right">40%</span></h4>
                            <div className="progress mb-4">
                                <div className="progress-bar bg-warning" role="progressbar" style={{ width: "40%" }}
                                    aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            <h4 className="small font-weight-bold">Code cleaning <span
                                className="float-right">60%</span></h4>
                            <div className="progress mb-4">
                                <div className="progress-bar" role="progressbar" style={{ width: "60%" }}
                                    aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            <h4 className="small font-weight-bold">Security check <span
                                className="float-right">20%</span></h4>
                            <div className="progress mb-4">
                                <div className="progress-bar bg-info" role="progressbar" style={{ width: "20%" }}
                                    aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            <h4 className="small font-weight-bold">Pages styling <span
                                className="float-right">40%</span></h4>
                            <div className="progress">
                                <div className="progress-bar bg-success" role="progressbar" style={{ width: "40%" }}
                                    aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                    </div>



                </div>

                <div className="col-lg-6 mb-4">

                    <div className="card shadow mb-4">
                        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <h6 className="m-0 font-weight-bold" style={{ color: "#F05F40" }}>Team info</h6>
                            <div className="dropdown no-arrow">
                                <a className="dropdown-toggle" role="button" id="dropdownMenuLink"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" href="#">
                                    <FaEllipsisV style={{ color: "#5a5c69" }} aria-hidden="true" /></a>
                                <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                </a>
                                <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                                    aria-labelledby="dropdownMenuLink">
                                    <a className="dropdown-item" href="#" onClick={() => setToggleTwoModal(!toggleTwoModal)}>Edit team info</a>
                                </div>
                            </div>
                        </div>
                        <div id="team-info-dashboard-id" className="card-body">
                            <div className="text-center">
                            </div>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap</p>
                        </div>
                    </div>

                    <div className="card shadow mb-4">
                        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <h6 className="m-0 font-weight-bold" style={{ color: "#F05F40" }}>What's next?</h6>
                            <div className="dropdown no-arrow">
                                <a className="dropdown-toggle" role="button" id="dropdownMenuLink"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" href="#">
                                    <FaEllipsisV style={{ color: "#5a5c69" }} aria-hidden="true" /></a>
                                <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                </a>
                                <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                                    aria-labelledby="dropdownMenuLink">
                                    <a className="dropdown-item" href="#" onClick={() => setToggleThirdModal(!toggleThirdModal)}>Edit text</a>
                                </div>
                            </div>
                        </div>
                        <div id="whats-next-dashboard-id" className="card-body">
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap</p>

                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Dashboard