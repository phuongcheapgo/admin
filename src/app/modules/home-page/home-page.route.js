/**
 * Author : phuong.tran
 * Date   : 2017-03-28
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
            .state('app.home-page', {
                url: '/home-page',
                templateUrl: 'app/modules/home-page/views/ga.html',
                middleware: ['auth']
            })
        ;
    }

})();
