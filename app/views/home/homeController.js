
var homeModule = angular.module('eventLocatorApp.Home', []);

homeModule.controller('homeController', ['$scope', 'mockData', function($scope, mockData) {

    $scope.listaPlikow = mockData;

}]);