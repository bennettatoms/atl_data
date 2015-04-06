'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
angular
  .module('clientApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'highcharts-ng',
    'ui.router'
  ])

  .config(['$stateProvider', '$urlRouterProvider', 
        function ($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'views/main.html',
      controller: 'mainCtrl'
    })
      // the default route when someone hits dashboard    <!-- endbower -->

    .state('home.migrations', {
      url: 'migrations',
      templateUrl: 'views/chord.html',
      controller: 'ChordCtrl'
    })
    .state('home.population', {
      url: 'population',
      templateUrl: 'views/population.html',
      controller: 'populationCtrl'
    });
 // default fall back route
    $urlRouterProvider.otherwise('/');

}])
  .run(function ($state,$rootScope) {
    $rootScope.$state = $state;
});




'use strict';

angular.module('clientApp')
.controller('mainCtrl', ['$scope', '$state', function ($scope, $state) {
 
  $scope.selectedGraph = 'permitBlurb';     
  
  $scope.goToChord = function() {
    $state.go('home.migrations');
  };

  $scope.goToPop = function() {
    $state.go('home.population');
  };
  
  $scope.hideChordButton = false;
  $scope.showIntro = true;
  $scope.hidePopButton = true;

  (function checkState(stateName) {
    if (stateName === 'home.migrations') {
      $scope.hideChordButton = true;
      $scope.showIntro = false;
      $scope.hidePopButton = false;
      $scope.update;
    } else if (stateName === 'home.population') {
      $scope.hideChordButton = false;
      $scope.showIntro = false;
      $scope.hidePopButton = true;
      $scope.update;
    }
    console.log($state.$current.name);
  })();

  // checkState($state.$current.name);
  

  $scope.showChord = function() {
    $state === 'home.migrations';
  };

  // $rootScope.fate = "Your fate is based on statistics from resources listed below:";
  $scope.goToDev = function() {
    $state.go('home.development');
  };
  // $rootScope.transport = "UNODC and State Trafficking 2014 Report ";
  $scope.goToBar = function() {
    $state.go('home.bar');
  };

  $scope.selectGraph = function(selectedGraph) {
    $scope.selectedGraph = selectedGraph;
  };
}]);


// Code here will be linted with JSHint.
/* jshint ignore:start */
angular.module('clientApp').controller('ChordCtrl', ['$scope', 
function ($scope) {

  $scope.master = {}; // MASTER DATA STORED BY YEAR

  $scope.selected_year = 2011;
  $scope.years = d3.range(2011, 2005, -1);

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

  $scope.update = function () {
    var data = $scope.master[$scope.selected_year];

    if (data && $scope.hasFilters) {
      $scope.drawChords(data.filter(function (d) {
        var fl = $scope.filters;
        var v1 = d.atl_county, v2 = d.state;

        if ((fl[v1] && fl[v1].hide) || (fl[v2] && fl[v2].hide)) {
          return false;
        }
        return true;
      }));
    } else if (data) {
      $scope.drawChords(data);
    }
  };

  // IMPORT THE API DATA
  d3.json('api/movers', function (err, data) {

    console.log(data);
    data.forEach(function (d) {
      d.year  = +d.year;
      d.flow1 = +d.inbound;
      d.flow2 = +d.outbound;

      if (!$scope.master[d.year]) {
        $scope.master[d.year] = []; // STORED BY YEAR
      }
      $scope.master[d.year].push(d);
    })
    $scope.update();
  });

  $scope.$watch('selected_year', $scope.update);
  $scope.$watch('filters', $scope.update, true);

}]);
/* jshint ignore:end */
'use strict';

angular.module('clientApp')
.controller('BldgPmtCtrl', ['$scope', '$timeout', function ($scope, $timeout) {
  var permitChartConfig = {
    title: {
      text: 'Annual Building Permits by County'
    },
    subtitle: {
      text: 'Source: thisguy.com'
    },
    xAxis: {
      categories: ['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014'],
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Building Permit Total Units'
      }
    },
    options: {
      chart: {
        type: 'column'
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: [{
      name: 'Clayton',
      data: [3347, 3170, 3240, 3014, 2114, 2231, 1254, 403, 93, 143, 106, 93, 134, 342]
    }, {
      name: 'Cobb',
      data: [6642, 5657, 5556, 5963, 6889, 6142, 4518, 2945, 1068, 550, 1013, 1758, 2245, 2676, 3091]
    }, {
      name: 'Dekalb',
      data: [6145, 7575, 7237, 5106, 6719, 6336, 4346, 4912, 3821, 323, 432, 580, 673, 1212, 1442]
    }, {
      name: 'Fulton',
      data: [9621, 10855, 10824, 12296, 16919, 16114, 18644, 12863, 4667, 1529, 1101, 1954, 3432, 8258, 7441]
    }, {
      name: 'Gwinnett',
      data: [12372, 11274, 10362, 9617, 10463, 9938, 9033, 4408, 1959, 719, 1239, 873, 2469, 3347, 3072]
    }]
  };

  $scope.permitChartConfig = permitChartConfig;

  $timeout(function() {
    $('#container').highcharts(permitChartConfig);  
  }, 300);
  
}]);


'use strict';

angular.module('clientApp')
.controller('permitPieCtrl', ['$scope', function ($scope) {

}])

.directive('pieChart', function() {
  function link(scope, element, attrs) {

    console.log('Using d3 to get data from ' + attrs.url);

    var dataStructure;

    d3.json(attrs.url, function(err, data) {
      console.log('err: ' + err);
      console.log('puppies');
      console.log('data: ' + data);
      dataStructure = data;
      console.log(dataStructure[0]);

      $( '#slider' ).slider({
        value: 0,
        min: 0,
        max: 14,
        step: 1,
        slide: function( event, ui ) {
            update(ui.value);
            console.log(ui.value);
          }
      })
      .each(function() {

        //
        // Add labels to slider whose values 
        // are specified by min, max and whose
        // step is set to 1
        //

        // Get the options for this slider
        // var opt = $(this).data().uiSlider.options;
        
        // Get the number of possible values
        // var vals = opt.max - opt.min;
        var vals = 14;
        
        // Space out values
        for (var i = 0; i <= vals; i++) {        
          var el = $('<label>' + dataStructure[i].label + '</label>').css('left',(i/vals*100)+'%');
          $( '#slider' ).append(el); 
        }    
      });

      update(0);

    });  // end of d3.json call
    
    // CREATE VIS & GROUPS 
    var w = 650;
    var h = 500;
    var r = 150;
    var ir = 75;
    var textOffset = 50;
    var tweenDuration = 1050;

    // OBJECTS TO BE POPULATED WITH DATA LATER
    var lines, valueLabels, nameLabels, totalLabel, totalValue;
    var pieData = [];    
    var oldPieData = [];
    var filteredPieData = [];


    // D3 helper function to populate pie slice parameters from array data
    var donut = d3.layout.pie().value(function(d){
      return d.dollarValue;
    });

    // D3 helper function to create colors from an ordinal scale
    var color = d3.scale.category10();

    // D3 helper function to draw arcs, populates parameter 'd' in path object
    var arc = d3.svg.arc()
      .startAngle(function(d){ return d.startAngle; })
      .endAngle(function(d){ return d.endAngle; })
      .innerRadius(ir)
      .outerRadius(r);

    var vis = d3.select('#pie-chart').append('svg:svg')
      .attr('width', w)
      .attr('height', h);

    // GROUP FOR ARCS/PATHS
    var arc_group = vis.append('svg:g')
      .attr('class', 'arc')
      .attr('transform', 'translate(' + (w/2) + ',' + (h/2) + ')');

    // GROUP FOR LABELS
    var label_group = vis.append('svg:g')
      .attr('class', 'label_group')
      .attr('transform', 'translate(' + (w/2) + ',' + (h/2) + ')');

    // GROUP FOR CENTER TEXT  
    var center_group = vis.append('svg:g')
      .attr('class', 'center_group')
      .attr('transform', 'translate(' + (w/2) + ',' + (h/2) + ')');

    // FOR STATIC 'TOTAL' IN CENTER
    var total_text = vis.append('svg:g')
      .attr('class', 'total_text')
      .attr('transform', 'translate(' + (w/2) + ',' + (h/2) + ')'); 

    // TO RUN EACH TIME NEW DATA IS GENERATED
    function update(number) {

      var data = dataStructure[number].data;

      oldPieData = filteredPieData;
      pieData = donut(data);

      var sliceProportion = 0; //size of this slice
      filteredPieData = pieData.filter(filterData);
      function filterData(element, index, array) {
        element.name = data[index].county;
        element.value = data[index].dollarValue;
        sliceProportion += element.value;
        return (element.value > 0);
      }
      
      // MAKE RADIUS OF DONUT DYNAMICALLY CHANGE PROPORTIONAL TO TOTAL ANNUAL VALUE OF PERMITS
      var newDonutWidth = ir + (Math.sqrt(sliceProportion))/500;  
          
      arc.outerRadius(newDonutWidth);

      // PERCENTAGE LABELS TO MOVE IN AND OUT DYNAMICALLY WITH DONUT WIDTH
      textOffset = 1.46*(Math.sqrt(sliceProportion)/1000) - 33.54;
        
        // DRAW ARC PATHS
        var paths = arc_group.selectAll('path').data(filteredPieData);
        paths.enter().append('svg:path')
          .attr('stroke', 'white')
          .attr('stroke-width', 0.5)
          .attr('fill', function(d, i) { return color(i); })
          .transition()
            .duration(tweenDuration)
            .attrTween('d', pieTween);
        paths
          .transition()
            .duration(tweenDuration)
            .attrTween('d', pieTween);
        paths.exit()
          .transition()
            .duration(tweenDuration)
            .attrTween('d', removePieTween)
          .remove();

        total_text.append('svg:text')
          .attr('class', 'label')
          .attr('dy', -30)
          .attr('text-anchor', 'middle')
          .attr('opacity', '0.5')
          .style('font-size', '2em')
          .style('fill', 'black')
          .text('TOTAL');

        // PLACE TOTAL VALUE AMOUNT IN CENTER HOLE
        totalLabel = center_group.selectAll('text').data(filteredPieData);
        totalLabel.enter().append('svg:text')
          .attr('class', 'label')
          .attr('dy', 0)
          .attr('text-anchor', 'middle') // text-align: right
          .style('font-size', '2em')
          .style('fill', 'black')
          .text('');

        totalLabel.transition().duration(tweenDuration).attrTween('transform', textTween);

        totalLabel.exit().remove();

        // DISPLAY THE FIVE-COUNTY TOTAL VALUE
        totalValue = center_group.append('svg:text')
          .attr('class', 'total')
          .attr('dy', 15)
          .attr('text-anchor', 'middle') // text-align: right
          .text('$' + (sliceProportion/1000000000).toFixed(3) + 'B');

        // DRAW LABELS WITH PERCENTAGE VALUES
        valueLabels = label_group.selectAll('text.value').data(filteredPieData)
          .attr('dy', function(d){
            if ((d.startAngle+d.endAngle)/2 > Math.PI/2 && (d.startAngle+d.endAngle)/2 < Math.PI*1.5 ) {
              return 5;
            } else {
              return -7;
            }
          })
          .attr('text-anchor', function(d){
            if ( (d.startAngle+d.endAngle)/2 < Math.PI ){
              return 'beginning';
            } else {
              return 'end';
            }
          })
          .text(function(d){
            var percentage = (d.value/sliceProportion)*100;
            return percentage.toFixed(1) + '%';
          });

        valueLabels.enter().append('svg:text')
          .attr('class', 'value')
          .attr('transform', function(d) {
            return 'translate(' + Math.cos(((d.startAngle+d.endAngle - Math.PI)/2)) * (r+textOffset) + ',' + Math.sin((d.startAngle+d.endAngle - Math.PI)/2) * (r+textOffset) + ')';
          })
          .attr('dy', function(d){
            if ((d.startAngle+d.endAngle)/2 > Math.PI/2 && (d.startAngle+d.endAngle)/2 < Math.PI*1.5 ) {
              return 5;
            } else {
              return -7;
            }
          })
          .attr('text-anchor', function(d){
            if ( (d.startAngle+d.endAngle)/2 < Math.PI ){
              return 'beginning';
            } else {
              return 'end';
            }
          }).text(function(d){
            var percentage = (d.value/sliceProportion)*100;
            return percentage.toFixed(1) + '%';
          });

        valueLabels.transition().duration(tweenDuration).attrTween('transform', textTween);

        valueLabels.exit().remove();


        // DRAW LABELS WITH ENTITY NAMES
        nameLabels = label_group.selectAll('text.units').data(filteredPieData)
          .attr('dy', function(d){
            if ((d.startAngle+d.endAngle)/2 > Math.PI/2 && (d.startAngle+d.endAngle)/2 < Math.PI*1.5 ) {
              return 17;
            } else {
              return 5;
            }
          })
          .attr('text-anchor', function(d){
            if ((d.startAngle+d.endAngle)/2 < Math.PI ) {
              return 'beginning';
            } else {
              return 'end';
            }
          }).text(function(d){
            return d.name;
          });

        nameLabels.enter().append('svg:text')
          .attr('class', 'units')
          .attr('transform', function(d) {
            return 'translate(' + Math.cos(((d.startAngle+d.endAngle - Math.PI)/2)) * (r+textOffset) + ',' + Math.sin((d.startAngle+d.endAngle - Math.PI)/2) * (r+textOffset) + ')';
          })
          .attr('dy', function(d){
            if ((d.startAngle+d.endAngle)/2 > Math.PI/2 && (d.startAngle+d.endAngle)/2 < Math.PI*1.5 ) {
              return 17;
            } else {
              return 5;
            }
          })
          .attr('text-anchor', function(d){
            if ((d.startAngle+d.endAngle)/2 < Math.PI ) {
              return 'beginning';
            } else {
              return 'end';
            }
          }).text(function(d){
            return d.name;
          });

        nameLabels.transition().duration(tweenDuration).attrTween('transform', textTween);

        nameLabels.exit().remove();      
    }

    // FUNCTIONS 

    // INTERPOLATE THE ARCS IN DATA SPACE
    function pieTween(d, i) {
      var s0;
      var e0;
      if(oldPieData[i]){
        s0 = oldPieData[i].startAngle;
        e0 = oldPieData[i].endAngle;
      } else if (!(oldPieData[i]) && oldPieData[i-1]) {
        s0 = oldPieData[i-1].endAngle;
        e0 = oldPieData[i-1].endAngle;
      } else if(!(oldPieData[i-1]) && oldPieData.length > 0){
        s0 = oldPieData[oldPieData.length-1].endAngle;
        e0 = oldPieData[oldPieData.length-1].endAngle;
      } else {
        s0 = 0;
        e0 = 0;
      }
      var i = d3.interpolate({startAngle: s0, endAngle: e0}, {startAngle: d.startAngle, endAngle: d.endAngle});
      return function(t) {
        var b = i(t);
        return arc(b);
      };
    }

    function removePieTween(d, i) {
      var s0 = 2 * Math.PI;
      var e0 = 2 * Math.PI;
      var i = d3.interpolate({startAngle: d.startAngle, endAngle: d.endAngle}, {startAngle: s0, endAngle: e0});
      return function(t) {
        var b = i(t);
        return arc(b);
      };
    }

    function textTween(d, i) {
      var a;
      if(oldPieData[i]){
        a = (oldPieData[i].startAngle + oldPieData[i].endAngle - Math.PI)/2;
      } else if (!(oldPieData[i]) && oldPieData[i-1]) {
        a = (oldPieData[i-1].startAngle + oldPieData[i-1].endAngle - Math.PI)/2;
      } else if(!(oldPieData[i-1]) && oldPieData.length > 0) {
        a = (oldPieData[oldPieData.length-1].startAngle + oldPieData[oldPieData.length-1].endAngle - Math.PI)/2;
      } else {
        a = 0;
      }
      var b = (d.startAngle + d.endAngle - Math.PI)/2;

      var fn = d3.interpolateNumber(a, b);
      return function(t) {
        var val = fn(t);
        return 'translate(' + Math.cos(val) * (r+textOffset) + ',' + Math.sin(val) * (r+textOffset) + ')';
      };
    }
  }
  return {
    link: link, 
    restrict: 'AE'
  };
  
});

'use strict';

angular.module('clientApp')
.controller('populationCtrl', ['$scope', function ($scope) {
  var popChartConfig = {
    title: {
      text: 'Population by County, Historical and Projected'
    },
    subtitle: {
      text: 'Source: Atlanta Regional Commission'
    },
    xAxis: {
      categories: ['1970', '1980', '1990', '2000', '2010', '2015', '2020', '2025', '2030', '2035', '2040'],
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Population'
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: [{
      name: 'Clayton',
      data: [98126, 150357, 184100, 236517, 259424, 262777, 273012, 285167, 296372, 297976, 309090]
    }, {
      name: 'Cobb',
      data: [196793, 297718, 453400, 607751, 688078, 709173, 739131, 770795, 807612, 823349, 851483]
    }, {
      name: 'Dekalb',
      data: [415387, 483024, 553800, 665865, 691893, 738917, 762355, 767368, 777345, 799324, 834156]
    }, {
      name: 'Fulton',
      data: [605210, 589904, 670800, 816006, 920581, 954976, 977294, 988491, 1021700, 1101453, 1175962]
    }, {
      name: 'Gwinnett',
      data: [72349, 166808, 356500, 588448, 805321, 854440, 906556, 967184, 1036841, 1127007, 1225302]
    }]
  };

  $scope.popChartConfig = popChartConfig;
  
  $('#container').highcharts(popChartConfig);

}]);
// Code here will be linted with JSHint.
/* jshint ignore:start */

angular.module('clientApp').factory('matrixFactory', [function () {

  var chordMatrix = function () {

    var _matrix = [], dataStore = [], _id = 0;
    var matrixIndex = [], indexHash = {};
    var chordLayout, layoutCache;

    var filter = function () {};
    var reduce = function () {};

    var matrix = {};

    matrix.update = function () {
      _matrix = [];
      var objs = [];
      var entry = {};

      layoutCache = {groups: {}, chords: {}};

      this.groups().forEach(function (group) {
        layoutCache.groups[group._id] = {
          startAngle: group.startAngle,
          endAngle: group.endAngle
        };
      });

      this.chords().forEach(function (chord) {
        layoutCache.chords[chordID(chord)] = {
          source: {
            _id: chord.source._id,
            startAngle: chord.source.startAngle,
            endAngle: chord.source.endAngle
          },
          target: {
            _id: chord.target._id,
            startAngle: chord.target.startAngle,
            endAngle: chord.target.endAngle
          }
        };
      });

      matrixIndex = Object.keys(indexHash);

      for (var i = 0; i < matrixIndex.length; i++) {
        if (!_matrix[i]) {
          _matrix[i] = [];
        }
        for (var j = 0; j < matrixIndex.length; j++) {
          objs = dataStore.filter(function (obj) {
            return filter(obj, indexHash[matrixIndex[i]], indexHash[matrixIndex[j]]);
          });
          entry = reduce(objs, indexHash[matrixIndex[i]], indexHash[matrixIndex[j]]);
          entry.valueOf = function () { return +this.value };
          _matrix[i][j] = entry;
        }
      }
      chordLayout.matrix(_matrix);
      return _matrix;
    };

    matrix.data = function (data) {
      dataStore = data;
      return this;
    };

    matrix.filter = function (func) {
      filter = func;
      return this;
    };

    matrix.reduce = function (func) {
      reduce = func;
      return this;
    };

    matrix.layout = function (d3_chordLayout) {
      chordLayout = d3_chordLayout;
      return this;
    };

    matrix.groups = function () {
      return chordLayout.groups().map(function (group) {
        group._id = matrixIndex[group.index];
        return group;
      });
    };

    matrix.chords = function () {
      return chordLayout.chords().map(function (chord) {
        chord._id = chordID(chord);
        chord.source._id = matrixIndex[chord.source.index];
        chord.target._id = matrixIndex[chord.target.index];
        return chord;
      });
    };

    matrix.addKey = function (key, data) {
      if (!indexHash[key]) {
        indexHash[key] = {name: key, data: data || {}};
      }
    };

    matrix.addKeys = function (props, fun) {
      for (var i = 0; i < dataStore.length; i++) {
        for (var j = 0; j < props.length; j++) {
          this.addKey(dataStore[i][props[j]], fun ? fun(dataStore[i], props[j]):{});
        }
      }
      return this;
    };

    matrix.resetKeys = function () {
      indexHash = {};
      return this;
    };

    function chordID(d) {
      var s = matrixIndex[d.source.index];
      var t = matrixIndex[d.target.index];
      return (s < t) ? s + "__" + t: t + "__" + s;
    }

    matrix.groupTween = function (d3_arc) {
      return function (d, i) {
        var tween; 
        var cached = layoutCache.groups[d._id];

        if (cached) {
          tween = d3.interpolateObject(cached, d);
        } else {
          tween = d3.interpolateObject({
            startAngle:d.startAngle,
            endAngle:d.startAngle
          }, d);
        }

        return function (t) {
          return d3_arc(tween(t));
        };
      };
    };

    matrix.chordTween = function (d3_path) {
      return function (d, i) {
        var tween, groups;
        var cached = layoutCache.chords[d._id];

        if (cached) {
          if (d.source._id !== cached.source._id){
            cached = {source: cached.target, target: cached.source};
          }
          tween = d3.interpolateObject(cached, d);
        } else {
          if (layoutCache.groups) {
            groups = [];
            for (var key in layoutCache.groups) {
              cached = layoutCache.groups[key];
              if (cached._id === d.source._id || cached._id === d.target._id) {
                groups.push(cached);
              }
            }
            if (groups.length > 0) {
              cached = {source: groups[0], target: groups[1] || groups[0]};
              if (d.source._id !== cached.source._id) {
                cached = {source: cached.target, target: cached.source};
              }
            } else {
              cached = d;
            }
          } else {
            cached = d;
          }

          tween = d3.interpolateObject({
            source: { 
              startAngle: cached.source.startAngle,
              endAngle: cached.source.startAngle
            },
            target: { 
              startAngle: cached.target.startAngle,
              endAngle: cached.target.startAngle
            }
          }, d);
        }

        return function (t) {
          return d3_path(tween(t));
        };
      };
    };

    matrix.read = function (d) {
      var g, m = {};

      if (d.source) {
        m.sname  = d.source._id;
        m.sdata  = d.source.value;
        m.svalue = +d.source.value;
        m.stotal = _matrix[d.source.index].reduce(function (k, n) { return k + n; }, 0);
        m.tname  = d.target._id;
        m.tdata  = d.target.value;
        m.tvalue = +d.target.value;
        m.ttotal = _matrix[d.target.index].reduce(function (k, n) { return k + n; }, 0);
      } else {
        g = indexHash[d._id];
        m.gname  = g.name;
        m.gdata  = g.data;
        m.gvalue = d.value;
      }
      m.mtotal = _matrix.reduce(function (m1, n1) { 
        return m1 + n1.reduce(function (m2, n2) { return m2 + n2; }, 0);
      }, 0);
      return m;
    };

    return matrix;
  };

  return {
    chordMatrix: chordMatrix
  };
}]);
/* jshint ignore:end */
// Code here will be linted with JSHint.
/* jshint ignore:start */
angular.module('clientApp').directive('chordDiagram', ['$window', 'matrixFactory',

function ($window, matrixFactory) {

  var link = function ($scope, $el, $attr) {

    var size = [600, 600]; // SVG SIZE WIDTH, HEIGHT
    var marg = [50, 50, 50, 50]; // TOP, RIGHT, BOTTOM, LEFT
    var dims = []; // USABLE DIMENSIONS
    dims[0] = size[0] - marg[1] - marg[3]; // WIDTH
    dims[1] = size[1] - marg[0] - marg[2]; // HEIGHT

    var colors = d3.scale.ordinal()
      .range(['#9C6744','#C9BEB9','#CFA07E','#C4BAA1','#C2B6BF','#121212','#8FB5AA','#85889E','#9C7989','#91919C','#242B27','#212429','#99677B','#36352B','#33332F','#2B2B2E','#2E1F13','#2B242A','#918A59','#6E676C','#6E4752','#6B4A2F','#998476','#8A968D','#968D8A','#968D96','#CC855C', '#967860','#929488','#949278','#A0A3BD','#BD93A1','#65666B','#6B5745','#6B6664','#695C52','#56695E','#69545C','#565A69','#696043','#63635C','#636150','#333131','#332820','#302D30','#302D1F','#2D302F','#CFB6A3','#362F2A']);

    var chord = d3.layout.chord()
      .padding(0.02)
      .sortGroups(d3.descending)
      .sortSubgroups(d3.ascending);

    var matrix = matrixFactory.chordMatrix()
      .layout(chord)
      .filter(function (item, r, c) {
        return (item.atl_county === r.name && item.state === c.name) ||
               (item.atl_county === c.name && item.state === r.name);
      })
      .reduce(function (items, r, c) {
        var value;
        if (!items[0]) {
          value = 0;
        } else {
          value = items.reduce(function (m, n) {
            if (r === c) {
              return m + (n.inbound + n.outbound);
            } else {
              return m + (n.atl_county === r.name ? n.inbound: n.outbound);
            }
          }, 0);
        }
        return {value: value, data: items};
      });

    var innerRadius = (dims[1] / 2) - 100;

    var arc = d3.svg.arc()
      .innerRadius(innerRadius)
      .outerRadius(innerRadius + 20);

    var path = d3.svg.chord()
      .radius(innerRadius);

    var svg = d3.select($el[0]).append("svg")
      .attr("class", "chart")
      .attr({width: size[0] + "px", height: size[1] + "px"})
      .attr("preserveAspectRatio", "xMinYMin")
      .attr("viewBox", "0 0 " + size[0] + " " + size[1]);

    var container = svg.append("g")
      .attr("class", "container")
      .attr("transform", "translate(" + ((dims[0] / 2) + marg[3]) + "," + ((dims[1] / 2) + marg[0]) + ")");

    var messages = svg.append("text")
      .attr("class", "messages")
      .attr("transform", "translate(10, 10)")
      .text("Updating...");

    $scope.drawChords = function (data) {

      messages.attr("opacity", 1);
      messages.transition().duration(1000).attr("opacity", 0);

      matrix.data(data)
        .resetKeys()
        .addKeys(['atl_county', 'state'])
        .update()

      var groups = container.selectAll("g.group")
        .data(matrix.groups(), function (d) { return d._id; });
      
      var gEnter = groups.enter()
        .append("g")
        .attr("class", "group");

      gEnter.append("path")
        .style("pointer-events", "none")
        .style("fill", function (d) { return colors(d._id); })
        .attr("d", arc);
 
      gEnter.append("text")
        .attr("dy", ".35em")
        .on("click", groupClick)
        .on("mouseover", dimChords)
        .on("mouseout", resetChords)
        .text(function (d) {
          return d._id;
        });

      groups.select("path")
        .transition().duration(2000)
        .attrTween("d", matrix.groupTween(arc));

      groups.select("text")
        .transition()
        .duration(2000)
        .attr("transform", function (d) {
          d.angle = (d.startAngle + d.endAngle) / 2;
          var r = "rotate(" + (d.angle * 180 / Math.PI - 90) + ")";
          var t = " translate(" + (innerRadius + 26) + ")";
          return r + t + (d.angle > Math.PI ? " rotate(180)" : " rotate(0)"); 
        })
        .attr("text-anchor", function (d) {
          return d.angle > Math.PI ? "end" : "begin";
        });

      groups.exit().select("text").attr("fill", "orange");
      groups.exit().select("path").remove();

      groups.exit().transition().duration(1000)
        .style("opacity", 0).remove();

      var chords = container.selectAll("path.chord")
        .data(matrix.chords(), function (d) { return d._id; });

      chords.enter().append("path")
        .attr("class", "chord")
        .style("fill", function (d) {
          return colors(d.source._id);
        })
        .attr("d", path)
        .on("mouseover", chordMouseover)
        .on("mouseout", hideTooltip);

      chords.transition().duration(2000)
        .attrTween("d", matrix.chordTween(path));

      chords.exit().remove()

      function groupClick(d) {
        d3.event.preventDefault();
        d3.event.stopPropagation();
        $scope.addFilter(d._id);
        resetChords();
      }

      function chordMouseover(d) {
        d3.event.preventDefault();
        d3.event.stopPropagation();
        dimChords(d);
        d3.select("#tooltip").style("opacity", 1);
        $scope.updateTooltip(matrix.read(d));
      }

      function hideTooltip() {
        d3.event.preventDefault();
        d3.event.stopPropagation();
        d3.select("#tooltip").style("opacity", 0);
        resetChords();
      }

      function resetChords() {
        d3.event.preventDefault();
        d3.event.stopPropagation();
        container.selectAll("path.chord").style("opacity",0.9);
      }

      function dimChords(d) {
        d3.event.preventDefault();
        d3.event.stopPropagation();
        container.selectAll("path.chord").style("opacity", function (p) {
          if (d.source) { // COMPARE CHORD IDS
            return (p._id === d._id) ? 0.9: 0.1;
          } else { // COMPARE GROUP IDS
            return (p.source._id === d._id || p.target._id === d._id) ? 0.9: 0.1;
          }
        });
      }
    }; // END DRAWCHORDS FUNCTION

    function resize() {
      var width = $el.parent()[0].clientWidth;
      svg.attr({
        width: width,
        height: width / (size[0] / size[1])
      });
    }

    resize();
      
    $window.addEventListener("resize", function () {
      resize();
    });
  }; // END LINK FUNCTION

  return {
    link: link,
    restrict: 'EA'
  };

}]);
/* jshint ignore:end */



