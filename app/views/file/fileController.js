var fileController = angular.module('fileManagement.File', []);

fileController.controller('fileController', ['$scope', '$stateParams', 'MockService', function($scope, $stateParams, MockService) {

        $scope.file = MockService.getPlik(parseInt($stateParams.fileId));
        $scope.fileOwner = MockService.getUser(parseInt($scope.file.ownerId));

}]);