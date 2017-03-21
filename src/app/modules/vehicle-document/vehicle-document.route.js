/**
 * Author : phuong.tran
 * Date   : 2017-03-13
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
      .state('app.vehicle-document', {
        url: '/vehicle-document/:id',
        params : {
            id : {
                value : null,
                squash: true
            }
        },
        controller : 'vehicle-document.controller',
        templateUrl: 'app/modules/vehicle-document/views/vehicle-document.list.html',
        data: {pageTitle: 'AngularJS Ui Select'},
        middleware: ['auth']
      })
      .state('app.vehicle-document-add', {
        url: '/vehicle-document-add/:id',
        params : {
            id : {
                value : null,
                squash: true
            }
        },
        controller : 'vehicle-document.add.controller',
        templateUrl: 'app/modules/vehicle-document/views/vehicle-document.add.html',
        data: {pageTitle: 'AngularJS Ui Select'},
        middleware: ['auth']
      })
  }

})();
