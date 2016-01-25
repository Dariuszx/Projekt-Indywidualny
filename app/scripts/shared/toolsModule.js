
angular.module('fileManagement.ToolsModule', [])
    .value('RestApi', {
        GET_ALL_FILES: 'http://0.0.0.0:5000/file',
        GET_SHARED_FILES: 'http://0.0.0.0:5000/file/shared',
        LOGIN_USER: 'http://0.0.0.0:5000/user/login',
        IS_LOGGED: 'http://0.0.0.0:5000/user/principal',
        LOGOUT_USER: 'http://0.0.0.0:5000/user/logout',
        CREATE_ACCOUNT: 'http://0.0.0.0:5000/user/create',
        USER_LIST: 'http://0.0.0.0:5000/user/list',
        FILE_SHARE: 'http://0.0.0.0:5000/file/share/'

    })
    .service('DataService', ['$http', 'RestApi', function($http, RestApi) {

        var shareFile = function(file_id, user_id) {
            return $http({
                method: 'GET',
                url: RestApi.FILE_SHARE + file_id + '/' + user_id
            })
        };

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

        var getSharedFiles = function() {
          return $http({
              method: 'GET',
              url: RestApi.GET_SHARED_FILES
          })
        };

        var getUserList = function() {
            return $http({
                method: 'GET',
                url: RestApi.USER_LIST
            })
        };

        return {
            getFiles: getFiles,
            getSharedFiles: getSharedFiles,
            getUserList: getUserList,
            shareFile: shareFile
        }

    }]);

