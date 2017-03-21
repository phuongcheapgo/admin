/**
 * Author : phuong.tran
 * Date   : 2017-03-13
 */

(function(){
    'use strict';

    angular.module('app').controller('vehicle-document.add.controller',controller);

    /** @ngInject */
    function controller($scope, $state, $stateParams, DOCUMENT_CONFIG, vehicleDocAPI, $timeout, $sce, CONFIG){

        $scope.DOCUMENT_TYPE_ARRAY =  Object.keys(DOCUMENT_CONFIG.TYPE).map(function(key){
            var item = DOCUMENT_CONFIG.TYPE[key];
            return item;
        });

        $scope.host_image = [CONFIG.HOST_API,'api/admin/get-image/'].join('/');

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
                        $scope.formData = res.data.result;
                        $scope.file_names = $scope.formData.file_names.map(function (item) {
                            var object = {
                                src : trustUrl($scope.host_image + item),
                                isNew : false,
                                name : item
                            };

                            return object;
                        });
                    }catch (e){

                    }
                });
            }
            else
            {
                $scope.formData = {
                    file_names : []
                };
            }
        }

        function getDrivers(){
            vehicleDocAPI.getDrivers().then(function(res){
                try {
                    $scope.drivers = res.data.rows;
                } catch (error) {

                }
            });
        }

        function selectFile(event){

            var length = event.files.length;

            for(var i = 0; i < length; i++){
                var file = event.files[i];

                file.src = trustUrl(window.URL.createObjectURL(file));
                file.isNew = true;
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
                data.file_names = [];
                var formData = new FormData();

                $scope.file_names.forEach(function (item) {
                    if(item.isNew == false)
                    {
                        data.file_names.push(item.name);
                    }
                    else
                    {
                        formData.append('files',item);
                    }
                });




                for(var key in data){
                    if(angular.isArray(data[key]))
                    {
                        data[key] = JSON.stringify(data[key]);
                    }
                    formData.append(key,data[key]);
                }

                vehicleDocAPI.updateDocument(id,formData).then(function (res) {
                    try{
                        if(res.success)
                        {
                            swal({
                                title: res.msg,
                                showConfirmButton: true,
                                type : 'success'
                            },function(){
                                $state.go('app.vehicle-document');
                            });
                        }
                    }catch (e){
                        console.log(e);
                    }
                });
            }
            else
            {
                var formData = new FormData();

                $scope.file_names.forEach(function (item) {
                    if(item.isNew)
                    {
                        formData.append('files',item);
                    }
                });


                for(var key in data){


                    formData.append(key,data[key]);
                }

                vehicleDocAPI.addDocument(formData).then(function (res) {
                    try{

                        if(res.success)
                        {
                            swal({
                                title: res.msg,
                                showConfirmButton: true,
                                type : 'success'
                            },function(){
                                $state.go('app.vehicle-document');
                            });
                        }
                    }catch (e){
                        console.log(e);
                    }
                });
            }


        }
    }
})();
