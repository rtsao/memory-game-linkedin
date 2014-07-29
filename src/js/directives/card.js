var angular = require('angular-bsfy');
var $ = require('jquery');
var fs = require('fs');

module.exports = angular.module('app.card', [])
  .directive('card', ['$animate', function($animate) {

    return {
      restrict: 'E',
      template: fs.readFileSync(__dirname + '/../../../build/templates/card.html', 'utf8'),
      link: function(scope, element, attrs, ctrl) {

        attrs.$observe('flip', function(value) {
          element.velocity('stop');

          value === 'true' ?
            element.velocity('flip', function() {
              scope.card.animation.resolve();
            })
            :
            element.velocity('unflip');
        });

        attrs.$observe('matched', function(value) {
          element.velocity('stop');

          if (value === 'true') {
            element.velocity('transition.slideUpOut', function() {
              scope.card.animation.resolve();
            });
          }
        });

      }
    }

  }])