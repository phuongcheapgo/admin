/**
 * Author : phuong.tran
 * Date   : 2017-03-09
 */

(function(){
    'use strict';

    angular.module('app').service('loginAPI',service);

    function service($http){
        var HOST_API = '//localhost:5050';

        this.signIn = signIn;


        function signIn(params){
            var url = [HOST_API,'api/admin/sign-in'].join('/');
            return $http.post(url, params);
        }
    }
})();