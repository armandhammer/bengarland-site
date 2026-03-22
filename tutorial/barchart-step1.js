// Chart size
var width = 700;
var height = 400;

// Create the SVG area inside the div with id="chart"
var svg = d3.select("#chart")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

svg.style("border", "1px solid black");

d3.csv("fruit.csv").then(function(data) {

  // Convert value to number
  data.forEach(function(d) {
    d.value = +d.value;
  });

  console.log(data);

});