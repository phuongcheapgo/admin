/**
 * Author : phuong.tran
 * Date   : 2017-03-09
 */

(function(){
    'use strict';

    angular.module('app').service('accountAPI',service);

    /** @ngInject */
    function service($http){
        var HOST_API = '//localhost:5050';

        this.getAccountList = getAccountList;
        this.addAccount = addAccount;

        /** Internal functions */

        function getAccountList(params){
            var url = [HOST_API,'api/admin/get'].join('/');
            return $http.get(url,{params : params });
        }

        function addAccount(params){
            var url = [HOST_API,'api/admin/create'].join('/');
            return $http.post(url,params);
        }
    }
})();