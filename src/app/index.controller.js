(function ()
{
    'use strict';

    angular
        .module('app')
        .controller('index.controller', controller);

    /** @ngInject */
    function controller($scope, $state, $timeout, $localStorage, $http)
    {
        console.log('index controller');


        $scope.signOut = signOut;

        $scope.sidebarToggle = sidebarToggle;
        $scope.sidebarClose = sidebarClose;
        $scope.toggleHeaderSearch = toggleHeaderSearch;

        


        $scope.USER_DATA = $localStorage.USER_DATA;


        /** Internal functions */

        function signOut(){
            $localStorage.$reset();
            $timeout(function(){
                $state.go('login');
            },500);

        }

        function sidebarToggle(){
            $('#page-container').toggleClass('sidebar-o-xs');
        }

        function sidebarClose(){
            $('#page-container').removeClass('sidebar-o-xs');
        }

        function toggleHeaderSearch(){
            $('.js-header-search').toggleClass('header-search-xs-visible');
        }
    }
})();
