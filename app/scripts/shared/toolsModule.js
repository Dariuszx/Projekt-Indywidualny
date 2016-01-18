
angular.module('fileManagement.ToolsModule', [])
    .value('RestApi', {
        GET_ALL_FILES: 'http://0.0.0.0:5000/file',
        LOGIN_USER: 'http://0.0.0.0:5000/user/login',
        IS_LOGGED: 'http://0.0.0.0:5000/user/principal',
        LOGOUT_USER: 'http://0.0.0.0:5000/user/logout',
        CREATE_ACCOUNT: 'http://0.0.0.0:5000/user/create'

    })
    .service('DataService', ['$http', 'RestApi', function($http, RestApi) {

        var getFiles = function(file_id) {

            if(typeof file_id === 'undefined') {
                return $http({
                    method: 'GET',
                    url: RestApi.GET_ALL_FILES
                });
            } else {
                return $http({
                    method: 'GET',
                    url: RestApi.GET_ALL_FILES + "/" + file_id
                });
            }
        };

        return {
            getFiles: getFiles
        }

    }]);

