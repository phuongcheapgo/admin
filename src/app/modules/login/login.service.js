/**
 * Author : phuong.tran
 * Date   : 2017-03-09
 */

(function(){
    'use strict';

    angular.module('app').service('loginAPI',service);

    function service($http, CONFIG){
        var HOST_API = CONFIG.HOST_API;

        this.signIn = signIn;


        function signIn(params){
            var url = [HOST_API,'api/admin/sign-in'].join('/');
            return $http.post(url, params);
        }
    }
})();