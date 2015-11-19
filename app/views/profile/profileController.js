var profileModule = angular.module('fileManagement.ProfileModule', []);

profileModule.controller('profileController', ['$scope', '$stateParams', 'MockService',
    function($scope, $stateParams, MockService) {

        $scope.profile = MockService.getUser(parseInt($stateParams.profileId));

}]);