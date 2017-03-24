/**
 * Author : phuong.tran
 * Date   : 2017-03-09
 */

(function(){
    'use strict';

    angular.module('app').controller('driver-types.controller',controller);

    /** @ngInject */
    function controller($scope, $state, driverTypesAPI, CONFIG){

        $scope.host_image = [CONFIG.HOST_API,'api/admin/get-image/'].join('/');

        $scope.goEdit = goEdit;
        $scope.goAdd = goAdd;
        $scope.changeStatus = changeStatus;

        (function onInit(){
            getList();
        })();

        function getList(){
            driverTypesAPI.getDriverType().then(function(res){
                try {
                    $scope.items = res.data.rows;
                } catch (error) {

                }
            });
        }

        function goEdit(id){
            $state.go('app.configuration.driver-types-add',{id : id});
        }

        function goAdd(){
            $state.go('app.configuration.driver-types-add',{id : null});
        }

        function changeStatus(id, status) {
            var params = {
                status : status
            };
            driverTypesAPI.changeStatus(id,params).then(function(res){
                try {
                    if(res.data.success)
                    {
                        swal({
                            title: res.data.msg,
                            showConfirmButton: true,
                            type : 'success'
                        });
                    }
                } catch (error) {
                    console.log(error);
                }
            });
        }



        $scope.$on('tableSortUpdate',function (event,data) {
            console.log(data);


            var params = {
                order : data
            };

            driverTypesAPI.orderPosition(params).then(function (res) {
                
                if(res.data.success)
                {
                    swal({
                        title: res.data.msg,
                        showConfirmButton: true,
                        type : 'success'
                    });
                }
            });
        })
    }
})();
