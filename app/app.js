'use strict';

// Declare app level module which depends on views, and components
angular.module('fileManagement', [
    'ui.router',
    'ui.bootstrap',
    'fileManagement.HeaderModule',
    'fileManagement.Home',
    'fileManagement.UserSearch',
    'fileManagement.File',
    'fileManagement.ProfileModule',
    'fileManagement.MockModule',
    'fileManagement.ToolsModule'
]);