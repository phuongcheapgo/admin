/**
 * Author : phuong.tran
 * Date   : 2017-03-09
 */

(function(){
    'use strict';

    angular.module('app').controller('account.add.controller',controller);

    /** @ngInject */
    function controller($scope, $state, $stateParams, accountAPI){
        $scope.saveAction = saveAction;
        $scope.cancelAction = cancelAction;



        /** Internal functions */

        function saveAction(data){
            var params = {
                username : data.username,
                password : data.password
            };


            accountAPI.addAccount(params).then(function(res){
                try {
                    if(res.data.success)
                    {
                        swal({
                                title: res.data.msg,
                                showConfirmButton: true,
                                type : 'success'
                            },function(){
                                $state.go('app.account');
                            });
                    }
                } catch (error) {
                    console.log(error);
                }
            });

        }

        function cancelAction(){
            $state.go('app.account');
        }
    }
})();