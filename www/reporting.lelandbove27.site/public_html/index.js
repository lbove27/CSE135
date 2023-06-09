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
      if(obj["User Agent"] == "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36") {
        chrome++;
      }
      else if(obj["User Agent"] == "Mozilla/5.0 (iPhone; CPU iPhone OS 16_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/113.2  Mobile/15E148 Safari/605.1.15") {
        firefox++;
      }
      else if(obj["User Agent"] == "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 Edg/113.0.1774.50") {
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
          backgroundColor: '#00FF7F',
        },
        {
          values: [chromePercentage],
          text: "Chrome",
          backgroundColor: '#FFCB45',
        },
        {
          values: [firefoxPercentage],
          text: 'Firefox',
          backgroundColor: '#FF4500',
        },
        {
          text: 'Other',
          values: [otherPercentage],
          backgroundColor: '#6FB07F'
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