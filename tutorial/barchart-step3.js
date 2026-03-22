// Chart size
var width = 700;
var height = 400;

// Create SVG
var svg = d3.select("#chart")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// Border for user visibility
svg.style("border", "1px solid black");

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
    .range([0, width])
    .padding(0.2);

  // Create y scale
  var yScale = d3.scaleLinear()
    .domain([0, d3.max(data, function (d) {
      return d.value;
    })])
    .range([height, 0]);

  // Log scale domains for verification
  console.log(xScale.domain());
  console.log(yScale.domain());

});