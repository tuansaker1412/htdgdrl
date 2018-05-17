APP_VERSION = 1;
var app = angular.module("AccountApp", ['ngBootbox', 'app.filter', 'app.factory',
 'app.directive', 'app.language', 'ui.bootstrap',
 'ui.router', 'toastr', 'ngMessages', 'autofocus',
 'anguFixedHeaderTable', 'angularMoment', 'ui.select', 'ngSanitize', 'ng-backstretch'])
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider',
  function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
  $stateProvider
  .state("signin", {
    url: "/signin",
    templateUrl: "/templates/users/sessions/new.html",
    controller: 'SessionsController',
    requireLogin: false
  })
  .state('resetPassword', {
    url: "/passwords/new",
    templateUrl: "/templates/users/passwords/new.html",
    controller: "PasswordsController",
    requireLogin: false
  })
  .state('editPassword', {
    url: "/users/password",
    templateUrl: "/templates/users/passwords/edit.html",
    controller: "EditPasswordController",
    requireLogin: false
  })
  .state('unlock', {
    url: "/user/unlock",
    templateUrl: "/templates/users/unlocks/new.html",
    controller: "UnlockController",
    requireLogin: false
  })
  .state('main', {
    url: "/main",
    templateUrl: "/templates/main.html",
    controller: "MainController",
    requireLogin: true
  })
  .state('main.forms', {
    url: "/forms",
    templateUrl: "/templates/students/forms/index.html",
    resolve: {
      forms: ['API', '$stateParams', function(API, $stateParams) {
        return API.getForms().then(function(response) {
          return response.data;
        });
      }]
    },
    controller: "FormsController",
    requireLogin: true
  })
  .state('main.class_names', {
    url: "/class_names?page&&keyword",
    templateUrl: "/templates/admins/class_names/index.html",
    resolve: {
      class_names: ['API', '$stateParams', function(API, $stateParams) {
        return API.getClassNames($stateParams.page, $stateParams.keyword).then(function(response) {
          return response.data;
        });
      }]
    },
    controller: "ClassNamesController",
    requireLogin: true
  })
  $urlRouterProvider.otherwise('/main');
}]);
