angular.module('eventLocatorApp')
    .config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('root', {
                    url: '',
                    abstract: true,
                    views: {
                        'header': {
                            templateUrl: 'views/shared/user-header.html'
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

        }]);