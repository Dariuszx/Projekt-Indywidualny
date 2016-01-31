var fileController = angular.module('fileManagement.File', []);

fileController.controller('fileController', ['$scope', 'file', 'PrincipalFactory', 'dialogService',
    function ($scope, file, PrincipalFactory, dialogService) {
        $scope.file = file;
        $scope.file.isOwner = file.user_id === PrincipalFactory.getIdentity().user_id;
        $scope.file.date_added = new Date($scope.file.date_added.$date);

        $scope.shareFile = function() {
            dialogService.showShareDialog($scope.file);
        }


    }]);