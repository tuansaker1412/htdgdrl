angular.module("app.factory", [])
.factory ("Auth", ["$http", "$rootScope", "$window", function ($http, $rootScope, $window) {
  return {
    signIn: function(email, password) {
      return $http.post("/api/sign_in", {user: {email: email, password: password}});
    },
    signOut: function() {
      $rootScope.currentUser = null;
      $window.localStorage.removeItem("user");
      $window.localStorage.removeItem("token");
    },
    isSignedIn: function() {
      return $rootScope.currentUser ? true : false;
    },
    resetPassword: function(email) {
      return $http.post("/api/users/passwords", {user: {email: email}});
    },
    editPassword: function(user, token, password) {
      return $http.put("/api/users/passwords/" + user, {token: token, password: password});
    },
    signUp: function(user) {
      return $http.post("/api/users/registrations", {user: user})
    },
    confirmation: function(confirmation_token, user) {
      return $http.post("/api/users/confirmations", {confirmation_token: confirmation_token, user: user})
    },
    resendConfirmation: function(email) {
      return $http.post("/api/users/confirmations", {email: email})
    },
    unlock: function(unlock_token, user) {
      return $http.post("/api/users/unlock", {unlock_token: unlock_token, user: user});
    },
    resendUnlock: function(email) {
      return $http.post("/api/users/unlock", {email: email});
    }
  }
}])
.factory ("Province", ["$http", "$rootScope", "$window", function ($http, $rootScope, $window) {
  return {
    index: function () {
      return $http.get("/api/v1/provinces");
    }
  }
}])
.factory ("District", ["$http", "$rootScope", "$window", function ($http, $rootScope, $window) {
  return {
    index: function (id) {
      return $http.get("/api/v1/districts?province_id=" + id);
    }
  }
}])
.factory ("Ward", ["$http", "$rootScope", "$window", function ($http, $rootScope, $window) {
  return {
    index: function (id) {
      return $http.get("/api/v1/wards?district_id=" + id);
    }
  }
}])
.factory ("User", ["$http", "$rootScope", "$window", function ($http, $rootScope, $window) {
  return {
    index: function () {

    },
    show: function () {

    },
    create: function () {

    },
    update: function () {

    },
    delete: function () {

    }
  }
}])
.factory ("Enterprise", ["$http", "$rootScope", "$window", function ($http, $rootScope, $window) {
  return {
    index: function () {

    },
    show: function () {

    },
    create: function () {

    },
    update: function () {

    },
    delete: function () {

    }
  }
}])
.factory ("Agency", ["$http", "$rootScope", "$window", function ($http, $rootScope, $window) {
  return {
    index: function () {

    },
    show: function () {

    },
    create: function () {

    },
    update: function () {

    },
    delete: function () {

    }
  }
}])
.factory ("Inspection", ["$http", "$rootScope", "$window", function ($http, $rootScope, $window) {
  return {
    index: function () {

    },
    show: function () {

    },
    create: function () {

    },
    update: function () {

    },
    delete: function () {

    }
  }
}])
