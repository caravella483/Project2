// Define SVG area dimensions
var svgWidth = 600;
var svgHeight = 600;

// Define the chart's margins as an object
var chartMargin = {
  top: 60,
  right: 00,
  bottom: 30,
  left: 300
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3.select("body")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and to the bottom
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Load data 
d3.csv("legalstatus_level.csv").then(function(legalData) {

  console.log(legalData);

  // Cast the hours value to a number for each piece of tvData
  legalData.forEach(function(d) {
    d.OverdosePercent = +d.OverdosePercent;
  });

  // Configure a band scale for the horizontal axis with a padding of 0.1 (10%)
  var xBandScale = d3.scaleBand()
    .domain(legalData.map(d => d.legalWeedStatus))
    .range([0, chartWidth])
    // .paddingInner(1)
    .padding(0.5)
    .paddingOuter(.5);

    var bandWidth = xBandScale.bandwidth()
    var range = xBandScale.range()
console.log(range)
console.log(legalData.length)
console.log(bandWidth, legalData.length, legalData.length*bandWidth)

  // Create a linear scale for the vertical axis.
  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(legalData, d => d.OverdosePercent)])
    .range([chartHeight, 0]);

  // Create two new functions passing our scales in as arguments
  // These will be used to create the chart's axes
  var bottomAxis = d3.axisBottom(xBandScale);
  var leftAxis = d3.axisLeft(yLinearScale).ticks(10);

  // Append two SVG group elements to the chartGroup area,
  // and create the bottom and left axes inside of them
  chartGroup.append("g")
    .call(leftAxis);

  chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);

  // Create one SVG rectangle per piece of tvData
  // Use the linear and band scales to position each rectangle within the chart
  chartGroup.selectAll(".bar")
    .data(legalData)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", d => xBandScale(d.legalWeedStatus))
    .attr("y", d => yLinearScale(d.OverdosePercent))
    .attr("width", xBandScale.bandwidth())
    .attr("height", d => chartHeight - yLinearScale(d.OverdosePercent));

}).catch(function(error) {
  console.log(error);
});
