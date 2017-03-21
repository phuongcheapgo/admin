/**
 * Author : phuong.tran
 * Date   : 2017-03-13
 */

(function () {
  'use strict';
  angular.module('app').controller('vehicle-document.controller',controller);

  /** @ngInject */
  function controller($scope, vehicleDocAPI, DOCUMENT_CONFIG, $state, CONFIG) {


      $scope.host_image = [CONFIG.HOST_API,'api/admin/get-image/'].join('/');


    $scope.DOCUMENT_TYPE = DOCUMENT_CONFIG.TYPE;

    $scope.goAdd = goAdd;
    $scope.goEdit = goEdit;
    $scope.deleteAction = deleteAction;

    (function onInit() {
        getList();
    })();

    /** Internal functions */

    function getList() {
      vehicleDocAPI.getListDocument().then(function (res) {
          try{
            $scope.items = res.data.rows;
          }catch (e){

          }
      });
    }

    function goAdd(){
      $state.go('app.vehicle-document-add',{id : null});
    }

    function goEdit(object) {
        var id = [object.vehicle_id, object._id].join('-');
        $state.go('app.vehicle-document-add',{id : id});
    }

    function deleteAction(object) {
        var id = [object.vehicle_id, object._id].join('-');
        swal(
            {
                title: "Are you sure?",
                text: "You will not be able to recover this document!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: true
            },
            function(){
                vehicleDocAPI.removeDocument(id).then(function (res) {
                    try{
                        if(res.data.success)
                        {
                            swal({
                                title: res.data.msg,
                                showConfirmButton: true,
                                type : 'success'
                            },function(){
                                getList();
                            });
                        }
                    }catch (e){
                        console.log(e);
                    }
                });
            }
        );
    }
  }
})();
