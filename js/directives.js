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
