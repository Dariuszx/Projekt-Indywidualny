
var homeModule = angular.module('fileManagement.Home', []);

homeModule.controller('homeController', ['$scope', 'mockData', function($scope, mockData) {

    $scope.listaPlikow = mockData;

}]);