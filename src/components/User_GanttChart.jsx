import React, {useEffect} from 'react'
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import {FaCheckCircle} from 'react-icons/fa'
import {getTasks, getGropTasks} from '../utils/APIRoutes';
import axios from 'axios';

const url = window.location.search;
const urlParams = new URLSearchParams(url);
let teamId = urlParams.get("teamId")
let groupId = urlParams.get('groupId')


function User_GanttChart() {
    
    useEffect(() => {
        const loadData = async () => {
            let groupTasks = await axios.put(getGropTasks, {groupId});
            const colros = ['rgba(240,95, 64, 1)', 'rgba(98,98, 100, 1)', 'rgba(11, 102, 35, 1)',]
            const taskStatus = ['Delayed', 'Pending', 'Done']
            const data = {
                datasets: [{
                  data: [
                    // {x: ["2023-05-16", "2023-05-21"], y: "qwe@qwe.com", name: "qwe@qwe.com", status: 2, subtasks: [{x: ["2023-05-16", "2023-05-18"], y: "qwe@qwe.com", name: "qwe@qwe.com", status: 2,}]},
                    // {x: ["2023-05-18", "2023-05-25"], y: "Ni 2", name: "Ni", status: 2},
                    // {x: ["2023-04-18", "2023-04-29"], y: "Co", name: "Co", status: 1},
                    // {x: ["2023-04-19", "2023-04-28"], y: "Ze", name: "Ze", status: 0},
                    // {x: ["2023-04-21", "2023-04-30"], y: "TKaoAsi", name: "KaoAsi", status: 2}
                ],
                  backgroundColor: (ctx) =>{
                    return colros[ctx.raw?.status]
                  },
                  borderColor: (ctx) => {
                    return colros[ctx.raw?.status]
                  },
                  borderWidth: 1,
                  borderSkipped: false,
                  borderRadius: 10,
                  barPercentage: 0.5
                }]
              };

              if(!groupTasks.data.length == 0){
                groupTasks.data.forEach(task =>{
                    data.datasets[0].data.push({
                        x: [`${task.groupTask.startDate}`, `${task.groupTask.dueDate}`],
                        y: task.groupTask.name,
                        name: task.groupTask.userEmail,
                        status: task.groupTask.status
                    })
                })
               }
               
              const status = {
                id: 'status',
                afterDatasetsDraw(chart, args, pluginOptions){
                    const {ctx, data, chartArea: {top, bottom, right, left}, scales: {x,y}} = chart;

                    const icons = ['\uf00d','\uf110','\uf00c']
                    

                    const angle = Math.PI / 180;

                    ctx.font ="bold 12px FontAwesome";
                    
                    ctx.textBaseline = 'middle';
                    ctx.textAlign = 'center';
                    data.datasets[0].data.forEach((data, index) =>{
                        ctx.beginPath();
                        ctx.fillStyle = colros[data.status];
                        ctx.arc(right + 50, y.getPixelForValue(index), 12, 0, angle * 360, false)
                        ctx.closePath();
                        ctx.fill();
                        ctx.fillStyle = 'white';
                        ctx.fillText(icons[data.status], right + 50, y.getPixelForValue(index))
                    })

                }
              }

              // config 
              const config = {
                type: 'bar',
                data,
                options: {
                    layout: {
                        padding: {
                            right: 100
                        }
                    },
                indexAxis: "y",
                  scales: {
                    x: {
                        position: "top",
                      type: 'time',
                      time:{
                        // unit: 'day',
                        displayFormats: {
                            day: 'd'
                        }
                      },
                      min: '2023-05-01',
                      max: '2023-05-31'
                    }
                  },
                  plugins: {
                    legend: {
                        display: false
                    },
                    tooltip:{
                        displayColors: false,
                        callbacks: {
                            label: (ctx) =>{
                                return '';
                            },
                            title: (ctx) =>{
                                const startDate = new Date(ctx[0].raw.x[0])
                                const endDate = new Date(ctx[0].raw.x[1])
                                const formattedStartDate = startDate.toLocaleDateString([], {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                    hour12: true
                                });
                                const formattedEndDate = endDate.toLocaleDateString([], {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                    hour12: true
                                });
                                return [ctx[0].raw.name, `Task deadline: ${formattedStartDate} - ${formattedEndDate}`, `Status: ${taskStatus[ctx[0].raw.status]}`]
                            }
                        }
                    }
                  }
                },
                plugins: [status]
              };
            
              // render init block
              const myChart = new Chart(
                document.getElementById('myChart'),
                config
              );

              document.querySelector('#myChart').nextElementSibling.addEventListener('change', (e) =>{
                const year = e.target.value.substring(0, 4)
                const month = e.target.value.substring(5,7)
                
                const lastDay = (y,m) =>{
                    return new Date(y, m , 0).getDate();
                }
        
                const startDate = `${year}-${month}-01`
                const endDate = `${year}-${month}-${lastDay(year,month)}`

                myChart.config.options.scales.x.min = startDate
                myChart.config.options.scales.x.max = endDate
                myChart.update();
              })
        };
        loadData();
    }, [])

    

  return (
    <>
    <div className="chartCard" style={{textAlign: "-webkit-center"}}>
      <div className="chartBox">
        <canvas id="myChart"></canvas>
        <input type='month'></input>
      </div>
    </div>
    </>
  )
}

export default User_GanttChart