angular.module('fileManagement')
    .config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('root', {
                    url: '',
                    abstract: true,
                    views: {
                        'header': {
                            templateUrl: 'views/shared/user-header.html',
                            controller: 'headerController'
                        }
                    }
                })
                .state('root.home', {
                    url: '/',
                    views: {
                        'content@': {
                            templateUrl: 'views/home/home.html',
                            controller: 'homeController'
                        }
                    },
                    resolve: {
                        mockData: function($timeout, MockService) {
                            return $timeout(function() {
                                var test = MockService.getPliki;
                                return test;
                            }, 300);
                        }
                    }
                })
                .state('root.file', {
                    url: '/file/:fileId',
                    views: {
                        'content@': {
                            templateUrl: 'views/file/file.html',
                            controller: 'fileController'
                        }
                    }
                })
                .state('root.userFiles', {
                    url: '/usersearch',
                    views: {
                        'content@': {
                            templateUrl: 'views/usersearch/userSearch.html',
                            controller: 'userSearchController'
                        }
                    }
                })

        }]);