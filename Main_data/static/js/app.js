/***********************************************/
function optionChanged(newSample) {
    console.log(`Entering ${arguments.callee.name} [ ${newSample}]`)
    // Fetch new data each time a new sample is selected
    createBarchart(newSample)
    createBubbleChart(newSample);
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
    // bonus only
    
}
/***********************************************/
function createBubbleChart(sample) {
    // write code to create the BubbleChart
    console.log(`Entering ${arguments.callee.name} [ ${sample}]`)
    d3.json("samples.json").then((data)=>{
        var samples = data.samples;
        var results = samples.filter(sampleobject=>sampleobject.id==sample);
        var result = results[0];
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;
        var layout = {
            title: "Trend on Overdose"

        };
        var data = [
            {
                x:otu_ids,
                y:sample_values,
                text: otu_labels,
                mode: "markers",
                marker: {
                    size: sample_values,
                    color: otu_ids,
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
        // orientation: 'h', 
        
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