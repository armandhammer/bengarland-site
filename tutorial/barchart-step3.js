// Chart size
var width = 700;
var height = 400;

// Margins
var margin = {
  top: 20,
  right: 20,
  bottom: 60,
  left: 60
};

var innerWidth = width - margin.left - margin.right;
var innerHeight = height - margin.top - margin.bottom;

// Create SVG
var svg = d3.select("#chart")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// Optional border (keep it for visibility)
svg.style("border", "1px solid black");

// Create chart group (this shifts everything by margins)
var chartGroup = svg.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Load data
d3.csv("fruit.csv").then(function (data) {

  // Convert to numbers
  data.forEach(function (d) {
    d.value = +d.value;
  });

  // Create x scale (categories)
  var xScale = d3.scaleBand()
    .domain(data.map(function (d) { return d.category; }))
    .range([0, innerWidth])
    .padding(0.2);

  // Create y scale (values)
  var yScale = d3.scaleLinear()
    .domain([0, d3.max(data, function (d) { return d.value; })])
    .range([innerHeight, 0]);

  // Log scales for verification
  console.log(xScale.domain());
  console.log(yScale.domain());

});