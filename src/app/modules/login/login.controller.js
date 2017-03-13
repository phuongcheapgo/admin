/**
 * Author : phuong.tran
 * Date   : 2017-03-08
 */

(function(){
    'use strict';

    angular.module('app').controller('login.controller',controller);

    /** @ngInject */
    function controller($scope, $localStorage, $state , $timeout, loginAPI){
        console.log('login controller');


        $scope.signIn = signIn;

        /** Internal functions */
        function signIn(data){
          $('.alert').removeClass('in');

            var params = {
                username : data.username,
                password : data.password
            };

            loginAPI.signIn(params).then(function(res){
                try {
                    $localStorage.AUTHENTICATE_TOKEN = res.data.token.token;
                    $localStorage.USER_DATA = res.data.result;

                    $timeout(function(){
                        $state.go('app.users');
                    },500);

                } catch (error) {
                    $('.alert').addClass('in');
                }

            });
        }
    }
})();
