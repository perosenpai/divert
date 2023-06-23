import React, { PureComponent, useEffect, useState } from 'react'
import { FaLayerGroup, FaEllipsisV, FaComment, FaComments } from "react-icons/fa";
import { getDashboard, getGroups, getTasks, updateNote, updateTeamInfo, updateWhatsNext } from '../utils/APIRoutes'
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

function Dashboard_User() {

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

            tasks.data.forEach(task => {

                if (task.task.status == 2) {
                    complete = complete + 1;
                }
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


        }

        loadData()



    }, [])

    return (

        <div id="dashboard-main-id" className="container-fluid">

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

               <div className="col-xl-4 col-lg-5 ">
                    <div className="card shadow mb-4">
                        <div
                            className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <h6 className="m-0 font-weight-bold" style={{ color: "#F05F40" }}>Notes by Admin</h6>
                            
                        </div>
                        <div className="card-body">
                            <div id="notes-div-id" className="chart-pie pb-3" style={{minHeight: "190px"}}>
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

                <div className="col-lg-6 mb-4">

                    <div className="card shadow mb-4">
                        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <h6 className="m-0 font-weight-bold" style={{ color: "#F05F40" }}>Team info</h6>
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

export default Dashboard_User