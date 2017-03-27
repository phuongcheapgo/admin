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

        var ROOT_PATH = 'app/modules/drivers/views';
        // State definitions
        $stateProvider
            .state('app.drivers', {
                url: '/drivers',
                //controller : 'drivers.controller',
                template: '<ui-view></ui-view>',
                middleware: ['auth']
            })
            .state('app.drivers.list', {
                url: '/list',
                controller : 'drivers.controller.list',
                templateUrl: [ROOT_PATH,'drivers.user.html'].join('/'),
                middleware: ['auth']
            })
            .state('app.drivers.verify', {
                url: '/verify',
                controller : 'drivers.controller.list',
                templateUrl: [ROOT_PATH,'drivers.user.html'].join('/'),
                middleware: ['auth']
            })
            .state('app.drivers.not_verify', {
                url: '/verify',
                controller : 'drivers.controller.list',
                templateUrl: [ROOT_PATH,'drivers.user.html'].join('/'),
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
                templateUrl: [ROOT_PATH,'drivers.add.html'].join('/'),
                middleware: ['auth']
            })
    }

})();
