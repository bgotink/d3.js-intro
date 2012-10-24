var margin = {top: 40, right: 40, bottom: 40, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.category10();

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("data.json", function(json) {

	x.domain(d3.extent(json, function(d) { return d.length; })).nice();
	y.domain(d3.extent(json, function(d) { return d.typingSpeed; })).nice();
	
	svg.append("g")
	      .attr("class", "x axis")
	      .attr("transform", "translate(0," + height + ")")
	      .call(xAxis)
	    .append("text")
	      .attr("class", "label")
	      .attr("x", width / 2)
	      .attr("y", 40)
	      .style("text-anchor", "center")
	      .text("Length (cm)");
	
	svg.append("g")
	      .attr("class", "y axis")
	      .call(yAxis)
	    .append("text")
	      .attr("class", "label")
	      .attr("transform", "rotate(-90)")
	      .attr("y", -40)
		  .attr("x", -height / 2)
	      .attr("dy", ".71em")
	      .style("text-anchor", "center")
	      .text("Typing Speed (wpm)");
			
	svg.selectAll(".dot")
	      .data(json)
	    .enter().append("circle")
	      .attr("class", "dot")
	      .attr("r", 4)
	      .attr("cx", function(d) { return x(d.length); })
	      .attr("cy", function(d) { return y(d.typingSpeed); })
	      .style("fill", function(d, i) { return color(d.teacher ? 1 : 0); });
		  
	var legend = svg.selectAll(".legend")
	      .data(color.domain())
	    .enter().append("g")
	      .attr("class", "legend")
	      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

	legend.append("rect")
	    .attr("x", width - 18)
	    .attr("width", 18)
	    .attr("height", 18)
	    .style("fill", color);
    legend.append("text")
	      .attr("x", width - 24)
	      .attr("y", 9)
	      .attr("dy", ".35em")
	      .style("text-anchor", "end")
	      .text(function(d) { return d ? "Teacher" : "Student"; });
});