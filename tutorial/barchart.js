// --------------------------------------------------
// Interactive Bar Chart with Sorting in D3.js
// Beginner-friendly version with simple comments
// --------------------------------------------------

// Chart size
var width = 700;
var height = 400;

// Margins around the chart
var margin = {
  top: 20,
  right: 20,
  bottom: 60,
  left: 60
};

// Inner chart area after margins
var innerWidth = width - margin.left - margin.right;
var innerHeight = height - margin.top - margin.bottom;

// Keep a copy of the original data order
var originalData = [];

// Track whether the chart is currently sorted
var isSorted = false;

// Create the SVG area
var svg = d3.select("#chart")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// Create a group element inside the SVG
// This shifts the chart area so the margins work properly
var chartGroup = svg.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Load the CSV file
d3.csv("fruit.csv").then(function(data) {

  // Convert the value column from text to number
  data.forEach(function(d) {
    d.value = +d.value;
  });

  // Save original order for reset
  originalData = data.map(function(d) {
    return {
      category: d.category,
      value: d.value
    };
  });

  // Create x scale
  // scaleBand is used for categories
  var xScale = d3.scaleBand()
    .domain(data.map(function(d) { return d.category; }))
    .range([0, innerWidth])
    .padding(0.2);

  // Create y scale
  // scaleLinear is used for numbers
  var yScale = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return d.value; })])
    .range([innerHeight, 0]);

  // Add x-axis group
  var xAxisGroup = chartGroup.append("g")
    .attr("transform", "translate(0," + innerHeight + ")")
    .call(d3.axisBottom(xScale));

  // Rotate x-axis labels a little if needed
  xAxisGroup.selectAll("text")
    .attr("transform", "rotate(-20)")
    .style("text-anchor", "end");

  // Add y-axis group
  var yAxisGroup = chartGroup.append("g")
    .call(d3.axisLeft(yScale));

  // Add bars
  var bars = chartGroup.selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return xScale(d.category); })
    .attr("y", function(d) { return yScale(d.value); })
    .attr("width", xScale.bandwidth())
    .attr("height", function(d) { return innerHeight - yScale(d.value); });

  // Add value labels above each bar
  var labels = chartGroup.selectAll(".value-label")
    .data(data)
    .enter()
    .append("text")
    .attr("class", "value-label")
    .attr("x", function(d) {
      return xScale(d.category) + xScale.bandwidth() / 2;
    })
    .attr("y", function(d) {
      return yScale(d.value) - 5;
    })
    .attr("text-anchor", "middle")
    .text(function(d) { return d.value; });

  // --------------------------------------------------
  // Function to update the chart after sorting/reset
  // --------------------------------------------------
  function updateChart(newData) {

    // Update the x-scale domain with the new order
    xScale.domain(newData.map(function(d) { return d.category; }));

    // Re-bind bars to the new data
    bars.data(newData)
      .transition()
      .duration(1000)
      .attr("x", function(d) { return xScale(d.category); });

    // Re-bind labels to the new data
    labels.data(newData)
      .transition()
      .duration(1000)
      .attr("x", function(d) {
        return xScale(d.category) + xScale.bandwidth() / 2;
      });

    // Update x-axis with transition
    xAxisGroup
      .transition()
      .duration(1000)
      .call(d3.axisBottom(xScale));

    // Re-rotate labels after axis redraw
    xAxisGroup.selectAll("text")
      .attr("transform", "rotate(-20)")
      .style("text-anchor", "end");
  }

  // --------------------------------------------------
  // Button click event
  // --------------------------------------------------
  d3.select("#sortButton").on("click", function() {

    if (isSorted === false) {
      // Make a new sorted copy of the data
      var sortedData = data.slice().sort(function(a, b) {
        return b.value - a.value;
      });

      updateChart(sortedData);

      // Update button text
      d3.select(this).text("Reset Order");

      isSorted = true;
    } else {
      // Reset to original order
      updateChart(originalData);

      // Update button text
      d3.select(this).text("Sort Descending");

      isSorted = false;
    }
  });

});