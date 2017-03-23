/**
 * Author : phuong.tran
 * Date   : 2017-03-22
 */

(function (){
    'use strict';

    angular
        .module('app')
        .config(config);

    /** @ngInject */
    function config($stateProvider, $urlRouterProvider, $locationProvider)
    {

        // State definitions
        $stateProvider
            .state('app.dashboard', {
                url: '/dashboard',
                controller : 'dashboard.controller',
                templateUrl: 'app/modules/dashboard/views/dashboard.html',
                data: {pageTitle: 'AngularJS Ui Select'},
                middleware: ['auth']
            });

    }

})();
