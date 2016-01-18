/* global angular */

angular.module('fileManagement.AuthorizationModule')
    .factory('PrincipalFactory', ['$q', '$http', '$cookies', 'RestApi', '$rootScope',
        function ($q, $http, $cookies, RestApi, $rootScope) {

            var _identity = undefined;
            var _authenticated = false;

            /*
             * Sprawdzam czy podane dane użytkownika są poprawne
             * TODO zmienić na $q.defer
             */
            var checkUserCredentials =
                function (identity) {

                    var deffered = $q.defer();

                    $http({
                        method: 'POST',
                        url: RestApi.LOGIN_USER,
                        data: $.param({
                            j_username: identity.username,
                            j_password: identity.password,
                            authLoginForm: true
                        }),
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    })
                        .success(function (data, status, headers, config) {

                            if (data === 'OK')
                                deffered.resolve();
                            else
                                deffered.reject();
                        });

                    return deffered.promise;
                };

            return {
                authenticate:
                    function (identity) {

                        var deffered = $q.defer();

                        /*
                         * Jeżeli identity === null to oznacza, że chce się wylogować, jeżeli nie zdefiniowane
                         * to znaczy, że nie jestem zalogowany
                         */
                        _authenticated = identity === null || !angular.isDefined(identity) ? false : true;

                        _identity = identity;


                        if (_identity) {
                            //Sprawdzam w bazie danych autentyczność danych
                            checkUserCredentials(_identity).then(function () {
                                //Zalogowano poprawnie
                                deffered.resolve();
                            }, function () {
                                _identity = null;
                                deffered.reject(); //Porażka, błędne dane logowanie
                            });

                        } else {
                            _identity = null;
                            deffered.reject();
                            $cookies.remove('identity');
                        }
                        return deffered.promise;
                    },
                identity:
                    function () {
                        var deferred = $q.defer();

                        $http({
                            method: 'GET',
                            url: RestApi.IS_LOGGED,
                            headers: {
                                'Content-Type': 'text/plain'
                            }
                        }).success(function (data, status, headers, config) {

                            //Jeżeli serwer zwrócił null to oznacza, że jestem nie zalogowany
                            if (data !== 'null') {
                                _identity = {
                                    'username': data,
                                    'roles': ["Student"] //Na chwile obecną, każdy zalogowany użytkownik to Student
                                };
                                _authenticated = true;

                                $rootScope.identity = {
                                    username: data
                                };

                                deferred.resolve(data);
                                return;
                            } else {
                                _authenticated = false;
                                $rootScope.identity = null;
                                deferred.reject();
                            }
                        });

                        return deferred.promise;
                    },
                isAuthenticated:
                    function () {
                        return _authenticated;
                    },
                isIdentityResolved:
                    function () {
                        return (angular.isDefined(_identity) && _identity !== null);
                    },
                isInRole:
                    function (role) {
                        if (!_authenticated || !_identity.roles)
                            return false;

                        return _identity.roles.indexOf(role) !== -1;
                    },
                isInAnyRole:
                    function (roles) {
                        if (!_authenticated || !_identity.roles)
                            return false;

                        for (var i in roles)
                            if (this.isInRole(roles[i]))
                                return true;
                        return false;
                    },
                logout:
                    function () {

                        var deffered = $q.defer();

                        $http({
                            method: 'GET',
                            url: RestApi.LOGOUT_USER
                        })
                            .success(function (data, status, headers, config) {
                                $cookies.remove('identity');
                                if (data === 'OK')
                                    deffered.resolve();
                                else
                                    deffered.reject();
                            });


                        return deffered.promise;
                    }
            };
        }]);
