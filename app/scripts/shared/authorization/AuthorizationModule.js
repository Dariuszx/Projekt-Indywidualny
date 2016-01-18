/* global angular */

angular.module('fileManagement.AuthorizationModule', [])
    .run(['$rootScope', 'AuthorizationFactory', 'PrincipalFactory',
        function ($rootScope, AuthorizationFactory, PrincipalFactory) {

            $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {


                $rootScope.fromStateParams = $rootScope.toStateParams;
                $rootScope.fromState = $rootScope.toState;


                $rootScope.toStateParams = toStateParams;
                $rootScope.toState = toState;

                //TODO tutaj może wystąpić problem z autoryzacją, jeszcze nie wiem dlaczego
                if (PrincipalFactory.isIdentityResolved())
                    AuthorizationFactory.authorize();
            });
        }]);

