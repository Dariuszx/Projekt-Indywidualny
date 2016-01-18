var fileController = angular.module('fileManagement.File', []);

fileController.controller('fileController', ['$scope', 'file',
    function ($scope, file) {
        $scope.file = file
        $scope.file.date_added = new Date($scope.file.date_added.$date)
    }]);