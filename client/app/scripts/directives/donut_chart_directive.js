'use strict';

angular.module('clientApp')
.directive('donutchartSketch', function(){
  return {
    link: link, 
    restrict: 'E'
  };
  function link(scope, element, attr) {
    console.log('hello world!');
    element.text('hello pookie!');
    // var color = d3.scale.category10();
    // var data = [10, 20, 30];
    // var width = 300;
    // var height = 300;
    // var min = Math.min(width, height);
    // var svg = d3.select(element[0]).append('svg'); 
    // var pie = d3.layout.pie().sort(null);
    // var arc = d3.svg.arc()
    //   .outerRadius(min / 2 * 0.9)
    //   .innerRadius(min / 2 * 0.5);
    // svg.attr({width: width, height: height});
    // var g = svg.append('g')
    //   // center the donut chart
    //   .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
    //       // add the <path>s for each arc slice
    //       g.selectAll('path').data(pie(data))
    //         .enter().append('path')
    //   .style('stroke', 'white')
    //   .attr('d', arc)
    //   .attr('fill', function(d, i){ return color(i); });
  }
  
});