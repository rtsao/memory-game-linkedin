'use strict';

var $ = window.jQuery = require('jquery')
  , velocity = require('velocity-animate')
  , velocityui = require('velocity-animate/velocity.ui')
  , animations = require('./animations')

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
