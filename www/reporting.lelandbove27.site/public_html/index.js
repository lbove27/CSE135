ZC.LICENSE = ["569d52cefae586f634c54f86dc99e6a9", "b55b025e438fa8a98e32482b5f768ff5"];

async function createUserVisits() {
  let userVisitsLocation = document.getElementById('user-visits');



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
  ZC.LICENSE = ["569d52cefae586f634c54f86dc99e6a9", "b55b025e438fa8a98e32482b5f768ff5"];
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
        fontColor: "#8e99a9",
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
    await createPieChart();
  }, 0);
}

createAllMetrics();