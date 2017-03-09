/**
 * Author : phuong.tran
 * Date   : 2017-03-09
 */

(function(){
    'use strict';

    angular.module('app').controller('account.controller',controller);

    /** @ngInject */
    function controller($scope, accountAPI, $state){
        $scope.goAdd = goAdd;

        (function onInit(){
            getList();
        })();

        function getList(){
            accountAPI.getAccountList().then(function(res){
                try {
                    $scope.items = res.data.rows;
                } catch (error) {
                    console.log(error);
                }
            });
        }

        function goAdd(){
            $state.go('app.account-add',{id : null});
        }
    }
})();