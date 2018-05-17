app.controller("ClassNamesController", ['$scope', '$rootScope', '$state', 'toastr', 'API', '$uibModal', '$ngBootbox', 'class_names',
  function ($scope, $rootScope, $state, toastr, API, $uibModal, $ngBootbox, class_names) {
  $scope.class_names = class_names;

  $scope.keyword = $state.params.keyword;
  $scope.class_name = {};
  $scope.currentPage = $state.params.page || 1;
  $scope.showCreateClassNameModal = function() {
    NProgress.start();
    var modalInstance = $uibModal.open({
      templateUrl: "/templates/admins/class_names/create.html",
      size: 'md',
      backdrop: 'static',
      keyboard: false,
      controller: ['$scope', '$uibModalInstance', 'toastr', '$state', 'API',
        function($scope, $uibModalInstance, toastr, $state, API) {
        NProgress.done();
        $scope.createClassName = function () {
          NProgress.start();
          API.createClassName($scope.class_name).success(function (response) {
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

  $scope.showEditClassNameModal = function(class_name_id) {
    NProgress.start();
    var modalInstance = $uibModal.open({
      templateUrl: "/templates/admins/class_names/edit.html",
      size: 'md',
      backdrop: 'static',
      keyboard: false,
      resolve: {
        class_name: ["API", function(API) {
          return API.getClassName(class_name_id).then(function(response) {
            return response.data;
          });
        }]
      },
      controller: ['$scope', 'class_name', '$uibModalInstance', 'toastr', '$state', 'API',
        function ($scope, class_name, $uibModalInstance, toastr, $state, API) {
        NProgress.done();
        $scope.class_name = class_name.data;
        $scope.editClassName = function () {
          NProgress.start();
          API.updateClassName(class_name_id, $scope.class_name).success(function (response) {
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

  $scope.showDeleteClassNameModal = function(class_name) {
    $ngBootbox.confirm('Bạn chắc chắn muốn xóa "' + class_name.name + '"?').then(function() {
      NProgress.start();
      API.deleteClassName(class_name.id).success(function(response) {
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
