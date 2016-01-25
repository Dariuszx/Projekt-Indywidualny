var headerModule = angular.module('fileManagement.HeaderModule', []);

headerModule.controller('headerController', ['$scope', '$state', 'PrincipalFactory',
    function($scope, $state, PrincipalFactory) {

        $scope.identity = PrincipalFactory.getIdentity();
        $scope.actualState = 0;

        switch($state.current.name) {
            case 'root.home':
                $scope.actualState = 0;
                break;
            case 'root.file':
                $scope.actualState = 1;
        }

        $scope.logout = function () {
            PrincipalFactory.logout().then(function () {
//                        $state.go('site.home({hash:hash})');
                if ($state.is('root.welcome'))
                    $state.reload();
                else
                    $state.go('root.welcome');
            });
        };

}]);