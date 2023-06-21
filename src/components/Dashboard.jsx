import React, { PureComponent } from 'react'
import { FaLayerGroup, FaEllipsisV, FaComment, FaComments } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Dashboard() {

    const data = [
        {
          name: 'Janko',
          uv: 100,
          Completed: 3,
          amt: 100,
        },
        {
          name: 'Pavel',
          uv: 100,
          Completed: 5,
          amt: 100,
        },
        {
          name: 'Juraj',
          uv: 100,
          Completed: 1,
          amt: 100,
        },
      ];

  return (
    <div className="container-fluid">
                    <div className="row">

                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-left-primary shadow h-100 py-2" style={{borderLeft: ".25rem solid #F05F40"}}>
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                        <h6 className="m-0 font-weight-bold mb-3" style={{color: "#F05F40"}}>Total Users</h6>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800" style={{color: "#5a5c69"}}>3</div>
                                        </div>
                                        <div className="col-auto">
                                            <FaLayerGroup style={{color: "#DDDFEB"}}></FaLayerGroup>
                                            {/* <i className="fas fa-calendar fa-2x text-gray-300"></i> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-left-success shadow h-100 py-2" style={{borderLeft: ".25rem solid #1cc88a"}}>
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                        <h6 className="m-0 font-weight-bold text-success mb-3">Total Groups</h6>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800" style={{color: "#5a5c69"}}>2</div>
                                        </div>
                                        <div className="col-auto">
                                            <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-left-info shadow h-100 py-2" style={{borderLeft: ".25rem solid #36b9cc"}}>
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                        <h6 className="m-0 font-weight-bold text-info mb-3">Tasks</h6>
                                            <div className="row no-gutters align-items-center">
                                                <div className="col-auto">
                                                    <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800" style={{color: "#5a5c69"}}>50%</div>
                                                </div>
                                                <div className="col">
                                                    <div className="progress progress-sm mr-2">
                                                        <div className="progress-bar bg-info" role="progressbar"
                                                            style={{width: "50%", ariaValueNow: "50", ariaValueMin: "0"}}
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
                            <div className="card border-left-warning shadow h-100 py-2" style={{borderLeft: ".25rem solid #f6c23e"}}>
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                        <h6 className="m-0 font-weight-bold text-warning mb-3">Pending User Requests</h6>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800" style={{color: "#5a5c69"}}>2</div>
                                        </div>
                                        <div className="col-auto">
                                            <FaComment style={{color: "#DDDFEB"}}></FaComment>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">

                        <div className="col-xl-8 col-lg-7">
                            <div className="card shadow mb-4">
                                <div
                                    className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    <h6 className="m-0 font-weight-bold" style={{color: "#F05F40"}}>Tasks comlepted by User</h6>
                                    {/* <div className="dropdown no-arrow">
                                        <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                                            aria-labelledby="dropdownMenuLink">
                                            <a className="dropdown-item" href="#">Action</a>
                                            <a className="dropdown-item" href="#">Another action</a>
                                            <div className="dropdown-divider"></div>
                                            <a className="dropdown-item" href="#">Something else here</a>
                                        </div>
                                    </div> */}
                                </div>
                                <div className="card-body">
                                {/* <ResponsiveContainer width="100%" height="100%"> */}
                                <BarChart
                                    width={500}
                                    height={300}
                                    data={data}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                    barSize={20}
                                >
                                <XAxis dataKey="name" scale="point" padding={{ left: 50, right: 50 }} />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <CartesianGrid strokeDasharray="4 3" />
                                <Bar dataKey="Completed" fill="#8884d8" background={{ fill: '#eee' }} />
                                </BarChart>
                                {/* </ResponsiveContainer> */}
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-4 col-lg-5">
                            <div className="card shadow mb-4">
                                <div
                                    className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    <h6 className="m-0 font-weight-bold" style={{color: "#F05F40"}}>Notes</h6>
                                    <div className="dropdown no-arrow">
                                    <a className="dropdown-toggle" role="button" id="dropdownMenuLink"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" href="#">
                                                <FaEllipsisV style={{ color: "#5a5c69" }} aria-hidden="true" /></a>
                                        <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                                            aria-labelledby="dropdownMenuLink">
                                            <a className="dropdown-item" href="#">Fix note</a>
                                            <a className="dropdown-item" href="#">Remove note</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="chart-pie pb-3">
                                        <h6>Plans for this week</h6>
                                        <ul>
                                            <li style={{color: "#b3b3b3"}}>Add some quality</li>
                                            <li style={{color: "#b3b3b3"}}>Svg illustrations</li>
                                            <li style={{color: "#b3b3b3"}}>Constantly updated collection</li>
                                            <li style={{color: "#b3b3b3"}}>Lorem ipsum</li>
                                        </ul>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">

                        <div className="col-lg-6 mb-4">

                            <div className="card shadow mb-4">
                                <div className="card-header py-3">
                                    <h6 className="m-0 font-weight-bold" style={{color: "#F05F40"}}>Projects</h6>
                                </div>
                                <div className="card-body">
                                    <h4 className="small font-weight-bold">UX/UI creation <span
                                            className="float-right">90%</span></h4>
                                    <div className="progress mb-4">
                                        <div className="progress-bar bg-danger" role="progressbar" style={{width: "90%"}}
                                            aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <h4 className="small font-weight-bold">Backend progress <span
                                            className="float-right">40%</span></h4>
                                    <div className="progress mb-4">
                                        <div className="progress-bar bg-warning" role="progressbar" style={{width: "40%"}}
                                            aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <h4 className="small font-weight-bold">Code cleaning <span
                                            className="float-right">60%</span></h4>
                                    <div className="progress mb-4">
                                        <div className="progress-bar" role="progressbar" style={{width: "60%"}}
                                            aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <h4 className="small font-weight-bold">Security check <span
                                            className="float-right">20%</span></h4>
                                    <div className="progress mb-4">
                                        <div className="progress-bar bg-info" role="progressbar" style={{width: "20%"}}
                                            aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <h4 className="small font-weight-bold">Pages styling <span
                                            className="float-right">40%</span></h4>
                                    <div className="progress">
                                        <div className="progress-bar bg-success" role="progressbar" style={{width: "40%"}}
                                            aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </div>

                           

                        </div>

                        <div className="col-lg-6 mb-4">

                            <div className="card shadow mb-4">
                                <div className="card-header py-3">
                                    <h6 className="m-0 font-weight-bold" style={{color: "#F05F40"}}>Team info</h6>
                                </div>
                                <div className="card-body">
                                    <div className="text-center">
                                    </div>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap</p>
                                </div>
                            </div>

                            <div className="card shadow mb-4">
                                <div className="card-header py-3">
                                    <h6 className="m-0 font-weight-bold" style={{color: "#F05F40"}}>What's next?</h6>
                                </div>
                                <div className="card-body">
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap</p>
                                    
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
  )
}

export default Dashboard