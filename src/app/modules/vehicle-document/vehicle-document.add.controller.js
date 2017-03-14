/**
 * Author : phuong.tran
 * Date   : 2017-03-13
 */

(function(){
    'use strict';

    angular.module('app').controller('vehicle-document.add.controller',controller);

    /** @ngInject */
    function controller($scope, $state, $stateParams, DOCUMENT_CONFIG, vehicleDocAPI, $timeout, $sce){

        $scope.DOCUMENT_TYPE_ARRAY =  Object.keys(DOCUMENT_CONFIG.TYPE).map(function(key){
            var item = DOCUMENT_CONFIG.TYPE[key];
            return item;
        });

        $scope.selectFile = selectFile;
        $scope.saveAction = saveAction;


        $scope.file_names = [];

        (function onInit(){
            getFormData();
            getDrivers();
        })();

        function getFormData(){
            var id = $stateParams.id;
            if(id)
            {
                vehicleDocAPI.getDetail(id).then(function (res) {
                    try{
                        console.log(res);
                        $scope.formData = res.data.result;
                    }catch (e){

                    }
                });
            }
            else
            {
                $scope.formData = {};
            }
        }

        function getDrivers(){
            vehicleDocAPI.getDrivers().then(function(res){
                try {
                    $scope.drivers = res.data.rows;
                } catch (error) {

                }
            });
        };

        function selectFile(event){

            var length = event.files.length;

            for(var i = 0; i < length; i++){
                var file = event.files[i];

                file.src = trustUrl(window.URL.createObjectURL(file));
                $timeout(function(){
                    $scope.file_names.push(file);
                },0);
            }

            event.value = null;
        }

        function trustUrl(url){
            return $sce.trustAsResourceUrl(url);
        }

        function saveAction(data) {

            var id = $stateParams.id;
            if(id)
            {
                vehicleDocAPI.updateDocument(id,data).then(function (res) {
                    try{
                        if(res.data.success)
                        {
                            swal({
                                title: res.data.msg,
                                showConfirmButton: true,
                                type : 'success'
                            },function(){
                                $state.go('app.vehicle-document');
                            });
                        }
                    }catch (e){
                        console.log(error);
                    }
                });
            }
            else
            {
                vehicleDocAPI.addDocument(data).then(function (res) {
                    try{

                        try {
                            if(res.data.success)
                            {
                                swal({
                                    title: res.data.msg,
                                    showConfirmButton: true,
                                    type : 'success'
                                },function(){
                                    $state.go('app.vehicle-document');
                                });
                            }
                        } catch (error) {
                            console.log(error);
                        }
                    }catch (e){

                    }
                });
            }


        }
    }
})();
