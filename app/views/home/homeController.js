
var homeModule = angular.module('eventLocatorApp.Home', []);

homeModule.controller('homeController', ['$scope', 'mockData', function($scope, mockData) {


    console.log(mockData);
    $scope.listaPlikow = mockData;

}]);