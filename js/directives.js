angular.module('iePayback').directive('selecter', function($timeout) {

  var linkFunction = function($scope, $element, $attributes) {
    $timeout(function() {
      $element.selecter({
        //label: defaultLabel
      });
    }, 50);
  };

  return {
    restrict: 'A',
    scope: {
      defaultLabel: '=label'
    },
    link: linkFunction
  };
});
