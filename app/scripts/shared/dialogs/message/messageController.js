/*
 * Kontroler, który wyświetla wiadomości w oknie dialogowym
 */

/* global dialogModule */

dialogModule.controller('messageDialogController', ['$scope', '$modalInstance', function ($scope, $modalInstance) {

    //Nagłówek dialogu
    $scope.header = $modalInstance.additionalFields.header;
    //Wiadomość
    $scope.message = $modalInstance.additionalFields.message;

    $scope.typ = $modalInstance.additionalFields.typ;

    switch ($scope.typ) {
        case 'OK':
            $scope.typ = 'success';
            break;
        case 'ERROR':
            $scope.typ = 'danger';
            break;
        case 'WARN':
            $scope.typ = 'warning';
            break;
        default:
            $scope.typ = 'info'
            break;
    }

    $('div.modal-backdrop').show();

    $scope.close = function () {
        $modalInstance.close('cancel');
        $('div.modal-backdrop').hide();
        $('body > div.modal.fade.ng-isolate-scope.in').hide();
    };

}]);