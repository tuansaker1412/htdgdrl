app.controller("AdminStudentsController", ['$scope', '$rootScope', '$state', 'toastr', 'API', '$uibModal', '$ngBootbox', 'students',
  function ($scope, $rootScope, $state, toastr, API, $uibModal, $ngBootbox, students) {
  $scope.students = students;

  $scope.keyword = $state.params.keyword;
  $scope.currentPage = $state.params.page || 1;
  $scope.showCreateStudentModal = function() {
    NProgress.start();
    var modalInstance = $uibModal.open({
      templateUrl: "/templates/admins/students/create.html",
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
        $scope.student = {};
        $scope.class_names = class_names.data;
        $scope.createStudent = function () {
          NProgress.start();
          API.createStudent($scope.student).success(function (response) {
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

  $scope.showEditStudentModal = function(student_id) {
    NProgress.start();
    var modalInstance = $uibModal.open({
      templateUrl: "/templates/admins/students/edit.html",
      size: 'md',
      backdrop: 'static',
      keyboard: false,
      resolve: {
        student: ["API", function(API) {
          return API.getStudent(student_id).then(function(response) {
            return response.data;
          });
        }],
        class_names: ['API', function(API) {
          return API.getAllClassNames().then(function(response) {
            return response.data;
          });
        }]
      },
      controller: ['$scope', 'student', '$uibModalInstance', 'toastr', '$state', 'API', 'class_names',
        function ($scope, student, $uibModalInstance, toastr, $state, API, class_names) {
        NProgress.done();
        $scope.student = student.data;
        $scope.class_names = class_names.data;
        $scope.editStudent = function () {
          NProgress.start();
          API.updateStudent(student_id, $scope.student).success(function (response) {
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

  $scope.showDeleteStudentModal = function(student) {
    $ngBootbox.confirm('Bạn chắc chắn muốn xóa "' + student.first_name + ' ' + student.last_name + '"?').then(function() {
      NProgress.start();
      API.deleteStudent(student.id).success(function(response) {
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
