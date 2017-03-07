/**
 * Author : phuong.tran
 * Date   : 2017-03-08
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
            .state('login', {
                url: '/login',
                controller : 'login.controller',
                templateUrl: 'app/modules/login/views/login.form.html',
                data: {pageTitle: 'AngularJS Ui Select'},
            })
    }

})();
