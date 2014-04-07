angular.module('iePayback').directive('selecter', function($timeout) {

  var linkFunction = function($scope, $element, $attributes) {

    $timeout(function(label) {
      var label = $attributes.label;
      var customClass = $attributes.customClass;

      $element.selecter({
        label: label,
        customClass: customClass
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
        var label = attrs.selecterLabel;
        var customClass = attrs.selecterClass;

        var selecterConfig = {
          label: label,
          customClass: customClass
        };

        // get the current config options on the selecter
        jQuery.extend(selecterConfig, $parse(attrs.selecterConfig)());

        // add our callback to the selecter config
        jQuery.extend(selecterConfig, {
          callback: function(value, index) {
            // wrap with $apply so angular knows to pay attention
            scope.$apply(function() {
              // assign our callback function to propagateF
              var propagateF = $parse(attrs.selecterCallback)(scope);
              // call our callback
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





angular.module('iePayback').directive('verifyNumeric', function() {

  var linkFunction = function($scope, $element, $attributes) {

    $element.on("keydown keypress", function(evt) {

      var charCode = (evt.which) ? evt.which : event.keyCode;

      if( charCode > 31 && (charCode < 48 || charCode > 57) ) {
        return false;
      } else {
        return true;
      }

    });

  };

  return {
    restrict: 'A',
    link: linkFunction
  };
});



