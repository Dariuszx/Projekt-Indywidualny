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
                        files: ['DataService', function(DataService) {
                            return DataService.getAllFiles().then(function(res) {
                                return res.data;
                            });
                        }]
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
                .state('root.search-user', {
                    url: '/search-user/:userId',
                    views: {
                        'content@': {
                            templateUrl: 'views/user-search/user-search.html',
                            controller: 'userSearchController'
                        }
                    }
                })
                .state('root.profile', {
                    url: '/profile/:profileId',
                    views: {
                        'content@': {
                            templateUrl: 'views/profile/profile.html',
                            controller: 'profileController'
                        }
                    }
                })

        }]);