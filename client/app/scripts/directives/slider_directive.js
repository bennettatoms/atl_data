 
(function (module, require) {
  'use strict';
 
    var Utils = require('../../shared/utils.js');
 
    module.exports = ['$parse', '$timeout', function($parse, $timeout) {
        return {
            restrict: 'AE',
            require: 'ngModel',
            link: function(scope, element, attrs, ngModel) {
 
                var slider = element.slider({
                    value: ngModel.$viewValue,
                    min: parseInt($parse(attrs.min)(scope)),
                    max: parseInt($parse(attrs.max)(scope)),
                    step: parseInt($parse(attrs.step)(scope)),
                    slide: function(event, ui) {
                        scope.$apply(function() {
                            ngModel.$setViewValue(ui.value);
                        });
                    }
                });
 
                ngModel.$render = function () {
                    var newValue = ngModel.$viewValue;
                    element.slider('value', newValue);
                };
 
            }
        };
    }];
 
})(module, require);