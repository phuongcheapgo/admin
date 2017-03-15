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
                templateUrl: 'app/modules/drivers/views/drivers.user.html',
                data: {pageTitle: 'AngularJS Ui Select'},
                middleware: ['auth']
            })
            .state('app.drivers_add', {
                url: '/drivers_add/:id/user/{user}',
                params : {
                    id : {
                        value : null,
                        squash: true
                    },
                    user : {
                        value : null,
                        squash: true
                    }

                },
                controller : 'drivers.add.controller',
                templateUrl: 'app/modules/drivers/views/drivers.add.html',
                data: {pageTitle: 'AngularJS Ui Select'},
                middleware: ['auth']
            })
    }

})();
