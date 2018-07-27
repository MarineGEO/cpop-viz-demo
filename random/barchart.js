var parseTime = d3.timeParse("%Y-%m-%d %H:%M:%S:%L")

function type(d) {
  d.time = parseTime(d.time);
  d.row = +d.row;
  d.dice1 = +d.dice1;
  d.dice2 = +d.dice2;
  d.sum = +d.sum;
  d.product = +d.product;
  return d;
}

//https://stackoverflow.com/questions/17313268/idiomatically-find-the-number-of-occurrences-a-given-value-has-in-an-array
var count = function (ary, classifier) {
    classifier = classifier || String;
    return ary.reduce(function (counter, item) {
        var p = classifier(item);
        counter[p] = counter.hasOwnProperty(p) ? counter[p] + 1 : 1;
        return counter;
    }, {})
};

var arrangeCount = function(counts){
  var objlst = [];
  for(var c in counts){
    objlst.push({"sum": c, "number": counts[c]})
  }
  return objlst
}

d3.csv('https://dl.dropboxusercontent.com/s/li1ciysypwc44t2/random_dice_generator.csv?dl=0', function (data) {
	var columns = ['time', 'row','dice1','dice2', 'sum', 'product']
  //console.log(data)
  //console.log(data[1])

  d = type(data)
  //console.log(+d[1].dice1 + +d[1].dice2)

  counts = count(d, function(item){
    return item.sum
  });

  arrng = arrangeCount(counts);
  //console.log(arrng);

  barchart(arrng);
})

//https://bl.ocks.org/d3noob/bdf28027e0ce70bd132edc64f1dd7ea4
var barchart = function(data){
  // set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// set the ranges
var x = d3.scaleBand()
          .range([0, width])
          .padding(0.1);
var y = d3.scaleLinear()
          .range([height, 0]);

// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


  // Scale the range of the data in the domains
  x.domain(data.map(function(d) { return d.sum; }));
  y.domain([0, d3.max(data, function(d) { return d.number; })]);

  // append the rectangles for the bar chart
  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.sum); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d.number); })
      .attr("height", function(d) { return height - y(d.number); });

  // add the x Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // add the y Axis
  svg.append("g")
      .call(d3.axisLeft(y));
};
