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
            .state('app.account', {
                url: '/account',
                controller : 'account.controller',
                templateUrl: 'app/modules/account/views/account.list.html',
                data: {pageTitle: 'AngularJS Ui Select'},
                middleware: ['auth']
            })

            .state('app.account-add', {
                url: '/account-add/:id',
                params : {
                    id : null,
                    squash: true
                },
                controller : 'account.add.controller',
                templateUrl: 'app/modules/account/views/account.add.html',
                data: {pageTitle: 'AngularJS Ui Select'},
                middleware: ['auth']
            })
            
    }

})();
