'use strict';

angular.module('clientApp')
.controller('BldgPmtCtrl', ['$scope', '$timeout', function ($scope, $timeout) {
  var permitChartConfig = {
    title: {
      text: 'Annual Building Permits by County'
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

