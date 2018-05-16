var factory_app = angular.module("app.factory", [])
.factory ("Auth", ["$http", "$rootScope", "$window", function ($http, $rootScope, $window) {
  return {
    signIn: function(email, password) {
      return $http.post("/api/v1/sign_in", {user: {email: email, password: password}});
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
      return $http.post("/api/v1/users/passwords", {user: {email: email}});
    },
    editPassword: function(user, token, password) {
      return $http.put("/api/v1/users/passwords/" + user, {token: token, password: password});
    },
    updatePassword: function(new_password, current_password) {
      return $http.put("/api/v1/users/update_password" , {new_password: new_password,
        current_password: current_password});
    },
    signUp: function(user) {
      return $http.post("/api/v1/users/registrations", {user: user})
    },
    confirmation: function(confirmation_token, user) {
      return $http.post("/api/v1/users/confirmations", {confirmation_token: confirmation_token, user: user})
    },
    resendConfirmation: function(email) {
      return $http.post("/api/v1/users/confirmations", {email: email})
    },
    unlock: function(unlock_token, user) {
      return $http.post("/api/v1/users/unlock", {unlock_token: unlock_token, user: user});
    },
    resendUnlock: function(email) {
      return $http.post("/api/v1/users/unlock", {email: email});
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
