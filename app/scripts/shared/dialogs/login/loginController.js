/*
 * Kontroler dla okna logowania użytkownika
 */

/* global dialogModule */

dialogModule.controller('LoginDialogController', ['$scope', '$modalInstance', 'PrincipalFactory', 'dialogService', '$state',
    function ($scope, $modalInstance, PrincipalFactory, dialogService, $state) {

        $('div.modal-backdrop').show();

        $scope.close = function () {
            $modalInstance.close('cancel');
            $('div.modal-backdrop').hide();
            $('div.modal.fade.ng-isolate-scope.active').hide();
            $('body > div.modal.fade.ng-isolate-scope.in').hide();
        };

        $scope.signIn = function () {

            PrincipalFactory.authenticate({
                username: $scope.username,
                password: $scope.password
            }).then(function () {
                $modalInstance.deffered.resolve();
                $scope.close();
                $state.go('site.home');
            }, function () {
                $scope.error = "Niepoprawne hasło lub nazwa użytkownika";
            });
        };

        $scope.signUpButton = function () {
            $scope.close();
            dialogService.showSignUpDialog();
        };

        $scope.renewPasswordButton = function () {
            $scope.close();
            dialogService.showRenewPasswordDialog();
        };
    }
]);