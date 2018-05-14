app.run(['$state', '$window', '$http', '$rootScope', 'Auth', function ($state, $window, $http, $rootScope, Auth) {
  NProgress.configure({
    template: '<div class="bar" role="bar"><div class="peg"></div></div>\
              <div class="page-spinner-bar">\
                  <div class="bounce1"></div>\
                  <div class="bounce2"></div>\
                  <div class="bounce3"></div>\
              </div>'
  });
  NProgress.start();
  Layout.initSidebar($state);
  $rootScope.language = $window.localStorage.language || 'vi';
  if($window.localStorage.token) {
    $rootScope.currentUser = JSON.parse($window.localStorage.user);
    $http.defaults.headers.common["Authorization"] = 'Bearer ' + $window.localStorage.token;
    $state.go("main");
  } else {
    $state.go("signin");
  }

  $rootScope.changeLanguage = function(language) {
    $rootScope.language = language;
    $window.localStorage.language = language;
  }

  $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
    NProgress.start();
    if (toState.requireLogin && !Auth.isSignedIn()) {
      event.preventDefault();
      $state.go("signin");
    }
    if (toState.requireRoles && toState.requireRoles.indexOf($rootScope.currentUser.role) < 0) {
      event.preventDefault();
      $state.go("main");
    }
  });
  $rootScope.$on('$stateChangeSuccess', function () {
    NProgress.done();
  });
}]);
