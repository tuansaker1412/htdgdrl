angular.module("app.filter", [])
.filter('stringFormat', function () {
  return function (input, params) {
    return input.replace(/\{\d+\}/g, function (match) {
      var index = parseInt(match.match(/\d+/)[0]);
      var value = angular.isArray(params) ? params[index] : params;
      return $("<span>").text(value).html();
    })
  }
})
