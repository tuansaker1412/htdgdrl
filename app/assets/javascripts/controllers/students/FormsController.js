app.controller("FormsController", ['$scope', '$rootScope', '$state', 'toastr', 'API', '$uibModal', '$ngBootbox', 'forms',
  function ($scope, $rootScope, $state, toastr, API, $uibModal, $ngBootbox, forms) {
  $scope.forms = forms;

  $scope.showCreateFormModal = function() {
    NProgress.start();
    var modalInstance = $uibModal.open({
      templateUrl: "/templates/students/forms/create.html",
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      controller: ['$scope', '$uibModalInstance', 'toastr', '$state', 'API',
        function($scope, $uibModalInstance, toastr, $state, API) {
        NProgress.done();
        $scope.addform = {};
        $scope.createForm = function () {
          NProgress.start();;
          API.createForm($scope.addform).success(function (response) {
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

  $scope.showViewFormModal = function(form_id) {
    var modalInstance = $uibModal.open({
      templateUrl: "/templates/students/forms/show.html",
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      resolve: {
        view_form: ['API', function(API) {
          return API.getForm(form_id).then(function(response) {
            return response.data;
          });
        }]
      },
      controller: ['$scope', '$filter', '$uibModalInstance', 'toastr', '$state', 'view_form',
        function($scope, $filter, $uibModalInstance, toastr, $state, view_form) {
        $scope.addform = view_form.data;

        $scope.close = function () {
          $uibModalInstance.dismiss();
        }
      }]
    });
  }

  $scope.showEditFormModal = function(form_id) {
    NProgress.start();
    var modalInstance = $uibModal.open({
      templateUrl: "/templates/students/forms/edit.html",
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      resolve: {
        edit_form: ['API', function(API) {
          return API.getForm(form_id).then(function(response) {
            return response.data;
          });
        }]
      },
      controller: ['$scope', 'edit_form', '$uibModalInstance', 'toastr', '$state', 'API',
        function ($scope, edit_form, $uibModalInstance, toastr, $state, API) {
        NProgress.done();
        $scope.addform = edit_form.data;
        $scope.editForm = function () {
          NProgress.start();
          API.updateForm(form_id, $scope.addform).success(function (response) {
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

  $scope.showDeleteFormModal = function(form) {
    $ngBootbox.confirm('Bạn chắc chắn muốn xóa ?').then(function() {
      NProgress.start();
      API.deleteForm(form.id).success(function(response) {
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
}]);
