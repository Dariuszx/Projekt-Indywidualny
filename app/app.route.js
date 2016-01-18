angular.module('fileManagement')
    .config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('root', {
                    url: '',
                    abstract: true,
                    views: {
                        'header': {
                            templateUrl: 'scripts/views/header/user-header.html',
                            controller: 'headerController'
                        }
                    },
                    resolve: {
                        authorize: ['AuthorizationFactory',
                            function (AuthorizationFactory) {
                                return AuthorizationFactory.authorize();
                            }]
                    }
                })
                .state('root.welcome', {
                    url: '/welcome',
                    views: {
                        'content@': {
                            templateUrl: 'scripts/views/welcomePage/welcomePage.html',
                            controller: 'welcomePageController'
                        }
                    },
                    data: {
                        roles: []
                    }
                })
                .state('root.home', {
                    url: '/',
                    views: {
                        'content@': {
                            templateUrl: 'scripts/views/home/home.html',
                            controller: 'homeController'
                        }
                    },
                    resolve: {
                        files: ['DataService', function(DataService) {
                            return DataService.getFiles().then(function(res) {
                                return res.data;
                            });
                        }]
                    },
                    data: {
                        roles: []
                    }
                })
                .state('root.file', {
                    url: '/file/:fileId',
                    views: {
                        'content@': {
                            templateUrl: 'scripts/views/file/file.html',
                            controller: 'fileController'
                        }
                    },
                    resolve: {
                        file: ['DataService', '$stateParams', function(DataService, $stateParams) {
                            return DataService.getFiles($stateParams.fileId).then(function(res) {
                                return res.data;
                            })
                        }]
                    },
                    data: {
                        roles: []
                    }
                })
                .state('root.search-user', {
                    url: '/search-user/:userId',
                    views: {
                        'content@': {
                            templateUrl: 'scripts/views/user-search/user-search.html',
                            controller: 'userSearchController'
                        }
                    },
                    data: {
                        roles: []
                    }
                })
                .state('root.profile', {
                    url: '/profile/:profileId',
                    views: {
                        'content@': {
                            templateUrl: 'scripts/views/profile/profile.html',
                            controller: 'profileController'
                        }
                    },
                    data: {
                        roles: []
                    }
                })

        }]);