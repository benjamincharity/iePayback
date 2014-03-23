angular.module("iePayback").factory("PostsService", function($http, $state) {

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
      ref.push(post, function(error) {
        if (error) {
          console.log('Data could not be saved.' + error);
        } else {
          console.log('Data saved successfully.');
          $state.go('results');
        }
      });
    }

  };

});



angular.module("iePayback").filter('createRange', function() {
  return function(input, total) {

    total = parseInt(total);

    for (var i=0; i<total; i++)
      // +1 so we start at '1' instead of '0'
      input.push(i+1);

    return input;

  };
});







// http://stackoverflow.com/questions/17648014/how-can-i-use-an-angularjs-filter-to-format-a-number-to-have-leading-zeros#17648547
angular.module("iePayback").filter('fixedNumberLength', function () {
  return function (n, len) {

    var num = parseInt(n, 10);
    len = parseInt(len, 10);

    if (isNaN(num) || isNaN(len)) {
      return n;
    }

    num = ''+num;
    while (num.length < len) {
      num = '0'+num;
    }

    return num;

  };
});
