/**
 * Author : phuong.tran
 * Date   : 2017-03-09
 */

(function (){
    'use strict';

    angular
        .module('app')
        .config(config);

    /** @ngInject */
    function config($stateProvider, $urlRouterProvider, $locationProvider)
    {

        var ROOT_PATH = 'app/modules/configuration/views';

        // State definitions
        $stateProvider
            .state('app.configuration', {
                url: '/configuration',
                abstract : true,
                template: '<div ui-view=""></div>'
            })
            .state('app.configuration.driver-types', {
                url: '/driver-types',
                controller : 'driver-types.controller',
                templateUrl: [ROOT_PATH,'driver-types.list.html'].join('/')
            })
            .state('app.configuration.driver-types-add', {
                url: '/driver-types-add/:id',
                params : {
                    id : {
                        value : null,
                        squash: true
                    }
                },
                controller : 'driver-types.add.controller',
                templateUrl: [ROOT_PATH,'driver-types.add.html'].join('/')
            })

    }

})();
