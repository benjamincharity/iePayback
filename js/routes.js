angular.module('iePayback').config(function($stateProvider, $urlRouterProvider) {

  //
  // For any unmatched url, send to /
  $urlRouterProvider.otherwise("/");

  //
  // Now set up the states
  $stateProvider
    .state('form', {
        url: "/",
        templateUrl: "partials/form.html",
        controller: 'FormCtrl'
    })
    .state('results', {
        url: "/results",
        templateUrl: "partials/results.html",
        controller: 'ResultsCtrl'
    });
});