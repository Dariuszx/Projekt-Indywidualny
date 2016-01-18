/* global dialogModule */

dialogModule.controller('signUpDialogController', ['$scope', '$modalInstance', 'dialogService', 'RestApi', '$http',
    function ($scope, $modalInstance, dialogService, RestApi, $http) {

        $('div.modal-backdrop').show();

        $scope.close = function (nieWyswietlajLoginDialog) {
            $modalInstance.close('cancel');
            if (nieWyswietlajLoginDialog !== true)
                dialogService.showLoginDialog();
        };

        /*
         * Obserwuje zmienne password aby sprawdzić czy są takie same
         */
        $scope.$watchGroup(['password1', 'password2'], function () {
            if ($scope.password1 !== $scope.password2) {
                $scope.form.password2.$error.required = true;
                $scope.form.$invalid = true;
            }
            else {
                $scope.form.password2.$error.required = false;
            }
        });

        $scope.signUp = function () {

            var registrationData = {
                firstName: $scope.firstname,
                lastName: $scope.lastname,
                login: $scope.login,
                email: $scope.email,
                password: $scope.password1
            };
            $http({
                method: 'POST',
                url: RestApi.CREATE_ACCOUNT,
                data: $.param(registrationData),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
                .success(function (data, status, headers, config) {

                    /*
                     * Poprawnie zarejestrowano użytkownika
                     * Zamykam okno rejestracji i wyświetlam okno modlane wyświetlające 
                     * Wiadomość powodzenia
                     */
                    if (data === 'OK') {
                        dialogService.showMessageDialog('OK', "Dziękujemy za rejestrację! Na podany przez Ciebie adres email została wysłana wiadomość z linkiem aktywującym konto.");
                        $scope.close(true);
                    } else {
                        $scope.error = data;
                    }
                });
        };
    }]);