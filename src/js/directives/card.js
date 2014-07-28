var angular = require('angular-bsfy');
var $ = require('jquery');

module.exports = angular.module('app.card', [])
  .directive('card', ['$animate', function($animate) {


    return {
      restrict: 'E',
      templateUrl: '/templates/card.html',
      link: function(scope, element, attrs, ctrl) {

        attrs.$observe('flipStatus', function(value) {

          var card = $(element).find('section');
          card.velocity('stop');

          value === 'flip' ?
            card.velocity('flip', function() {
              scope.card.deferred.resolve();
            })
            :
            card.velocity('unflip');
        });

      }
    }

  }])