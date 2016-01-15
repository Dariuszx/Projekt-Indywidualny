
angular.module('fileManagement.ToolsModule', [])
    .value('RestApi', {
       GET_ALL_FILES: 'http://0.0.0.0:5000/file'
    })
    .service('DataService', ['$http', 'RestApi', function($http, RestApi) {

        var getAllFiles = function() {
            return $http({
                method: 'GET',
                url: RestApi.GET_ALL_FILES
            });
        };

        return {
            getAllFiles: getAllFiles
        }

    }]);

