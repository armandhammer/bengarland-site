// --------------------------------------------------
// Interactive Bar Chart with Sorting in D3.js
// --------------------------------------------------

var width = 700;
var height = 400;

var margin = {
  top: 20,
  right: 20,
  bottom: 60,
  left: 60
};

var innerWidth = width - margin.left - margin.right;
var innerHeight = height - margin.top - margin.bottom;

var originalData = [];
var currentData = [];
var isSorted = false;

var svg = d3.select("#chart")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

var chartGroup = svg.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("fruit.csv").then(function(data) {

  data.forEach(function(d) {
    d.value = +d.value;
  });

  originalData = data.map(function(d) {
    return {
      category: d.category,
      value: d.value
    };
  });

  currentData = data.map(function(d) {
    return {
      category: d.category,
      value: d.value
    };
  });

  var xScale = d3.scaleBand()
    .domain(currentData.map(function(d) { return d.category; }))
    .range([0, innerWidth])
    .padding(0.2);

  var yScale = d3.scaleLinear()
    .domain([0, d3.max(currentData, function(d) { return d.value; })])
    .range([innerHeight, 0]);

  var xAxisGroup = chartGroup.append("g")
    .attr("transform", "translate(0," + innerHeight + ")")
    .call(d3.axisBottom(xScale));

  xAxisGroup.selectAll("text")
    .attr("transform", "rotate(-20)")
    .style("text-anchor", "end");

  var yAxisGroup = chartGroup.append("g")
    .call(d3.axisLeft(yScale));

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
    .text(function(d) { return d.value; });

  function updateChart(newData) {
    xScale.domain(newData.map(function(d) { return d.category; }));

    bars
      .data(newData, function(d) { return d.category; })
      .transition()
      .duration(1000)
      .attr("x", function(d) { return xScale(d.category); });

    labels
      .data(newData, function(d) { return d.category; })
      .transition()
      .duration(1000)
      .attr("x", function(d) {
        return xScale(d.category) + xScale.bandwidth() / 2;
      });

    xAxisGroup
      .transition()
      .duration(1000)
      .call(d3.axisBottom(xScale))
      .on("end", function() {
        xAxisGroup.selectAll("text")
          .attr("transform", "rotate(-20)")
          .style("text-anchor", "end");
      });
  }

  d3.select("#sortButton").on("click", function() {

    var newData;

    if (isSorted === false) {
      newData = currentData.slice().sort(function(a, b) {
        return b.value - a.value;
      });

      d3.select(this).text("Reset Order");
      isSorted = true;
    } else {
      newData = originalData.map(function(d) {
        return {
          category: d.category,
          value: d.value
        };
      });

      d3.select(this).text("Sort Descending");
      isSorted = false;
    }

    currentData = newData;
    updateChart(currentData);
  });

});