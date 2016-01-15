
var homeModule = angular.module('fileManagement.Home', []);

homeModule.controller('homeController', ['$scope', 'files',
    function($scope, files) {

    $scope.listaPlikow = files;


}]);