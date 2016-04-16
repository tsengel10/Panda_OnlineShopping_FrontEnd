angular.module("panda")
    .factory("userFactory", ["$http", "backEndBaseUrl", function($http, backEndBaseUrl) {

        var userFactory = {};

        // User --> Admin related functions
        userFactory.getUserById = function(id) {
            return $http.get(backEndBaseUrl + "/admin/get/user/" + id);
        }

        return userFactory;
    }]);