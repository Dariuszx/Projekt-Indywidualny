angular.module('fileManagement.MockModule', [])
    .service('MockService', [function() {

        function getPliki() {
            return [{
                id: 232,
                name: 'jakis plik',
                type: 'zip'
            }, {
                id: 111,
                name: 'plik inny',
                type: 'rar'
            }]
        }

        return {
            getPliki: getPliki()
        };
    }]);