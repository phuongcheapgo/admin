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
            .state('app.users', {
                url: '/users',
                controller : 'users.controller',
                templateUrl: 'app/modules/users/views/users.list.html',
                data: {pageTitle: 'AngularJS Ui Select'},
            })
            .state('app.user_add', {
                url: '/user_add/:id',
                params : {
                    id : null,
                    squash: true
                },
                controller : 'users.add.controller',
                templateUrl: 'app/modules/users/views/users.add.html',
                data: {pageTitle: 'AngularJS Ui Select'},
            })
    }

})();
