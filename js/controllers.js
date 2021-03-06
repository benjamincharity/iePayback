(function () {
   'use strict';



  angular.module('iePayback').controller('PostCtrl', function ($rootScope, $scope, $firebase, $state, $timeout) {

    $scope.alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

    function range(start, end) {
      var myRange = [];
      for (var i = start; i <= end; i++) {
        myRange.push(i);
      }
      return myRange;
    }

    // current year - 1995 when IE 5 was released
    var dateSinceRelease = new Date().getFullYear() - 1995;

    $scope.yearsSinceRelease = range(1, dateSinceRelease);

    // our object to store form data until saving
    $scope.newPostForm = {};

    // give a starting integer so that our filter doesn't choke
    $scope.newPostForm.totalCost = 0;

    $scope.newPostForm.rate = '';
    $scope.newPostForm.years = 0;
    $scope.newPostForm.lostHours = 0;

    // create our new post object that we will send to firebase
    $scope.newPost = {};

    //
    // Function to calculate how many *extra* hours were spent supporting IE
    //
    var calculateLostHours = function(versions, hours) {

      // define the ratio of work increase for each version of ie
      var ie5Ratio      = 2.4;
      var ie6Ratio      = 2.0;
      var ie7Ratio      = 1.8;
      var ie8Ratio      = 1.4;
      var ie9Ratio      = 1.2;
      var ie10Ratio     = 1.1;
      var ie11Ratio     = 1.1;
      var ieCompatRatio = 1.4;

      var lostHours = 0;

      // for each version, calculate the increased work time
      angular.forEach(versions, function(value, key){

        switch (key) {
          case "IE5":
            if( value === true ) {
              var decrease = hours - (hours / ie5Ratio);
              lostHours = lostHours + decrease;
            }
          case "IE6":
            if( value === true ) {
              var decrease = hours - (hours / ie6Ratio);
              lostHours = lostHours + decrease;
            }
          case "IE7":
            if( value === true ) {
              var decrease = hours - (hours / ie7Ratio);
              lostHours = lostHours + decrease;
            }
          case "IE8":
            if( value === true ) {
              var decrease = hours - (hours / ie8Ratio);
              lostHours = lostHours + decrease;
            }
          case "IE9":
            if( value === true ) {
              var decrease = hours - (hours / ie9Ratio);
              lostHours = lostHours + decrease;
            }
          case "IE10":
            if( value === true ) {
              var decrease = hours - (hours / ie10Ratio);
              lostHours = lostHours + decrease;
            }
          case "IE11":
            if( value === true ) {
              var decrease = hours - (hours / ie11Ratio);
              lostHours = lostHours + decrease;
            }
          case "IECompat":
            if( value === true ) {
              var decrease = hours - (hours / ieCompatRatio);
              lostHours = lostHours + decrease;
            }
          default:
            break;
        }

        // let's work with a nice round number
        lostHours = Math.round(lostHours);

      });

      var hoursString = lostHours.toString();
      $scope.newPostForm.lostHoursFriendly = hoursString.substring(0, hoursString.length - 3) + 'k+';
      // round our final number and return
      return Math.round(lostHours);

    };


    // determine the IE dev cost
    $scope.updateCost = function() {
      var billableHoursPerYear = 1650; // http://bnj.bz/0L2n1e1I1W36
      var hours = $scope.newPostForm.years * billableHoursPerYear;
      var ieHours = calculateLostHours($scope.newPostForm.ieVersions, hours);
      var actualCost = ieHours * $scope.newPostForm.rate;

      $scope.newPostForm.totalCost = actualCost;

    };

    $scope.$watch('newPostForm.years', function(newValue, oldValue) {

      $timeout(function() {

        $scope.$apply(function () {
          $scope.updateCost();
        });

      });

    });



    $scope.submit = function(newPost) {
      console.log(newPost);

      // pass our form object into firebase
      $rootScope.posts.$add(newPost);
      // zero out our new post object
      $scope.newPost = "";
      // show the results
      $state.go('results')

    };


    // callback function for custom dropdown.
    //
    $scope.newPostForm.setSelectedInitial = function(value, index) {

      $timeout(function() {

        $scope.$apply(function () {
          $scope.newPostForm.lastInitial = $scope.alphabet[index-1];
        });

      });

    };

    $scope.newPostForm.setSelectedYear = function(value, index) {

      $timeout(function() {

        $scope.$apply(function () {
          if( isNaN(value) ) {
            $scope.newPostForm.years = value;
          } else {
            $scope.newPostForm.years = parseInt(value);
          }

        });

      });

    };

  });


  angular.module('iePayback').controller('ResultsCtrl', function ($scope, fbService) {

    var date = new Date();
    var d  = date.getDate();
    var day = (d < 10) ? '0' + d : d;
    var m = date.getMonth() + 1;
    var month = (m < 10) ? '0' + m : m;
    var yy = date.getYear();
    var year = (yy < 1000) ? yy + 1900 : yy;

    $scope.currentDate = month + ' / ' + day + ' / ' + year;

  });

}()); // end strict function
