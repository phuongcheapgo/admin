/**
 * Author : phuong.tran
 * Date   : 2017-03-07
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
            .state('app.drivers', {
                url: '/drivers',
                controller : 'drivers.controller',
                templateUrl: 'app/modules/drivers/views/drivers.list.html',
                data: {pageTitle: 'AngularJS Ui Select'},
            })
    }

})();
