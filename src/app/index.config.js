(function ()
{
    'use strict';

    angular
        .module('app')
        .config(config);

    /** @ngInject */
    function config($httpProvider, $localStorageProvider)
    {
        var interceptor = function() {
            return {
                'request': function(config) {
                    var token = $localStorageProvider.get('AUTHENTICATE_TOKEN');
                    if(token)
                    {
                        config.headers['Authorization'] = 'Bearer ' + token;
                    }
                    
                    return config;
                }
            }
        };

        $httpProvider.interceptors.push(interceptor);
    }

})();