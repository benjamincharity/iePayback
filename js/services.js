angular.module("iePayback").factory("PostsService", function($http) {

  var ref = new Firebase("https://sweltering-fire-2791.firebaseio.com/posts");

  return {

    getPosts: function() {
      var posts = [];
      ref.on("child_added", function(snapshot) {
        posts.push(snapshot.val());
      });
      return posts;
    },

    addPost: function(post) {
      ref.push(post);
    }

  };

});