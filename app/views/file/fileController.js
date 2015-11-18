var fileController = angular.module('fileManagement.File', []);

fileController.controller('fileController', ['$scope', '$stateParams', 'MockService', function($scope, $stateParams, MockService) {

        console.log($stateParams);

        $scope.file = MockService.getPlik(parseInt($stateParams.fileId));


}]);