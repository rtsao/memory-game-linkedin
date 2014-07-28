'use strict';

var $ = require('jquery')
  , angular = require('angular-bsfy')

module.exports = angular.module('app.AppCtrl', [])
  .controller('GameCtrl', ['connectionsService', '$scope', '$q', '$timeout', function(connectionsService, $scope, $q, $timeout) {
  
    var that = this;

    $scope.$watch(connectionsService.isAuthenticated, function (newVal, oldVal) {
      that.authed = newVal;
    });

    this.connections = [];
    this.cards = [];
    this.selection = {};

    this.checkPair = function(card1, card2) {
      var cardPromises = [card1.promise, card2.deferred.promise];

      $q.all(cardPromises).then(function() {
        if (card1.connection.id === card2.connection.id) {
          $timeout(function(){that.pairMatched(card1, card2)}, 600);
        }
        else {
          $timeout(function(){that.pairMismatched(card1, card2)}, 600);
        }
      });
    }

    this.pairMatched = function(card1, card2) {
      card1.setComplete();
      card2.setComplete();
      that.clearSelection();
    }

    this.pairMismatched = function(card1, card2) {
      card1.unflip();
      card2.unflip();
      that.clearSelection();
    }

    this.clearSelection = function() {
      delete that.selection.card1;
      delete that.selection.card2;
    }

    this.selectCard = function(card) {

      if (card.isComplete()) return;

      if (!that.selection.card1) {
        card.deferred = $q.defer();
        that.selection.card1 = card;
        card.flip();
      }
      else if (!that.selection.card2 && that.selection.card1 !== card) {
        card.deferred = $q.defer();
        that.selection.card2 = card;
        card.flip();
        that.checkPair(that.selection.card1, card);
      }

    }

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
          that.cards.push(new PhotoCard(connection), new InfoCard(connection));
        });
        that.connections = that.connections.concat(result.values);

      }, function(error) {
        console.error(error);
      });
    }

  }])

function Card(connection) {
  this.connection = connection;
  this.flipStatus = 'no';
  this.complete = 'no';
}

Card.prototype = {
  flip: function() {
    this.flipStatus = 'flip';
  },
  unflip: function() {
    this.flipStatus = 'no';
  },
  setComplete: function() {
    this.complete = 'complete';
  },
  isComplete: function() {
    return this.complete === 'complete';
  }
}

function PhotoCard(connection) {
  Card.call(this, connection);
}

PhotoCard.prototype = Object.create(Card.prototype);
PhotoCard.prototype.type = 'photoCard';

function InfoCard(connection) {
  Card.call(this, connection);
}

InfoCard.prototype = Object.create(Card.prototype);
InfoCard.prototype.type = 'infoCard';