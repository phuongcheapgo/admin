/**
 * Author : phuong.tran
 * Date   : 2017-03-17
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
            .state('app.statistics', {
                url: '/statistics',
                abstract : true,
                template: '<div ui-view=""></div>',
                data: {pageTitle: 'AngularJS Ui Select'},
                middleware: ['auth']
            })
            .state('app.statistics.driver', {
                url: '/driver',
                controller : 'statistics.driver.controller',
                templateUrl: 'app/modules/statistics/views/statistics.driver.html',
                data: {pageTitle: 'AngularJS Ui Select'},
                middleware: ['auth']
            })
        ;
    }

})();
