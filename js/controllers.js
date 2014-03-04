(function () {
   'use strict';



  angular.module('iePayback').controller('AppCtrl', function ($scope, $firebase, PostsService) {

    $scope.posts = service.getPosts();

  });



  angular.module('iePayback').controller('FormCtrl', function ($scope, $firebase, PostsService) {

    // create our new post object
    $scope.newPost = {};

    // our submit function
    $scope.submit = function(newPost) {
      // pass our form object into our service
      PostsService.addPost(newPost);
      // zero out our new post object
      $scope.newPost = "";
    };
  });



  angular.module('iePayback').controller('ResultsCtrl', function ($scope, $firebase, PostsService) {

    $scope.posts = PostsService.getPosts();
    console.log($scope.posts);

  });


}()); // end strict function