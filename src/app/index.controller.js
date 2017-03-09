(function ()
{
    'use strict';

    angular
        .module('app')
        .controller('index.controller', controller);

    /** @ngInject */
    function controller($scope, $state, $timeout, $localStorage)
    {
        console.log('index controller');


        $scope.signOut = signOut;


        $scope.USER_DATA = $localStorage.USER_DATA


        /** Internal functions */

        function signOut(){
            $localStorage.$reset();
            $timeout(function(){
                $state.go('login');
            },500);

        }
    }
})();