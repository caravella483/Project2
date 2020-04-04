/***********************************************/
function optionChanged(newSample) {
    console.log(`Entering ${arguments.callee.name} [ ${newSample}]`)
    // Fetch new data each time a new sample is selected
    createBarchart(newSample)
    // createBubbleChart(newSample);
    buildMetadata(newSample);
}
/***********************************************/
function buildMetadata(sample) {
    // write code to create the buildMetadata
    console.log(`Entering ${arguments.callee.name} [ ${sample}]`)
    d3.json("samples.json").then((data)=>{
        var metadata = data.metadata;
        var results = metadata.filter(sampleobject=>sampleobject.id==sample);
        var result = results[0];
        var panel = d3.select("#sample-metadata");
        panel.html("");
        Object.entries(result).forEach(([key,value])=>{
            panel.append("h6").text(`${key.toUpperCase()}: ${value}`);
            
        });
            buildGauge(result.OverdosePercent);
    
    });

    
}
/***********************************************/
function createBubbleChart(sample) {
    // write code to create the BubbleChart
    console.log(`Entering ${arguments.callee.name} [ ${sample}]`)
    d3.json("samples.json").then((data)=>{
        var samples = data.samples;
        var results = samples.filter(sampleobject=>sampleobject.id==sample);
        var result = results[0];
        var year = result.year;
        var legal_status = result.legalWeedStatus;
        var overdose = result.overdose;
        var layout = {
            title: "Trend on Motor Vehicle Accident"

        };
        
        var data = [
            {
                x:overdose,
                y:year,
                text: overdose,
                mode: "markers",
                marker: {
                    size: overdose,
                    color: year,
                    colorscale: "Earth"
                }
                
            }
        ];
        Plotly.newPlot("bubble", data, layout);
    });
}
/***********************************************/
/***********************************************/
function createBarchart(sample) {
    // write code to create barchart
    console.log(`Entering ${arguments.callee.name} [ ${sample}]`)
    d3.json("samples.json").then((data)=>{
        var datasamples = data.samples;
        var results = datasamples.filter(sampleobject=>sampleobject.id==sample);
        var result = results[0];
        var year = result.year;
        var legal_status = result.legalWeedStatus;
        var overdose = result.overdose;
    var trace1 = {
        type: 'bar',
        x: year,
        y: overdose,
        text: year,
        
        marker: {
            color: '#38761D',
            line: {
                width: 2.5}
        }
      };
      
      var data = [ trace1 ];
      
      var layout = { 
        title: 'Yearly_OD_deaths',
        margin: { t: 30, l: 150 },
        font: {size: 12},
        color: "green"
      };
      
      var config = {responsive: true}
      
      Plotly.newPlot('bar', data, layout, config );
});
}
/***********************************************/
function fillDropDown() {
    // write code to pupulate the dropdown
    console.log(`Entering ${arguments.callee.name}`)
    var dropdown = d3.select("#selDataset");
    d3.json("samples.json").then((data)=>{
      var samplenames = data.names;
      samplenames.forEach((sample)=>{
          dropdown
          .append("option")
          .text(sample)
          .property("value",sample)
          var firstsample = samplenames[0];
          buildMetadata(firstsample);
          createBubbleChart(firstsample);
          createBarchart(firstsample)
    });

});

  
}
/***********************************************/

fillDropDown()