(function ()
{
    'use strict';

    angular
        .module('app')
        .controller('index.controller', controller);

    /** @ngInject */
    function controller()
    {
        console.log('index controller');
    }
})();