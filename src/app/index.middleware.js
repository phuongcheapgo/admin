/**
 * Author : phuong.tran
 * Date   : 2017-03-09
 */

(function(){
    'use strict';

    angular.module('app').config(config);

    /** @ngInject **/
    function config($middlewareProvider){
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
                
                this.redirectTo('login');
            },

            /** Redirect everyone */
            'redirect-all': function redirectAllMiddleware() {
                this.redirectTo('app.home');
            }
        })
    }
})();