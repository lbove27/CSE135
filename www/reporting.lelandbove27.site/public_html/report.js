ZC.LICENSE = ["569d52cefae586f634c54f86dc99e6a9", "b55b025e438fa8a98e32482b5f768ff5"];

async function createBarChart() {
    await fetch("https://lelandbove27.site/api/activity/getType/error", {
      method: "GET"
    }).then(response => response.json()).then(data => {
      let activityData = data;
      fetch("https://lelandbove27.site/api/static", {
        method: "GET"
      }).then(response2 => response2.json()).then(data2 => {
        let staticData = data2;
        
        let httpChrome = 0;
        let generalChrome = 0;
        let httpFirefox = 0;
        let generalFirefox = 0;
        let httpEdge = 0;
        let generalEdge = 0;
        let httpSafari = 0;
        let generalSafari = 0;
        let httpOther = 0;
        let generalOther = 0;


        let staticDataSet = [];
        staticData.forEach(obj => {
            staticDataSet.push(obj['Session Id']);
        });
        staticDataSet.forEach(static => {
          activityData.forEach(activity => {
            if(activity['sessionId'] == static['sessionId']) {
                let userAgent = obj["User Agent"];
                let chromeBool = userAgent.includes('Chrome');
                let edgeBool = userAgent.includes('Edg');
                let firefoxBool = userAgent.includes('Fx') || userAgent.includes('Firefox');
                let safariBool = userAgent.includes('Safari') && !userAgent.includes('Chrome');
                if(edgeBool) {
                    if(activity['errorType'] == 'general') {
                        generalEdge++;
                    }
                    else {
                    httpEdge++;
                    }
                }
              else if(firefoxBool) {
                if(activity['errorType'] == 'general') {
                  generalFirefox++;
                }
                else {
                  httpFirefox++;
                }
              }
              else if(chromeBool && !edgeBool) {
                if(activity['errorType'] == 'general') {
                  generalChrome++;
                }
                else {
                  httpChrome++;
                }
              }
              else if(!chromeBool && safariBool) {
                if(activity['errorType'] == 'general') {
                  generalSafari++;
                }
                else {
                  httpSafari++;
                }
              }
              else {
                if(activity['errorType'] == 'general') {
                  generalOther++;
                }
                else {
                  httpOther++;
                }
              }
            }
            else {}
          });
        });

        let totalErrorsArray = {httpChrome, generalChrome, httpFirefox, generalFirefox, httpEdge, generalEdge, httpSafari, generalSafari, httpOther, generalOther};
        let totalErrors = 0;
        totalErrorsArray.forEach(num => {
            totalErrors += num;
        });
        let maxErrors = 1.25 * math.max(...totalErrorsArray);

        //bar chart configuration and rendering
        var barConfig = {
          "graphset": [{
            "type": "bar",
            "background-color": "white",
            "title": {
              "text": "Number of Errors Based on Browser",
              "font-color": "#000000",
              "backgroundColor": "white",
              "font-size": "35px",
              "alpha": 1,
              "adjust-layout": true,
              "font-family": "Crimson Text"
            },
            "plotarea": {
              "margin": "dynamic"
            },
            
            "legend": {
              "shadow": false,
              "align": "center",
              "adjust-layout": true,
              "marker": {
                "type": "square",
                "border-color": "none",
                "size": "12px"
            },
              "border-width": 0,
              "maxItems": 3,
              "toggle-action": "hide",
              "pageOn": {
                "backgroundColor": "#000",
                "size": "10px",
                "alpha": 0.8
              },
              "pageOff": {
                "backgroundColor": "#7E7E7E",
                "size": "10px",
                "alpha": 0.65
              },
              "pageStatus": {
                "color": "black"
              }
            },
            "plot": {
              "bars-space-left": 0.1,
              "bars-space-right": 0.1,
              "animation": {
                "effect": "ANIMATION_SLIDE_BOTTOM",
                "sequence": 4,
                "speed": 2000,
                "delay": 0
              }
            },
            "scale-y": {
              "line-color": "#7E7E7E",
              "item": {
                "font-color": "#7e7e7e"
              },
              "values": "0:" + maxErrors + ":2",
              "guide": {
                "visible": true
              },
              "label": {
                "text": "# of Errors",
                "font-family": "Crimson Text",
                "bold": true,
                "font-size": "14px",
                "font-color": "#7E7E7E",
              },
            },
            "scaleX": {
              "values": [
                "General Errors",
                "HTTP Errors"
              ],
              "placement": "default",
              "tick": {
                "size": 55,
                "placement": "cross"
              },
              "itemsOverlap": true,
              "item": {
                "offsetY": -55
              }
            },
            "tooltip": {
              "visible": false
            },
            "series": [{
                "values": [
                  generalChrome, 
                  httpChrome
                ],
                "alpha": 0.95,
                "borderRadiusTopLeft": 7,
                "background-color": "#FFCB45",
                "text": "Chrome",
              },
              {
                "values": [
                  generalFirefox,
                  httpFirefox,
                ],
                "borderRadiusTopLeft": 7,
                "alpha": 0.95,
                "background-color": "#FF4500",
                "text": "Firefox"
              },
              {
                "values": [
                  generalEdge,
                  httpEdge,
                ],
                "alpha": 0.95,
                "borderRadiusTopLeft": 7,
                "background-color": "#00FF7F",
                "text": "Microsoft Edge"
              },
            ]
          }]
        };
    
        zingchart.render({
          id: 'barChart',
          data: barConfig,
          height: '100%',
          width: '100%'
        });
      });
      
    });

  }


  async function createAllMetrics() {
    setTimeout(async () => {
      await createBarChart();
    }, 1000);
    setTimeout(async () => {
     
    }, 1500);
    setTimeout(async () => {
      
    }, 2000);
  }
    
  
  createAllMetrics();