var width = 512,
    height = 512,
    radius = Math.min(width, height) / 2;


var color = d3.scale.ordinal().range(d3.scale.category10().range());

var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(radius - 90);

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.count; });

var svg = [];

svg["current"] = d3.select("#current").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
	
svg["preferred"] = d3.select("#preferred").append("svg")
	    .attr("width", width)
	    .attr("height", height)
	  .append("g")
	    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


d3.json("data.json", function(data) {
	  var g = [];
	  g["current"] = svg["current"].selectAll(".arc")
	      .data(pie(data.current))
	    .enter().append("g")
	      .attr("class", "arc");
 		 g["current"].append("path")
 	      .attr("d", arc)
 	      .style("fill", function(d, i) { return color(i); });

 	  g["current"].append("text")
 	      .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
 	      .attr("dy", ".35em")
		  .attr("class", "arctitle")
 	      .style("text-anchor", "middle")
 	      .text(function(d) { return d.data.name.replace(/_/, " ") + ' - ' + d.data.count; });
		  
	  svg["current"].append("text")
	  	  .style("text-anchor", "middle")
		  .attr("class", "charttitle")
		  .text("Current OS");
		  
		  
	  g["preferred"] = svg["preferred"].selectAll(".arc")
	      .data(pie(data.preferred))
	    .enter().append("g")
	      .attr("class", "arc");


		 g["preferred"].append("path")
	      .attr("d", arc)
	      .style("fill", function(d, i) { return color(i); });

	  g["preferred"].append("text")
	      .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
	      .attr("dy", ".35em")
		  .attr("class", "arctitle")
	      .style("text-anchor", "middle")
	      .text(function(d) { return d.data.name.replace(/_/, " ") + ' - ' + d.data.count; });
		  
	  svg["preferred"].append("text")
	  	  .style("text-anchor", "middle")
		  .attr("class", "charttitle")
		  .text("Preferred OS");
	  
	});