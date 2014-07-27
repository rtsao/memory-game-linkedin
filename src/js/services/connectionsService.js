var angular = require('angular-bsfy')

module.exports = angular.module('app.connectionsService', [])
  .service('connectionsService', ['IN', '$q', '$rootScope', function (IN, $q, $rootScope) {

    var authed = false;

    IN.Event.on(IN, 'auth', function() {
      $rootScope.$apply(function() {
        authed = true;
      });
    });

    IN.Event.on(IN, 'logout', function() {
      $rootScope.$apply(function() {
        authed = false;
      });
    });

    return {

      isAuthenticated: function() {
        return authed;
      },

      logout: function() {
        if (authed) {
          IN.User.logout();
        }
      },

      getConnections: function(count) {
        var deferred = $q.defer();

        if (IN.User.isAuthorized()) {
          IN.API.Connections('me')
            .params({count: count})
            .result(deferred.resolve)
            .error(deferred.reject);
        }
        else {
          deferred.reject('user not authenticated');
        }

        return deferred.promise;
      }

    }

  }])