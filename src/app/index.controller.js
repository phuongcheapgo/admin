(function ()
{
    'use strict';

    angular
        .module('app')
        .controller('index.controller', controller);

    /** @ngInject */
    function controller($scope, $state, $timeout, $localStorage, $sce)
    {
        console.log('index controller');


        $scope.signOut = signOut;

        $scope.sidebarToggle = sidebarToggle;
        $scope.sidebarClose = sidebarClose;
        $scope.toggleHeaderSearch = toggleHeaderSearch;
        $scope.trustUrl = trustUrl;


        $scope.filterRange = [
            { key : 'today', name : 'Today' },
            { key : 'a_week', name : 'A Week' },
            { key : 'a_month', name : 'A Month' }
        ];





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

        function trustUrl(url) {
            return $sce.trustAsResourceUrl(url)
        }
    }
})();
