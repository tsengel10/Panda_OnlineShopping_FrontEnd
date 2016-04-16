angular.module("panda")
    .factory("authenticationFactory", ["$http", "backEndBaseUrl", function($http, backEndBaseUrl) {

        var authenticationFactory = {};

        authenticationFactory.authenticateUser = function(user) {
            return $http.post(backEndBaseUrl + "/authenticate", user);
        }

        return authenticationFactory;


    }]);