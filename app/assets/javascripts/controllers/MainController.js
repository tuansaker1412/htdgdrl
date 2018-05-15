app.controller("MainController", ['$scope', '$rootScope', '$state', 'toastr', 'Auth', '$uibModal',
  function ($scope, $rootScope, $state, toastr, Auth, $uibModal) {
  $scope.signOut = function () {
    Auth.signOut();
    $state.go("signin");
  }
  $scope.state = $state;

  $scope.showEditPasswordModal = function() {
    NProgress.start();
    var modalInstance = $uibModal.open({
      templateUrl: "/templates/users/passwords/editpassword.html",
      size: 'sm',
      controller: ['$scope', '$uibModalInstance', '$state', 'toastr', 'Auth',
      function($scope, $uibModalInstance, $state, toastr, Auth) {
        NProgress.done();
        $scope.close = function () {
          $uibModalInstance.dismiss();
        }
        $scope.updatePassword = function() {
          NProgress.start();
          Auth.updatePassword($scope.new_password, $scope.current_password).then(function(response) {
            NProgress.done();
            if(response.data.code == 1) {
              $uibModalInstance.dismiss();
              toastr.success(response.data.message);
            } else {
              toastr.error(response.data.message);
            }
          });
        }
      }]
    })
  }
}]);
