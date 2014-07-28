'use strict';

console.log('Hello1 world!')

var $ = require('jquery');
window.jQuery = $;



var velocity = require('velocity-animate');
var velocityui = require('velocity-animate/velocity.ui');

var animations = require('./animations');



var angular = require('angular-bsfy')
  , ngAnimate = require('angular-bsfy/animate')
  , connectionsService = require('./services/connectionsService.js')
  , GameCtrl = require('./controllers/gameCtrl.js')
  , card = require('./directives/card.js')

var app = angular.module('app',
  [
  ngAnimate.name,
  connectionsService.name,
  GameCtrl.name,
  card.name
  ]
)
.value('IN', IN)
