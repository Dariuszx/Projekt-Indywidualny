'use strict';

// Declare app level module which depends on views, and components
angular.module('fileManagement', [
    'ui.router',
    'ui.bootstrap',
    'ngCookies',
    'ngAnimate',
    'fileManagement.HeaderModule',
    'fileManagement.Home',
    'fileManagement.WelcomePage',
    'fileManagement.UserSearch',
    'fileManagement.File',
    'fileManagement.ProfileModule',
    'fileManagement.ToolsModule',
    'fileManagement.AuthorizationModule',
    'fileManagement.DialogModule',
    'fileManagement.SharedFilesModule'
]);