app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider',
  function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
  $locationProvider.html5Mode(true);
  $httpProvider .interceptors.push(["$injector", "toastr", '$rootScope', '$window',
    function ($injector, toastr, $rootScope, $window) {
    return {
      responseError: function (rejection) {
        if (rejection.status == 401) {
          $injector.get('$state').go("signin");
        } else {
          toastr.error(rejection.data.message || "Có lỗi xảy ra. Vui lòng F5 trình duyệt và thử lại.");
        }
      },
      request: function(config) {
        if(config.url.match(/templates.*html$/)) {
          config.url = config.url + '?v=' + APP_VERSION;
        }
        return config;
      }
    };
  }]);
}]);
