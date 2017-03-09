/**
 * Author : phuong.tran
 * Date   : 2017-03-09
 */

(function(){
    'use strict';

    angular.module('app').config(configMiddleware);

    /** @ngInject **/
    function configMiddleware($middlewareProvider, $localStorageProvider){
        $middlewareProvider.map({

            /** Don't allow anyone through */
            'nobody': function nobodyMiddleware() {
                //
            },

            /** Let everyone through */
            'everyone': function everyoneMiddleware() {
                this.next();
            },

            'auth': function everyoneMiddleware() {
                if($localStorageProvider.get('AUTHENTICATE_TOKEN')) {
                    this.next();
                }
                this.redirectTo('login');
            },

            /** Redirect everyone */
            'redirect-all': function redirectAllMiddleware() {
                this.redirectTo('app.home');
            }
        })
    }
})();