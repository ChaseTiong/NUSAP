'use strict';

/**
 * Route configuration for the RDash module.
 */
angular.module('NUSAP').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        // For unmatched routes
        $urlRouterProvider.otherwise('/');

        // Application routes
        $stateProvider
            .state('index', {
                url: '/',
                templateUrl: 'templates/dashboard.html',
                js: ['js/Chart.HorizontalBar.js','http://www.chartjs.org/assets/Chart.min.js']
            })
             .state('login', {
                url: '/login',
                templateUrl: 'templates/login.html'
            })
            .state('tables', {
                url: '/tables',
                templateUrl: 'templates/tables.html'
            });
    }
]);