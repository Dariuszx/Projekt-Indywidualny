angular.module('fileManagement.MockModule', [])
    .service('MockService', [function() {

        function getPliki() {
            return [{
                name: 'jakis plik',
                type: 'zip'
            }, {
                name: 'plik inny',
                type: 'rar'
            }]
        }

        return {
            getPliki: getPliki()
        };
    }]);