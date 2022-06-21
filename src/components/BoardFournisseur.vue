<template>


                
                <div class="row ">
                    <div class="col-md-3">

<div class="card" style="margin:1vw;max-height: 20vw;max-width: 20vw;">
        <Chart  style="margin:1vw;max-height:99%;max-width: 99%;" type="pie" :data="chartData" :options="lightOptions" />
    </div>
    </div>

                    <div class="col-md-3">


<div class="card" style="margin:1vw;max-height: 20vw;max-width: 20vw;">



                          <div>
        <Chart style="margin:1vw;max-height: 99%;max-width: 99%;" type="doughnut" :data="chartData" :options="lightOptions" />
    </div>
        
    </div>
    </div>

                      <div class="col-md-6">

<div class="card" style="margin:1vw;max-height: 20vw;max-width: 40vw;">
       <Chart style="margin:1vw;max-height: 99%;max-width: 99%;" type="bar" :data="multiAxisData" :options="multiAxisOptions "/>
    </div>
    </div>
    </div>

                   <div class="row">
                    <div class="col-md-6">

<div class="card" style="margin:1vw;max-height: 20vw;max-width: 40vw;">
       <Chart style="margin:1vw;max-height: 99%;max-width: 99%;" type="bar" :data="chartData" :options="chartOptions" />
    </div>
    </div>
                 <div class="col-md-6">

<div class="card" style="margin:1vw;max-height: 20vw;max-width: 30vw;">

<Chart style="margin:1vw;max-height: 99%;max-width: 60%;" type="polarArea" :data="chartData" :options="chartOptions" />
    </div>
    </div>

      
    </div>

   
</template>

<script>
import Chart from 'primevue/chart';
import Card from 'primevue/card';

export default {
      components: {
   Chart,
   Card
  },
 data() {
        return {
             chartData: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [{
                    type: 'line',
                    label: 'Dataset 1',
                    borderColor: '#42A5F5',
                    borderWidth: 2,
                    fill: false,
                    data: [50,25,12,48,56,76,42]
                }, {
                    type: 'bar',
                    label: 'Dataset 2',
                    backgroundColor: '#66BB6A',
                    data: [21,84,24,75,37,65,34],
                    borderColor: 'white',
                    borderWidth: 2
                }, {
                    type: 'bar',
                    label: 'Dataset 3',
                    backgroundColor: '#FFA726',
                    data: [41,52,24,74,23,21,32]
                }]
            },
            chartOptions: {
                plugins: {
                    legend: {
                        labels: {
                            color: '#495057'
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: '#495057'
                        },
                        grid: {
                            color: '#ebedef'
                        }
                    },
                    y: {
                        ticks: {
                            color: '#495057'
                        },
                        grid: {
                            color: '#ebedef'
                        }
                    }
                }
            },
            chartData: {
                labels: ['A','B','C'],
                datasets: [
                    {
                        data: [300, 50, 100],
                        backgroundColor: ["#42A5F5","#66BB6A","#FFA726"],
                        hoverBackgroundColor: ["#64B5F6","#81C784","#FFB74D"]
                    }
                ]
            },
             multiAxisData: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [{
                    label: 'Dataset 1',
                    backgroundColor: ['#EC407A','#AB47BC','#42A5F5','#7E57C2','#66BB6A','#FFCA28','#26A69A'],
                    yAxisID: 'y-axis-1',
                    data: [65, 59, 80, 81, 56, 55, 10]
                }, {
                    label: 'Dataset 2',
                    backgroundColor: '#78909C',
                    yAxisID: 'y-axis-2',
                    data: [28, 48, 40, 19, 86, 27, 90]
                }]
            },
            lightOptions: {
                plugins: {
                    legend: {
                        labels: {
                            color: '#495057'
                        }
                    }
                }
            },


            multiAxisOptions: {
                plugins: {
                    legend: {
                        labels: {
                            color: '#495057'
                        }
                    },
                    tooltips: {
                        mode: 'index',
                        intersect: true
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: '#495057'
                        },
                        grid: {
                            color: '#ebedef'
                        }
                    },
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        ticks: {
                            min: 0,
                            max: 100,
                            color: '#495057'
                        },
                        grid: {
                            color: '#ebedef'
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        grid: {
                            drawOnChartArea: false,
                            color: '#ebedef'
                        },
                        ticks: {
                            min: 0,
                            max: 100,
                            color: '#495057'
                        }
                    }
                }
            },
        }
    },
}



</script>
