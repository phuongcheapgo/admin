/**
 * Author : phuong.tran
 * Date   : 2017-03-09
 */

(function(){
    'use strict';

    angular.module('app').controller('driver-types.add.controller',controller);

    /** @ngInject */
    function controller($scope, $state, $stateParams, driverTypesAPI){
        $scope.saveAction = saveAction;



        (function onInit(){
            getFormData();
        })();

        /** Internal functions */

        function getFormData(){
            var id = $stateParams.id;
            if(id)
            {
                driverTypesAPI.getDeriverTypeDetail(id).then(function(res){
                    try {
                        $scope.formData = res.data.result;
                    } catch (error) {
                        console.log(error);
                    }
                });
            }
            else
            {
                $scope.formData = {};
            }
        }

        function saveAction(data){
            console.log(data);
            var id = $stateParams.id;
            if(id)
            {

            }
            else
            {
                driverTypesAPI.addDriverType(data).then(function(res){
                    try {
                        if(res.data.success)
                        {
                            swal({
                                title: res.data.msg,
                                showConfirmButton: true,
                                type : 'success'
                            },function(){
                                $state.go('app.driver-types');
                            });
                        }
                    } catch (error) {
                        console.log(error);
                    }   
                });
            }
        }
    }
})();