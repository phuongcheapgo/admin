/**
 * Author : phuong.tran
 * Date   : 2017-03-09
 */

(function(){
    'use strict';

    angular.module('app').controller('driver-types.add.controller',controller);

    /** @ngInject */
    function controller($scope, $state, $stateParams, driverTypesAPI, $timeout){
        $scope.saveAction = saveAction;

        $scope.cancelAction = cancelAction;
        $scope.selectFile = selectFile;


        (function onInit(){
            getFormData();
        })();

        /** Internal functions */

        function getFormData(){
            var id = $stateParams.id;
            if(id)
            {
                driverTypesAPI.getDriverTypeDetail(id).then(function(res){
                    try {
                        $scope.formData = res.data.result;

                        $scope.image = {
                            isNew : false,
                            src : $scope.formData.image
                        };

                    } catch (error) {
                        console.log(error);
                    }
                });
            }
            else
            {
                $scope.formData = {
                    is_activated : false
                };
            }
        }

        function saveAction(data){

            if($scope.image.isNew)
            {
                data.image = $scope.image;
            }

            var id = $stateParams.id;
            if(id)
            {
                driverTypesAPI.updateDriverType(id, data).then(function (res) {
                    try{
                        if(res.success)
                        {
                            swal({
                                title: res.msg,
                                showConfirmButton: true,
                                type : 'success'
                            },function(){
                                $state.go('app.configuration.driver-types');
                            });
                        }
                    }catch (e){
                        console.log(e);
                    }
                });
            }
            else
            {
                driverTypesAPI.addDriverType(data).then(function(res){
                    try {
                        if(res.success)
                        {
                            swal({
                                title: res.msg,
                                showConfirmButton: true,
                                type : 'success'
                            },function(){
                                $state.go('app.configuration.driver-types');
                            });
                        }
                    } catch (error) {
                        console.log(error);
                    }
                });
            }
        }

        function cancelAction() {
            $state.go('app.configuration.driver-types');
        }

        function selectFile(event) {
            var length = event.files.length;

            for(var i = 0; i < length; i++){
                var file = event.files[i];

                file.src = $scope.trustUrl(window.URL.createObjectURL(file));
                file.isNew = true;
                $timeout(function(){
                    $scope.image = file;
                },0);
            }

            event.value = null;
        }
    }
})();
