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
  }
}])
