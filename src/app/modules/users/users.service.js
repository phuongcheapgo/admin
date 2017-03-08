/**
 * Author : phuong.tran
 * Date   : 2017-03-08
 */

(function(){
    'use strict';

    angular.module('app').service('usersAPI',service);

    /** @ngInject */
    function service($http){
        var HOST_API = '//localhost:5050';

        this.getUsers = getUsers;
        this.getUserDetail = getUserDetail;
        this.addUser = addUser;
        this.updateUser = updateUser;

        function getUsers(params){

            var url = [HOST_API,'api/admin/users/get'].join('/');
            return $http.get(url,{params : params });
        }

        function getUserDetail(id){
            var url = [HOST_API,'api/admin/users/detail',id].join('/');
            return $http.get(url);
        }

        function addUser(params){
            var url = [HOST_API,'api/admin/users/create'].join('/');
            return $http.post(url,params);
        }

        function updateUser(id, params){
            var url = [HOST_API,'api/admin/users/update',id].join('/');
            return $http.put(url,params);
        }
    }
})();