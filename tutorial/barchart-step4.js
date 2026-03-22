// Chart size
var width = 700;
var height = 400;

// Margins
var margin = { top: 20, right: 20, bottom: 60, left: 60 };

var innerWidth = width - margin.left - margin.right;
var innerHeight = height - margin.top - margin.bottom;

// Create SVG
var svg = d3.select("#chart")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// Border for user visibility
svg.style("border", "1px solid black");

// Create chart group
var chartGroup = svg.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Load the CSV file
d3.csv("fruit.csv").then(function (data) {

  // Convert value to number
  data.forEach(function (d) {
    d.value = +d.value;
  });

  // Create x scale
  var xScale = d3.scaleBand()
    .domain(data.map(function (d) {
      return d.category;
    }))
    .range([0, innerWidth])
    .padding(0.2);

  // Create y scale
  var yScale = d3.scaleLinear()
    .domain([0, d3.max(data, function (d) {
      return d.value;
    })])
    .range([innerHeight, 0]);

  // Add x-axis
  chartGroup.append("g")
    .attr("transform", "translate(0," + innerHeight + ")")
    .call(d3.axisBottom(xScale));

  // Add y-axis
  chartGroup.append("g")
    .call(d3.axisLeft(yScale));

});