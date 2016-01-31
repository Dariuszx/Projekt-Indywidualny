
angular.module('fileManagement.SharedFilesModule', [])
    .controller('sharedFilesController', ['$scope', 'files', function($scope, files) {

        $scope.listaPlikow = files;
    }]);