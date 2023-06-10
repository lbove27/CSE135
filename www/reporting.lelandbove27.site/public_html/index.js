ZC.LICENSE = ["569d52cefae586f634c54f86dc99e6a9", "b55b025e438fa8a98e32482b5f768ff5"];

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

    let boxPlotConfig = {
      type: 'boxplot',
      backgroundColor: '#FFFFFF',
      title: {
        text: 'Page Load Times',
        backgroundColor: 'none',
        color: 'black',
        fontSize: 24,
        fontWeight: 'none',
        offsetY: '36%'
      },
      subtitle: {
        text: 'All load times with min/max, median, and 1st and 3rd quartiles',
        fontSize: 18,
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
          visible: true,
        },

      },
      tooltip: {
        text: '%data-value',
        shadow: false,
        borderRadius: 3,
        rules: [{
            rule: '%i == 0',
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
          fontSize: 14
        },
        guide: {
          visible: false
        }
      },
      
      scaleY: {
        offsetStart: 0,
        offsetEnd: 3,
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
        dataBox: [
          [minLoadTime, quarter1LoadTime, medianLoadTime, quarter3LoadTime, maxLoadTime]
        ]
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
    let other = 0;
    staticData.forEach(obj => {
      let userAgent = obj["User Agent"];
      let chromeBool = userAgent.includes('Chrome');
      let edgeBool = userAgent.includes('Edg');
      let firefoxBool = userAgent.includes('Fx') || userAgent.includes('Firefox');
      if(chromeBool && !firefoxBool && !edgeBool) {
        chrome++;
      }
      else if(firefoxBool) {
        firefox++;
      }
      else if(edgeBool) {
        edge++;
      }
      else {
        other++;
      }
    });
    let total = chrome + firefox + edge + other;
    let chromePercentage = (chrome / total) * 100;
    let firefoxPercentage = (firefox / total) * 100;
    let edgePercentage = (edge / total) * 100;
    let otherPercentage = (other / total) * 100;

    //pie chart configuration and rendering
  var pieConfig = {
  type: "pie",
  graph: {
    backgroundColor: 'black'
  },
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
        text: 'Pie Chart - Browser Usage',
        align: "left",
        offsetX: 10,
        fontFamily: "Crimson Text",
        fontSize: 40
      },
      plotarea: {
        margin: "30 30 30 30"
      },
      series: [{
          values: [edgePercentage],
          text: "Microsoft Edge",
          backgroundColor: '#0078d7',
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
          text: 'Other',
          values: [otherPercentage],
          backgroundColor: '#D3D3D3'
        }
      ]
    };

    zingchart.render({
      id: 'pieChart',
      data: pieConfig,
      height: '100%',
      width: '100%'
    });
  });
}


async function createAllMetrics() {
  setTimeout(async () => {
    await createUserVisits();
  }, 0);
  setTimeout(async () => {
    await createPieChart();
  }, 500);
  setTimeout(async () => {
    await createBoxPlot();
  }, 1000);
}
  

createAllMetrics();