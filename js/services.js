angular.module("iePayback").factory("fbService", ["$firebase", function($firebase) {

  var ref = new Firebase("https://sweltering-fire-2791.firebaseio.com/posts");

  return $firebase(ref);

}]);

