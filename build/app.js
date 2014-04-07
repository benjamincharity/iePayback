
angular.module('iePayback', ['ui.router', 'firebase']);




angular.module('iePayback').run(function($rootScope, fbService) {

  (function(d) {
    var config = {
      kitId: 'xua8izo',
      scriptTimeout: 3000
    },
    h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='//use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
  })(document);


  // on app init, go get all existing posts
  $rootScope.posts = fbService;

});
angular.module("iePayback").factory("fbService", ["$firebase", function($firebase) {

  var ref = new Firebase("https://sweltering-fire-2791.firebaseio.com/posts");

  return $firebase(ref);

}]);

angular.module('iePayback').filter('noFractionCurrency',
  [ '$filter', '$locale', function(filter, locale) {
    var currencyFilter = filter('currency');
    var formats = locale.NUMBER_FORMATS;

    return function(amount, currencySymbol) {

      var value = currencyFilter(amount, currencySymbol);
      var sep = value.indexOf(formats.DECIMAL_SEP);

      if(amount >= 0) {
        return value.substring(0, sep);
      }

      return value.substring(0, sep) + ')';

    };
  }
]);





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



angular.module("iePayback").filter('reverse', function() {
  function toArray(list) {
     var k, out = [];
     if( list ) {
        if( angular.isArray(list) ) {
           out = list;
        }
        else if( typeof(list) === 'object' ) {
           for (k in list) {
              if (list.hasOwnProperty(k)) { out.push(list[k]); }
           }
        }
     }
     return out;
  }

  return function(items) {
     return toArray(items).slice().reverse();
  };
});
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

      });

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


    // our object to store form data until saving
    $scope.newPostForm = {};

    // give a starting integer so that our filter doesn't choke
    $scope.newPostForm.totalCost = 0;

    $scope.newPostForm.rate = '';
    $scope.newPostForm.years = 0;

    // create our new post object that we will send to firebase
    $scope.newPost = {};


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
angular.module('iePayback').directive('selecter', function($timeout) {

  var linkFunction = function($scope, $element, $attributes) {

    $timeout(function(label) {
      var label = $attributes.label;
      var customClass = $attributes.customClass;

      $element.selecter({
        label: label,
        customClass: customClass
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


//
//
// Bootstrap selecter jQuery select UX widget
// Directive:
//    selecter-for-option-with-ng-repeat
//    selecter-target="#linkStartImage"
//    selecter-callback="setSelectedItem"
//      ** will be called on your scope
//    selecter-config="{ defaultLabel: 'foo' }"
//
angular.module('iePayback').directive("selecterForOptionWithNgRepeat", function($timeout, $parse) {

  return function( scope, element, attrs ) {

    // $last & $timeout are a hack to have this run only once, after
    // ng-repeat has finished building out the dom elements
    if (scope.$last) {

      $timeout(function() {
        var label = attrs.selecterLabel;
        var customClass = attrs.selecterClass;

        var selecterConfig = {
          label: label,
          customClass: customClass
        };

        // get the current config options on the selecter
        jQuery.extend(selecterConfig, $parse(attrs.selecterConfig)());

        // add our callback to the selecter config
        jQuery.extend(selecterConfig, {
          callback: function(value, index) {
            // wrap with $apply so angular knows to pay attention
            scope.$apply(function() {
              // assign our callback function to propagateF
              var propagateF = $parse(attrs.selecterCallback)(scope);
              // call our callback
              propagateF(value, index);
            })
          }
        });

        // target the element and initilize selecter() while
        // passing in the config options
        angular.element(attrs.selecterTarget).selecter(selecterConfig);
      });

    }

  }

});





angular.module('iePayback').directive('verifyNumeric', function() {

  var linkFunction = function($scope, $element, $attributes) {

    $element.on("keydown keypress", function(evt) {

      var charCode = (evt.which) ? evt.which : event.keyCode;

      if( charCode > 31 && (charCode < 48 || charCode > 57) ) {
        return false;
      } else {
        return true;
      }

    });

  };

  return {
    restrict: 'A',
    link: linkFunction
  };
});




