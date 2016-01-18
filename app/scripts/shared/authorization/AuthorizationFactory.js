/* global angular */

angular.module('fileManagement.AuthorizationModule')
    .factory('AuthorizationFactory', ['$rootScope', '$state', 'PrincipalFactory', 'dialogService', '$q',
        function ($rootScope, $state, PrincipalFactory, dialogService, $q) {

            return {
                /*
                 * Funkcja wywyoływana jest przed wywołaniem każdego kolejnego widoku
                 * W zależności od tego czy użytkownik jest zalogowany czy nie
                 * Oraz czy ma prawa dostępu do pliku
                 * Przekierowuje go do odpowiedniego widoku
                 */
                authorize:
                    function () {
                        var deffered = $q.defer();

                        /*
                         * Sprawdzam czy użytkownik jest zalogowany
                         */
                        PrincipalFactory.identity().then(
                            //Jeżeli jest zalogowany
                            function () {
                                var isAuthenticated = PrincipalFactory.isAuthenticated();

                                if ($rootScope.toState.data.roles &&
                                    $rootScope.toState.data.roles.length > 0 &&
                                    !PrincipalFactory.isInAnyRole($rootScope.toState.data.roles)) {

                                    if (isAuthenticated) {
                                        if (typeof $rootScope.fromState !== 'undefined') {
                                            $rootScope.toState = $rootScope.fromState;
                                            $rootScope.toStateParams = $rootScope.fromStateParams;
                                            $state.go($rootScope.fromState, $rootScope.fromStateParams);
                                        } else {
                                            //$state.go('site.home');
                                        }

                                        dialogService.showMessageDialog('ERROR', "Nie masz dostępu do tych zasobów.");
                                    }
                                    else {
                                        $rootScope.returnToState = $rootScope.toState;
                                        $rootScope.returnToStateParams = $rootScope.toStateParams;

                                        dialogService.showLoginDialog().then(function () {
                                            $state.go($rootScope.returnToState.name, $rootScope.returnToStateParams);
                                        });
                                    }
                                } else
                                    deffered.resolve();
                            },
                            //Jeżeli nie jest zalogowany
                            function () {
//                                                       if(typeof $rootScope.fromState !== 'undefined') {
//                                                          if($rootScope.fromState.name === 'site.home')
//                                                             return;
//                                                       } 

                                $rootScope.returnToState = $rootScope.toState;
                                $rootScope.returnToStateParams = $rootScope.toStateParams;

                                dialogService.showLoginDialog($rootScope.toState.name).then(function (result) {
                                    $state.go($rootScope.returnToState.name, $rootScope.returnToStateParams);
                                    deffered.resolve();

                                });
                            });

                        return deffered.promise;
                    }

            };
        }]);