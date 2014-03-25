(function () {
   'use strict';



  angular.module('iePayback').controller('FormCtrl', function ($rootScope, $scope, $firebase, $state) {

    $scope.alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    $scope.years = ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16']
    // current year - 1995 when IE was first released
    $scope.yearsSinceRelease = new Date().getFullYear() - 1995;



    // create our new post object
    $scope.newPost = {};
    // our object to store form data until saving
    $scope.newPostForm = {};

    // our submit function
    $scope.submit = function(newPost) {
      // pass our form object into our service
      $rootScope.posts.$add(newPost);
      // zero out our new post object
      $scope.newPost = "";
      // show the results
      $state.go('results')
    };



  });



  angular.module('iePayback').controller('ResultsCtrl', function ($scope, fbService) {


  });


}()); // end strict function
