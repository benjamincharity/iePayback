angular.module('iePayback').directive('selecter', function($timeout) {

  var linkFunction = function($scope, $element, $attributes) {
    $timeout(function(label) {
      $element.selecter({
        label: $attributes.label
      });
    }, 50);
  };

  return {
    restrict: 'A',
    scope: {
      label: '='
    },
    link: linkFunction
  };
});


//
//
// Bootstrap selecter jQuery select UX widget
// Directive:
//    selecter-for-option-with-ng-repeat
//    selecter-target="#linkStartImage"
//    selecter-callback="setSelectedItem"
//      ** will be called on your scope
//    selecter-config="{ defaultLabel: 'foo' }"
//
angular.module('iePayback').directive("selecterForOptionWithNgRepeat", function($timeout, $parse) {

        return function( scope, element, attrs ) {

            // $last & $timeout are a hack to have this run only once, after
            // ng-repeat has finished building out the dom elements
            if (scope.$last) {
                $timeout(function() {
                    var selecterConfig = {};

                    jQuery.extend(selecterConfig, $parse(attrs.selecterConfig)());

                    jQuery.extend(selecterConfig, {
                        callback: function(value, index) {
                            // wrap with $apply so angular knows to pay attention
                            scope.$apply(function() {
                                var propagateF = $parse(attrs.selecterCallback)(scope);
                                propagateF(value, index);
                            })
                        }
                    });

                    // target the element and initilize selecter() while
                    // passing in the config options
                    angular.element(attrs.selecterTarget).selecter(selecterConfig);
                });
            }

        }

    });








