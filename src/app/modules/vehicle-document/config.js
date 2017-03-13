/**
 * Author : phuong.tran
 * Date   : 2017-03-13
 */


(function () {
  'use strict';

  angular
    .module('app')
    .constant('DOCUMENT_CONFIG', {
      TYPE: {
        CAR_MOTOR_INSURANCE: {
          VALUE: 1,
          NAME: 'Car/motor Insurance'
        },
        MOTORBIKE_REGISTRATION_CERTIFICATE :{
          VALUE : 2,
          NAME : 'Motorbike Registration Certificate'
        },
        CAR_REGISTRATION_CERTIFICATE :{
          VALUE : 3,
          NAME : 'Car Registration Certificate'
        },
        DRIVING_LICENCE: {
          VALUE : 4,
          NAME : 'Driving Licence'
        },
        POLICE_CERTIFICATE : {
          VALUE : 5,
          NAME : 'Police certificate'
        },
        POLICE_CHECK : {
          VALUE : 6,
          NAME : 'Police Check'
        }

      }
    });
})();
