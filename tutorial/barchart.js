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

// Track whether chart is sorted
var isSorted = false;

// Create SVG
var svg = d3.select("#chart")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// Border for visibility
svg.style("border", "1px solid black");

// Create chart group
var chartGroup = svg.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Load data
d3.csv("fruit.csv").then(function(data) {

  // Convert value to number
  data.forEach(function(d) {
    d.value = +d.value;
  });

  // Save original order
  var originalData = data.map(function(d) {
    return {
      category: d.category,
      value: d.value
    };
  });

  // Current working copy
  var currentData = data.map(function(d) {
    return {
      category: d.category,
      value: d.value
    };
  });

  // X scale
  var xScale = d3.scaleBand()
    .domain(currentData.map(function(d) { return d.category; }))
    .range([0, innerWidth])
    .padding(0.2);

  // Y scale
  var yScale = d3.scaleLinear()
    .domain([0, d3.max(currentData, function(d) { return d.value; })])
    .range([innerHeight, 0]);

  // X axis
  var xAxisGroup = chartGroup.append("g")
    .attr("transform", "translate(0," + innerHeight + ")")
    .call(d3.axisBottom(xScale));

  // Y axis
  chartGroup.append("g")
    .call(d3.axisLeft(yScale));

  // Bars
  var bars = chartGroup.selectAll(".bar")
    .data(currentData)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return xScale(d.category); })
    .attr("y", function(d) { return yScale(d.value); })
    .attr("width", xScale.bandwidth())
    .attr("height", function(d) { return innerHeight - yScale(d.value); })
    .attr("fill", "steelblue");

  // Labels
  var labels = chartGroup.selectAll(".value-label")
    .data(currentData)
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
    .text(function(d) {
      return d.value;
    });

  // Button click
  d3.select("#sortButton").on("click", function() {

    if (isSorted === false) {
      currentData.sort(function(a, b) {
        return b.value - a.value;
      });

      d3.select(this).text("Reset Order");
      isSorted = true;
    } else {
      currentData = originalData.map(function(d) {
        return {
          category: d.category,
          value: d.value
        };
      });

      d3.select(this).text("Sort Descending");
      isSorted = false;
    }

    // Update x-scale domain
    xScale.domain(currentData.map(function(d) {
      return d.category;
    }));

    // Animate bars
    bars
      .data(currentData, function(d) { return d.category; })
      .transition()
      .duration(1000)
      .attr("x", function(d) {
        return xScale(d.category);
      });

    // Animate labels
    labels
      .data(currentData, function(d) { return d.category; })
      .transition()
      .duration(1000)
      .attr("x", function(d) {
        return xScale(d.category) + xScale.bandwidth() / 2;
      });

    // Animate axis
    xAxisGroup
      .transition()
      .duration(1000)
      .call(d3.axisBottom(xScale));

  });

});