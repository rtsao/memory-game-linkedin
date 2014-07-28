var angular = require('angular-bsfy');
var $ = require('jquery');

module.exports = angular.module('app.card', [])
  .directive('card', ['$animate', function($animate) {

    return {
      restrict: 'E',
      templateUrl: '/templates/card.html',
      link: function(scope, element, attrs, ctrl) {

        attrs.$observe('flip', function(value) {
          var card = $(element).find('section');
          card.velocity('stop');

          value === 'true' ?
            card.velocity('flip', function() {
              scope.card.animation.resolve();
            })
            :
            card.velocity('unflip');
        });

        attrs.$observe('matched', function(value) {
          var card = $(element).find('section');
          card.velocity('stop');

          if (value === 'true') {
            card.velocity('transition.slideUpOut', function() {
              scope.card.animation.resolve();
            });
          }
        });

      }
    }

  }])