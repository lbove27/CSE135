ZC.LICENSE = ["569d52cefae586f634c54f86dc99e6a9", "b55b025e438fa8a98e32482b5f768ff5"];

let report = document.getElementById('report-link');
report.href = "https://reporting.lelandbove27.site/user/report";

fetch("/user/adminAccess/" + sessionStorage.getItem('auth_token'), {
  method: "GET"
}).then(response => response.json()).then(data => {
  if(data.adminBool == 'true') {
    let nav = document.getElementById('navbar');
    let link = document.createElement('a');
    link.innerHTML = "User Grid";
    link.href = "https://reporting.lelandbove27.site/user/users/" + sessionStorage.getItem('auth_token'); 
    nav.appendChild(link);
  }
});

async function createBounceRate() {
  await fetch("https://lelandbove27.site/api/activity/getType/unload", {
    method: "GET"
  }).then(response => response.json()).then(data => {
    let totalCount = 0;
    let bounceCount = 0;
    data.forEach(obj => {
      if(obj["totalTimeSpent"] < 10) {
        bounceCount++;
      }
      totalCount++;
      let bounceDisplay = document.getElementById('bounce-rate');
      bounceDisplay.innerHTML = ((bounceCount / totalCount) * 100) + "%";
    });
  });
}

async function createUserVisits() {
  let userVisitsLocation = document.getElementById('user-visits');
  let sessionIdSet = new Set();
  await fetch("https://lelandbove27.site/api/static", {
    method: "GET"
    }).then(response => response.json()).then(data => {
      let staticData = data;
      staticData.forEach(obj => {
        sessionIdSet.add(obj["sessionId"]);
      });
    });

    userVisitsLocation.innerHTML = sessionIdSet.size;

} 


 //Create the load times box plot
async function createBoxPlot() {
    let loadTimes = [];
    await fetch("https://lelandbove27.site/api/static", {
    method: "GET"
    }).then(response => response.json()).then(data => {
      let staticData = data;
      staticData.forEach(obj => {
        if(obj["Total Load Time"] < 3) {
          loadTimes.push(obj["Total Load Time"]);
        }
      });
    });

    let sortedTimes = loadTimes.sort();

    let medianLoadTime = sortedTimes[Math.floor(sortedTimes.length / 2)];
    let minLoadTime = sortedTimes[0];
    let maxLoadTime = sortedTimes[sortedTimes.length - 1];
    let quarter1LoadTime = sortedTimes[Math.floor(sortedTimes.length / 4)];
    let quarter3LoadTime = sortedTimes[3 * Math.floor(sortedTimes.length / 4)];

    let expectedTime = document.getElementById('expected-time');
    expectedTime.innerHTML = medianLoadTime.toFixed(2) + " seconds";

    let boxPlotConfig = {
      type: 'boxplot',
      backgroundColor: '#FFFFFF',
      title: {
        text: 'Average Overall Page Load Times',
        backgroundColor: 'none',
        color: 'black',
        fontSize: 30,
        fontWeight: 'none',
        fontFamily: "Crimson Text",
        offsetY: '36%'
      },
      subtitle: {
        text: 'All load times with min/max, median, and 1st and 3rd quartiles',
        fontSize: 24,
        fontFamily: "Crimson Text",
        color: 'black',
        fontWeight: 'none'
      },
      plotarea: {
        marginTop: '20%',
        marginLeft: '25%',
        marginRight: '12%'
      },
      plot: {
        barWidth: 70,
        hoverState: {
          visible: false,
        },

      },
      style: {
        'padding': '0',
        'margin': '0',
      },
      width: "100%",
      height: "100%",
      tooltip: {
        shadow: false,
        text: "Min: " + minLoadTime + "\nMax: "  + maxLoadTime + "\nMedian: " + medianLoadTime + "\nQ1: " + quarter1LoadTime + "\nQ3: "  + quarter3LoadTime + "\n",
        fontFamily: "Crimson Text",
        fontSize: '20',
        borderRadius: 3,
        rules: [{
            backgroundColor: '#9A8AAD'
          },
        ]
      },
      
      scaleX: {
        offsetStart: 40,
        offsetEnd: 40,
        lineColor: '#FFFFFF',
        labels: [''],
        tick: {
          visible: false
        },
        item: {
          fontSize: '30px'
        },
        guide: {
          visible: false
        }
      },
      
      scaleY: {
        offsetStart: 0,
        offsetEnd: 3,
        fontFamily: "Crimson Text",
        values: '0:3:0.3',
        format: '%v seconds',
        lineColor: '#7F7F7F',
        tick: {
          lineColor: '#7F7F7F'
        },
        guide: {
          visible: true
        }
      },
      options: {
        box: {
          borderColor: '#204A7B',
          borderWidth: 2,
 
          rules: [{
              rule: '%i == 0',
              backgroundColor: '#9A8AAD'
            },
            {
              rule: '%i == 1',
              backgroundColor: '#AABD82'
            }
          ],
        },
        lineMedianLevel: {
          lineColor: '#FC0B1A',
          lineWidth: 2
        },
        lineMinLevel: {
          lineColor: '#204A7B',
          lineWidth: 2
        },
        lineMinConnector: {
          lineColor: '#204A7B',
          lineWidth: 2
        },
        lineMaxLevel: {
          lineColor: '#204A7B',
          lineWidth: 2
        },
        lineMaxConnector: {
          lineColor: '#204A7B',
          lineWidth: 2
        }
      },
      series: [{
        dataBox: [[minLoadTime, quarter1LoadTime, medianLoadTime, quarter3LoadTime, maxLoadTime]]
      }]
    };
 
    zingchart.render({
      id: 'boxPlotChart',
      data: boxPlotConfig,
      width: '100%',
    });
}

//Create the pie chart
async function createPieChart() {
  await fetch("https://lelandbove27.site/api/static", {
    method: "GET"
  }).then(response => response.json()).then(data => {
    let staticData = data;
    
    let chrome = 0;
    let firefox = 0;
    let edge = 0;
    let safari = 0;
    let other = 0;
    staticData.forEach(obj => {
      let userAgent = obj["User Agent"];
      let chromeBool = userAgent.includes('Chrome');
      let edgeBool = userAgent.includes('Edg');
      let firefoxBool = userAgent.includes('Fx') || userAgent.includes('Firefox');
      let safariBool = userAgent.includes('Safari') && !userAgent.includes('Chrome');
      if(chromeBool && !firefoxBool && !edgeBool) {
        chrome++;
      }
      else if(firefoxBool) {
        firefox++;
      }
      else if(edgeBool) {
        edge++;
      }
      else if(safariBool) {
        safari++;
      }
      else {
        other++;
      }
    });
    let total = chrome + firefox + edge + other;
    let chromePercentage = (chrome / total) * 100;
    let firefoxPercentage = (firefox / total) * 100;
    let edgePercentage = (edge / total) * 100;
    let safariPercentage = (safari / total) * 100;
    let otherPercentage = (other / total) * 100;

    //pie chart configuration and rendering
  var pieConfig = {
  type: "pie",
  graph: {
    backgroundColor: 'black'
  },
  style: {
    'padding': '0',
    'margin': '0',
  },
  width: "75%",
  height: "75%",
  plot: {
      borderColor: "#000000",
      borderWidth: 5,
      slice: 0,
      valueBox: {
      placement: 'out',
      text: '%t\n%npv%',
      fontFamily: "Crimson Text"
        },
        tooltip: {
          fontSize: '18',
          fontFamily: "Crimson Text",
          padding: "5 10",
          text: "%npv%"
        },
        animation: {
          effect: 5,
          method: 8,
          speed: 900,
          sequence: 1,
        }
      },
      legend: {
        visible: true,
        toggleAction: 'hide'
      },
      title: {
        fontColor: "#000000",
        text: 'Browser Usage',
        align: "left",
        offsetX: 10,
        fontFamily: "Crimson Text",
        fontSize: 30
      },
      plotarea: {
        margin: 'dynamic'
      },
      series: [{
          values: [edgePercentage],
          text: "Microsoft Edge",
          backgroundColor: '#55d555',
        },
        {
          values: [chromePercentage],
          text: "Chrome",
          backgroundColor: '#FDD20A',
        },
        {
          values: [firefoxPercentage],
          text: 'Firefox',
          backgroundColor: '#E66000',
        },
        {
          values: [safariPercentage],
          text: 'Safari',
          backgroundColor: '#006CFF',
        },
        {
          text: 'Other',
          values: [otherPercentage],
          backgroundColor: '#D3D3D3'
        }
      ]
    };

    zingchart.render({
      id: 'pieChart',
      data: pieConfig,
    });
  });
}


async function createAllMetrics() {
  setTimeout(async () => {
    await createUserVisits();
  }, 0);
  setTimeout(async () => {
    await createBounceRate();
  }, 0);
  setTimeout(async () => {
    await createPieChart();
  }, 0);
  setTimeout(async () => {
    await createBoxPlot();
  }, 0);
}
  

createAllMetrics();