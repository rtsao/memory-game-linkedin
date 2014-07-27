var angular = require('angular-bsfy');
var $ = require('jquery');

module.exports = angular.module('app.card', [])
  .directive('card', ['$animate', function($animate) {


    return {
      restrict: 'E',
      templateUrl: '/templates/card.html',
      link: function(scope, element, attrs, ctrl) {

        var flip = false;

        scope.flip = function() {
          flip=!flip;

           flip ?
             $(element).find('section').velocity('stop').velocity('flip') : $(element).find('section').velocity('stop').velocity('unflip');
        }


      }
    }

  }])