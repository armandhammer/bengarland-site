// Chart size
var width = 700;
var height = 400;

// Create the SVG area inside the div with id="chart"
var svg = d3.select("#chart")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// Load the CSV file
d3.csv("fruit.csv").then(function(data) {

  // Convert value from text to number
  data.forEach(function(d) {
    d.value = +d.value;
  });

  // Print the data to the console
  console.log(data);

});