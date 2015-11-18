angular.module('fileManagement.MockModule', [])
    .service('MockService', [function() {

        var data = [{
            id: 232,
            name: 'jakis plik',
            type: 'zip'
        }, {
            id: 111,
            name: 'plik inny',
            type: 'rar'
        }];

        var users = [{
            id: 1,
            nick: 'dybkad',
            role: 'Developer'
        }]


        function getPliki() {
            return data;
        }

        function getPlik(plikId) {
            for(var i in data) {
                if(data[i].id === plikId)
                    return data[i];
            }
            return false;
        }




        return {
            getPliki: getPliki(),
            getPlik: getPlik
        };
    }]);