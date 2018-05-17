app.controller("ApprovalStudentsController", ['$scope', '$rootScope', '$state', 'toastr', 'API', '$uibModal', '$ngBootbox', 'forms',
  function ($scope, $rootScope, $state, toastr, API, $uibModal, $ngBootbox, forms) {
  $scope.forms = forms;

  $scope.currentPage = $state.params.page || 1;
  $scope.pageChanged = function() {
    $state.go($state.current, {page: $scope.currentPage});
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

  $scope.showSendFormModal = function(form) {
    NProgress.start();
    API.sendForm(form).success(function(response) {
      NProgress.done();
      if(response.code == 1) {
        $state.reload($state.current);
        toastr.success(response.message);
      } else {
        toastr.error(response.message);
      }
    });
  }

  $scope.showBackFormModal = function(form) {
    NProgress.start();
    API.backForm(form).success(function(response) {
      NProgress.done();
      if(response.code == 1) {
        $state.reload($state.current);
        toastr.success(response.message);
      } else {
        toastr.error(response.message);
      }
    });
  }
}]);
