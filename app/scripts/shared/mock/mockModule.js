angular.module('fileManagement.MockModule', [])
    .service('MockService', [function() {

        var data = [{
            id: 232,
            name: 'jakis plik',
            type: 'zip',
            ownerId: 1
        }, {
            id: 111,
            name: 'plik inny',
            type: 'rar',
            ownerId: 2
        }];

        var users = [{
            id: 1,
            nick: 'kowalj',
            name: 'Jan Kowalski',
            role: 'iOS Developer'
        }, {
            id: 2,
            nick: 'dybkad',
            name: 'Dariusz Dybka',
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

        function getUser(userId) {
            for(var i in users) {
                if(users[i].id === userId)
                    return users[i];
            }
        }


        return {
            getPliki: getPliki(),
            getPlik: getPlik,
            getUser: getUser
        };
    }]);