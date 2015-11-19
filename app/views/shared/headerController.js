var headerModule = angular.module('fileManagement.HeaderModule', []);

headerModule.controller('headerController', ['$scope', '$state',
    function($scope, $state) {

        console.log($state);
        $scope.actualState = 0;

        switch($state.current.name) {
            case 'root.home':
                $scope.actualState = 0;
                break;
            case 'root.file':
                $scope.actualState = 1;
        }

}]);