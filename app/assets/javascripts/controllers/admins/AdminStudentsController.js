app.controller("AdminUsersController", ['$scope', '$rootScope', '$state', 'toastr', 'API', '$uibModal', '$ngBootbox', 'users',
  function ($scope, $rootScope, $state, toastr, API, $uibModal, $ngBootbox, users) {
  $scope.users = users;

  $scope.keyword = $state.params.keyword;
  $scope.currentPage = $state.params.page || 1;
  $scope.showCreateUserModal = function() {
    NProgress.start();
    var modalInstance = $uibModal.open({
      templateUrl: "/templates/admins/users/create.html",
      size: 'md',
      backdrop: 'static',
      keyboard: false,
      resolve: {
        class_names: ['API', function(API) {
          return API.getAllClassNames().then(function(response) {
            return response.data;
          });
        }]
      },
      controller: ['$scope', '$uibModalInstance', 'toastr', '$state', 'API', 'class_names',
        function($scope, $uibModalInstance, toastr, $state, API, class_names) {
        NProgress.done();
        $scope.user = {};
        $scope.class_names = class_names.data;
        $scope.createUser = function () {
          NProgress.start();
          API.createUser($scope.user).success(function (response) {
            NProgress.done();
            if(response.code == 1) {
              $state.reload($state.current);
              $uibModalInstance.dismiss();
              toastr.success(response.message);
            } else {
              toastr.error(response.message);
            }
          });
        }
        $scope.close = function () {
          $uibModalInstance.dismiss();
        }
      }]
    });
  }

  $scope.showEditUserModal = function(user_id) {
    NProgress.start();
    var modalInstance = $uibModal.open({
      templateUrl: "/templates/admins/users/edit.html",
      size: 'md',
      backdrop: 'static',
      keyboard: false,
      resolve: {
        user: ["API", function(API) {
          return API.getUser(user_id).then(function(response) {
            return response.data;
          });
        }],
        class_names: ['API', function(API) {
          return API.getAllClassNames().then(function(response) {
            return response.data;
          });
        }]
      },
      controller: ['$scope', 'user', '$uibModalInstance', 'toastr', '$state', 'API', 'class_names',
        function ($scope, user, $uibModalInstance, toastr, $state, API, class_names) {
        NProgress.done();
        $scope.user = user.data;
        $scope.class_names = class_names.data;
        $scope.editUser = function () {
          NProgress.start();
          API.updateUser(user_id, $scope.user).success(function (response) {
            NProgress.done();
            if(response.code == 1) {
              $state.reload($state.current);
              $uibModalInstance.dismiss();
              toastr.success(response.message);
            } else {
              toastr.error(response.message);
            }
          });
        }
        $scope.close = function () {
          $uibModalInstance.dismiss();
        }
      }]
    });
  }

  $scope.showDeleteUserModal = function(user) {
    $ngBootbox.confirm('Bạn chắc chắn muốn xóa "' + user.first_name + ' ' + user.last_name + '"?').then(function() {
      NProgress.start();
      API.deleteUser(user.id).success(function(response) {
        NProgress.done();
        if(response.code == 1) {
          $state.reload($state.current);
          toastr.success(response.message);
        } else {
          toastr.error(response.message);
        }
      });
    });
  }

  $scope.pageChanged = function() {
    $state.go($state.current, {page: $scope.currentPage});
  }
  $scope.search = function() {
    $state.go($state.current, {keyword: $scope.keyword});
  }
}]);
