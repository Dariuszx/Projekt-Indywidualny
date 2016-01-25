/*
 * Kontroler dla okna logowania użytkownika
 */

/* global dialogModule */

dialogModule.controller('shareDialogController', ['$scope', '$modalInstance', 'PrincipalFactory', '$state', 'DataService',
    function ($scope, $modalInstance, PrincipalFactory, $state, DataService) {

        $('div.modal-backdrop').show();

        $scope.file = $modalInstance.additionalFields.data;
        $scope.data = [];

        DataService.getUserList().then(function(res) {
            $scope.userList = res.data;
        });

        $scope.shareFile = function() {
            console.log('dd');
        };


        $scope.close = function () {
            $modalInstance.close('cancel');
            $('div.modal-backdrop').hide();
            $('div.modal.fade.ng-isolate-scope.active').hide();
            $('body > div.modal.fade.ng-isolate-scope.in').hide();
        };

    }
]);