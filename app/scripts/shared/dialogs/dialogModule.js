
/* global angular */

var dialogModule = angular.module('fileManagement.DialogModule', [])

    .service('dialogService', ['$modal', '$q',
        function ($modal, $q) {

            var commonProperties = {
                modalFade: false,
                windowClass: 'active',
                animation: true //Problem, bo zamknięciu okna ciemne tło nie znika, ustawiłem na false
            };

            var dialogs = {
                loginDialog: null,
                signUpDialog: null,
                messageDialog: null,
                shareDialog: null
            };

            /**
             * Metoda zajmuje się tworzeniem dialogów konkretnego typu
             * w zależności od tego jaka nazwa zostanie podana w pierwszym
             * parametrze funkcji. Dostepne nazwy okien dialogowych dostepne są
             * w obiekcie var dialogs
             * <p />
             *
             * @param {String} name nazwa dialogu do wyświetlenia
             * @param {Object} additionalProperties dodatkowe ustawienia okna dialogowego
             * @param {Object} additionalFields dodatkowe pola dołączone do okna modalnego, które później można wyświetlać w widoku
             * @return {promise}
             */
            var showDialog = function (name, additionalProperties, additionalFields) {

                var deffered = $q.defer();

                if (dialogs[name] !== null)
                    dialogs[name].close('cancel');

                var properties = $.extend(commonProperties, additionalProperties);

                dialogs[name] = $modal.open(properties);
                dialogs[name].deffered = deffered;

                dialogs[name].result.then(function () {

                    },
                    function (result) {
                        $('div.modal-backdrop').hide();
                        $('body > div.modal.fade.ng-isolate-scope.in').hide();
                    });

                if (typeof additionalFields !== 'undefined') dialogs[name].additionalFields = additionalFields;

                return deffered.promise;
            };

            return {
                showLoginDialog: function () {

                    var modalProperties = {
                        templateUrl: 'scripts/shared/dialogs/login/login.html',
                        controller: 'LoginDialogController',
                        backdrop: 'static',
                        keyboard: false
                    };

                    return showDialog('loginDialog', modalProperties);

                },
                showMessageDialog: function (typ, customMessage) {
                    var modalProperties = {
                        templateUrl: 'scripts/shared/dialogs/message/message.html',
                        controller: 'messageDialogController',
                        backdrop: true,
                        keyboard: true
                    };

                    var message, header;

                    switch (typ) {
                        case 'OK':
                            header = 'Ok';
                            message = 'System poprawnie wykonał zadanie.';
                            break;
                        case 'ERROR':
                            header = 'Błąd!';
                            message = 'Wystąpił nieoczekiwany błąd.';
                            break;
                        case 'WARNING':
                            header = 'Ostrzeżenie';
                            message = 'Jakieś ostrzeżenie';
                            break;
                    }

                    if (typeof customMessage !== 'undefined') message = customMessage;

                    return showDialog('messageDialog', modalProperties, {
                        header: header,
                        message: message,
                        typ: typ
                    });

                },
                showSignUpDialog: function () {

                    var modalProperties = {
                        templateUrl: 'scripts/shared/dialogs/signUp/signUpDialog.html',
                        controller: 'signUpDialogController',
                        backdrop: 'static',
                        keyboard: false
                    };

                    return showDialog('signUpDialog', modalProperties);
                },
                showShareDialog: function(data) {

                    var modalProperties = {
                        templateUrl: 'scripts/shared/dialogs/share/shareDialog.html',
                        controller: 'shareDialogController',
                        backdrop: 'static',
                        keyboard: false
                    };

                    return showDialog('shareDialog', modalProperties, {
                        data: data
                    });
                }
            };
        }]);
       