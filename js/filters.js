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
