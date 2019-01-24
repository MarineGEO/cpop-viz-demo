var scatterplot = function(data){

    var margin = {top: 20, right: 15, bottom: 60, left: 60}
      , width = 960 - margin.left - margin.right
      , height = 500 - margin.top - margin.bottom;

    var x = d3.scaleLinear()
              .domain([0, d3.max(data, function(d) { return d.dice1; })])
              .range([ 0, width ]);

    var y = d3.scaleLinear()
    	      .domain([0, d3.max(data, function(d) { return d.dice2; })])
    	      .range([ height, 0 ]);

    var chart = d3.select('body')
    .append('svg:svg')
    .attr('width', width + margin.right + margin.left)
    .attr('height', height + margin.top + margin.bottom)
    .attr('class', 'chart')

    var main = chart.append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    .attr('width', width)
    .attr('height', height)
    .attr('class', 'main')

    // draw the x axis
    var xAxis = d3.axisBottom()
    .scale(x);

    main.append('g')
    .attr('transform', 'translate(0,' + height + ')')
    .attr('class', 'main axis date')
    .call(xAxis);

    // draw the y axis
    var yAxis = d3.axisLeft()
    .scale(y);

    main.append('g')
    .attr('transform', 'translate(0,0)')
    .attr('class', 'main axis date')
    .call(yAxis);

    var g = main.append("svg:g");

    g.selectAll("scatter-dots")
      .data(data)
      .enter().append("svg:circle")
          .attr("cx", function (d,i) { return x(d.dice1); } )
          .attr("cy", function (d) { return y(d.dice2); } )
          .attr("r", 8)
          .attr('fill-opacity', 0.2);
}

var parseTime = d3.timeParse("%Y-%m-%d %H:%M:%S:%L")

function type(d) {
  d.time = parseTime(d.Timestamp);
  d.row = +d.row;
  d.dice1 = +d.dice1;
  d.dice2 = +d.dice2;
  return d;
}

d3.csv('https://dl.dropboxusercontent.com/s/li1ciysypwc44t2/random_dice_generator.csv?dl=0', function (data) {
	var columns = ['Timestamp', 'row','dice1','dice2']
  console.log(data)
  console.log(data[1])

  d = type(data)
  //console.log(+d[1].dice1 + +d[1].dice2)

  scatterplot(d);
})
