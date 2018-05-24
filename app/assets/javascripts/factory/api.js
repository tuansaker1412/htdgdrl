factory_app
.factory("API", ["$http", "$rootScope", "$window", function ($http, $rootScope, $window) {
  return {
    getClassNames: function(page, keyword) {
      return $http({
        method: "GET",
        url: "/api/v1/admins/class_names",
        params: {
          page: page || 1,
          keyword: keyword
        }
      });
    },
    getClassName: function(class_name_id) {
      return $http.get("/api/v1/admins/class_names/" + class_name_id);
    },
    updateClassName: function(class_name_id, class_name) {
      return $http.put("/api/v1/admins/class_names/" + class_name_id, {class_name: class_name});
    },
    deleteClassName: function(class_name_id) {
      return $http.delete("/api/v1/admins/class_names/" + class_name_id);
    },
    createClassName: function(class_name) {
      return $http.post("/api/v1/admins/class_names/", {class_name: class_name});
    },
    getAllClassNames: function() {
      return $http.get("/api/v1/admins/get_all_class_names");
    },
    getForms: function() {
      return $http({
        method: "GET",
        url: "/api/v1/students/forms"
      });
    },
    getForm: function(form_id) {
      return $http.get("/api/v1/students/forms/" + form_id);
    },
    updateForm: function(form_id, form) {
      return $http.put("/api/v1/students/forms/" + form_id, {form: form});
    },
    deleteForm: function(form_id) {
      return $http.delete("/api/v1/students/forms/" + form_id);
    },
    createForm: function(form) {
      return $http.post("/api/v1/students/forms/", {form: form});
    },
    sendForm: function(form) {
      return $http.post("/api/v1/send_form/", {form: form});
    },
    backForm: function(form) {
      return $http.post("/api/v1/back_form/", {form: form});
    },
    getFormsbySuperStudent: function(page) {
      return $http({
        method: "GET",
        url: "/api/v1/super_students/forms",
        params: {
          page: page || 1
        }
      });
    },
    getFormsbyTeacher: function(page) {
      return $http({
        method: "GET",
        url: "/api/v1/teachers/forms",
        params: {
          page: page || 1
        }
      });
    },
    getListForms: function(page) {
      return $http({
        method: "GET",
        url: "/api/v1/admins/forms",
        params: {
          page: page || 1
        }
      });
    },
    getUsers: function(page, keyword) {
      return $http({
        method: "GET",
        url: "/api/v1/admins/users",
        params: {
          page: page || 1,
          keyword: keyword
        }
      });
    },
    getUser: function(user_id) {
      return $http.get("/api/v1/admins/users/" + user_id);
    },
    updateUser: function(user_id, user) {
      return $http.put("/api/v1/admins/users/" + user_id, {user: user});
    },
    deleteUser: function(user_id) {
      return $http.delete("/api/v1/admins/users/" + user_id);
    },
    createUser: function(user) {
      return $http.post("/api/v1/admins/users/", {user: user});
    },
  }
}])
