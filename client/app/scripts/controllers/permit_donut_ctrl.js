'use strict';

angular.module('clientApp')
.controller('permitDonutCtrl', ['$scope', '$http', function ($scope, $http) {

  $scope.master = {};
  $scope.selected_year = 2000;
  $scope.years = d3.range(2014, 2000, -1);

  $scope.filters = {};
  $scope.hasFilters = false;

  $scope.tooltip = {};

  // FORMATS USED IN TOOLTIP TEMPLATE IN HTML
  $scope.pFormat = d3.format(".1%");  // PERCENT FORMAT
  $scope.qFormat = d3.format(",.0f"); // COMMAS FOR LARGE NUMBERS

  $scope.updateTooltip = function (data) {
    $scope.tooltip = data;
    $scope.$apply();
  }

  $scope.addFilter = function (name) {
    $scope.hasFilters = true;
    $scope.filters[name] = {
      name: name,
      hide: true
    };
    $scope.$apply();
  };

  // $scope.update = function () {
  //   var data = $scope.master[$scope.selected_year];

  //   if (data && $scope.hasFilters) {
  //     $scope.drawChords(data.filter(function (d) {
  //       var fl = $scope.filters;
  //       var v1 = d.atl_county, v2 = d.state;

  //       if ((fl[v1] && fl[v1].hide) || (fl[v2] && fl[v2].hide)) {
  //         return false;
  //       }
  //       return true;
  //     }));
  //   } else if (data) {
  //     $scope.drawChords(data);
  //   }
  // };

  $http.get('api/bldg_permits').then(function(err,data) {
    if(err) { throw err; }

    data.forEach(function (d) {
      d.year  = +d.year;
      d.total_units = +d.total_units;
      d.value = +d.value;
    
      if (!$scope.master[d.year]) {
        $scope.master[d.year] = []; // STORED BY YEAR
      }
      $scope.master[d.year].push(d);
    })
    $scope.update();
    $scope.data = data;
  }, 1000);

  $scope.$watch('selected_year', $scope.update);
  $scope.$watch('filters', $scope.update, true);
}])


.directive('donut', function(){
  function link(scope, el, attr){
    var color = d3.scale.category10();
    var width = 300;
    var height = 300;
    var min = Math.min(width, height);
    var svg = d3.select(el[0]).append('svg');
    var pie = d3.layout.pie().sort(null);
    var arc = d3.svg.arc()
      .outerRadius(min / 2 * 0.9)
      .innerRadius(min / 2 * 0.5);

    pie.value(function(d){ return d.value; });

    svg.attr({width: width, height: height});
    var g = svg.append('g')
      // center the donut chart
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
    
    // add the <path>s for each arc slice
    var arcs = g.selectAll('path');

    scope.$watch('data', function(data){
      console.log(data.year);
      if(!data){ return; }
      arcs = arcs.data(pie(data));
      arcs.enter().append('path')
        .style('stroke', 'white')
        .attr('fill', function(d, i){ return color(i); });
      arcs.exit().remove();
      arcs.attr('d', arc);
    }, true);
  }
  return {
    link: link,
    restrict: 'E',
    scope: { data: '=' }
  };
});

//   var dispatch = d3.dispatch("load", "statechange");

//   var groups = [
//     "Under 5 Years",
//     "5 to 13 Years",
//     "14 to 17 Years",
//     "18 to 24 Years",
//     "25 to 44 Years",
//     "45 to 64 Years",
//     "65 Years and Over"
//   ];

//   d3.csv("../../data/states_pops.csv", type, function(error, states) {
//     if (error) throw error;
//     var stateById = d3.map();
//     states.forEach(function(d) { stateById.set(d.id, d); });
//     dispatch.load(stateById);
//     dispatch.statechange(stateById.get("CA"));
//   });

//   // A drop-down menu for selecting a state; uses the "menu" namespace.
//   dispatch.on("load.menu", function(stateById) {
//     var select = d3.select("body")
//       .append("div")
//       .append("select")
//         .on("change", function() { dispatch.statechange(stateById.get(this.value)); });

//     select.selectAll("option")
//         .data(stateById.values())
//       .enter().append("option")
//         .attr("value", function(d) { return d.id; })
//         .text(function(d) { return d.id; });

//     dispatch.on("statechange.menu", function(state) {
//       select.property("value", state.id);
//     });
//   });

//   // A bar chart to show total population; uses the "bar" namespace.
//   dispatch.on("load.bar", function(stateById) {
//     var margin = {top: 20, right: 20, bottom: 30, left: 40},
//         width = 80 - margin.left - margin.right,
//         height = 460 - margin.top - margin.bottom;

//     var y = d3.scale.linear()
//         .domain([0, d3.max(stateById.values(), function(d) { return d.total; })])
//         .rangeRound([height, 0])
//         .nice();

//     var yAxis = d3.svg.axis()
//         .scale(y)
//         .orient("left")
//         .tickFormat(d3.format(".2s"));

//     var svg = d3.select("body").append("svg")
//         .attr("width", width + margin.left + margin.right)
//         .attr("height", height + margin.top + margin.bottom)
//       .append("g")
//         .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//     svg.append("g")
//         .attr("class", "y axis")
//         .call(yAxis);

//     var rect = svg.append("rect")
//         .attr("x", 4)
//         .attr("width", width - 4)
//         .attr("y", height)
//         .attr("height", 0)
//         .style("fill", "#aaa");

//     dispatch.on("statechange.bar", function(d) {
//       rect.transition()
//           .attr("y", y(d.total))
//           .attr("height", y(0) - y(d.total));
//     });
//   });

//   // A pie chart to show population by age group; uses the "pie" namespace.
//   dispatch.on("load.pie", function(stateById) {
//     var width = 880,
//         height = 460,
//         radius = Math.min(width, height) / 2;

//     var color = d3.scale.ordinal()
//         .domain(groups)
//         .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

//     var arc = d3.svg.arc()
//         .outerRadius(radius - 10)
//         .innerRadius(radius - 70);

//     var pie = d3.layout.pie()
//         .sort(null);

//     var svg = d3.select("body").append("svg")
//         .attr("width", width)
//         .attr("height", height)
//       .append("g")
//         .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

//     var path = svg.selectAll("path")
//         .data(groups)
//       .enter().append("path")
//         .style("fill", color)
//         .each(function() { this._current = {startAngle: 0, endAngle: 0}; });

//     dispatch.on("statechange.pie", function(d) {
//       path.data(pie.value(function(g) { return d[g]; })(groups)).transition()
//           .attrTween("d", function(d) {
//             var interpolate = d3.interpolate(this._current, d);
//             this._current = interpolate(0);
//             return function(t) {
//               return arc(interpolate(t));
//             };
//           });
//     });
//   });

//   // Coerce population counts to numbers and compute total per state.
//   function type(d) {
//     d.total = d3.sum(groups, function(k) { return d[k] = +d[k]; });
//     return d;
//   }
// }]);
