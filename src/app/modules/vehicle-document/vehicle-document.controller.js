/**
 * Author : phuong.tran
 * Date   : 2017-03-13
 */

(function () {
  'use strict';
  angular.module('app').controller('vehicle-document.controller',controller);

  /** @ngInject */
  function controller($scope, vehicleDocAPI, DOCUMENT_CONFIG, $state) {

    $scope.DOCUMENT_TYPE = DOCUMENT_CONFIG.TYPE;

    $scope.goAdd = goAdd;

    (function onInit() {
        getList();
    })();

    /** Internal functions */

    function getList() {
      vehicleDocAPI.getListDocument().then(function (res) {
          try{
            console.log(res);
            $scope.items = res.data.rows;
          }catch (e){

          }
      });
    }

    function goAdd(){
      $state.go('app.vehicle-document-add',{id : null});
    }
  }
})();
