(function ()
{
    'use strict';

    angular
        .module('app')
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider, $locationProvider)
    {
        $locationProvider.html5Mode(true);

        $urlRouterProvider.otherwise('/users');

        
        
        // State definitions
        $stateProvider
            .state('app', {
                url: '',
                // abstract: true,
                templateUrl: 'app/views/layout.html',
                data: {pageTitle: 'AngularJS Ui Select'},
                controller : 'index.controller'
            })
    }

})();
