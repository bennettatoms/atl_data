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