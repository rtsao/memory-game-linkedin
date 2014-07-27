var $ = require('jquery');

var angular = require('angular-bsfy');

module.exports = angular.module('app.AppCtrl', [])
  .controller('GameCtrl', ['connectionsService', '$scope', function(connectionsService, $scope) {
  
    var that=this;

    $scope.$watch(connectionsService.isAuthenticated, function (newVal, oldVal) {
      that.authed = newVal;
    });

    this.connections = [];
    this.cards = [];

    this.deal = function() {
      $('card').each(function(index) {
        $(this).attr('X', (index%5)*110+'%');
        $(this).attr('Y', Math.floor(index/5)*110+'%');
      });
      $('card').velocity('deal', {stagger: 100});
    }

    this.init = function() {

      connectionsService.getConnections(20).then(function(result) {

        result.values.forEach(function(connection, array, index) {
          that.cards.push(
            {
              connection:connection,
              type: 'face'
            },
            {
              connection:connection,
              type: 'info'
            }
          );

        });


        that.connections = that.connections.concat(result.values);
        console.log(that.cards);

      },function(error){
        console.error(error);
      });
    }

  }])