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
    var valueLabels, nameLabels, totalLabel, totalValue;
    var pieData = [];    
    var oldPieData = [];
    var filteredPieData = [];


    // D3 helper function to populate pie slice parameters from array data
    var donut = d3.layout.pie().value(function(d){
      return d.dollarValue;
    });

    // D3 helper function to create colors from an ordinal scale
    var color = d3.scale.ordinal()
      .range(['#9b59b6', '#e74c3c', '#e67e22', '#2980b9', '#1abc9c']);

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
      
      function filterData(element, index) {
        element.name = data[index].county;
        element.value = data[index].dollarValue;
        sliceProportion += element.value;
        return (element.value > 0);
      }
      filteredPieData = pieData.filter(filterData);
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
          .attr('dy', -10)
          .attr('text-anchor', 'middle')
          .attr('opacity', '0.5')
          .style('font-size', '2em')
          .style('fill', 'white')
          .text('TOTAL');

        // PLACE TOTAL VALUE AMOUNT IN CENTER HOLE
        totalLabel = center_group.selectAll('text').data(filteredPieData);
        totalLabel.enter().append('svg:text')
          .attr('class', 'label')
          .attr('dy', 0)
          .attr('text-anchor', 'middle') // text-align: right
          .style('font-size', '2em')
          .style('fill', 'white')
          .text('');

        totalLabel.transition().duration(tweenDuration).attrTween('transform', textTween);

        totalLabel.exit().remove();

        // DISPLAY THE FIVE-COUNTY TOTAL VALUE
        totalValue = center_group.append('svg:text')
          .attr('class', 'total')
          .attr('dy', 25)
          .style('font-size', '1.5em')
          .attr('text-anchor', 'middle') // text-align: right
          .style('fill', 'white')
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
      var j = d3.interpolate({startAngle: s0, endAngle: e0}, {startAngle: d.startAngle, endAngle: d.endAngle});
      return function(t) {
        var b = j(t);
        return arc(b);
      };
    }

    function removePieTween(d, k) {
      var s0 = 2 * Math.PI;
      var e0 = 2 * Math.PI;
      k = d3.interpolate({startAngle: d.startAngle, endAngle: d.endAngle}, {startAngle: s0, endAngle: e0});
      return function(t) {
        var b = k(t);
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
