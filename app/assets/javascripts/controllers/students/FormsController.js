app.controller("FormsController", ['$scope', '$rootScope', '$state', 'toastr', 'API', '$uibModal', '$ngBootbox',
  function ($scope, $rootScope, $state, toastr, API, $uibModal, $ngBootbox) {

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
        $scope.createForm = function () {
          NProgress.start();
          API.createForm($scope.form).success(function (response) {
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
}]);
