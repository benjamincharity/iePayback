angular.module('iePayback').config(function($stateProvider, $urlRouterProvider) {

  // make trailing slash optional
  $urlRouterProvider.rule(function($injector, $location) {
    var path = $location.path()
    // Note: misnomer. This returns a query object, not a search string
    , search = $location.search()
    , params
    ;

  // check to see if the path already ends in '/'
  if (path[path.length - 1] === '/') {
    return;
  }

  // If there was no search string / query params, return with a `/`
  if (Object.keys(search).length === 0) {
    return path + '/';
  }

  // Otherwise build the search string and return a `/?` prefix
  params = [];
  angular.forEach(search, function(v, k){
    params.push(k + '=' + v);
  });
    return path + '/?' + params.join('&');
  });
  

  //
  // For any unmatched url, send to /
  $urlRouterProvider.otherwise("/");

  //
  // Now set up the states
  $stateProvider
    .state('form', {
        url: "/",
        templateUrl: "partials/form.html",
        controller: 'PostCtrl'
    })
    .state('results', {
        url: "/results/",
        templateUrl: "partials/results.html",
        controller: 'ResultsCtrl'
    });
});
