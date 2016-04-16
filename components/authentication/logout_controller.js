angular.module("panda")
    .controller("logoutController", ["$rootScope", "$state", "$scope", "$http", "authenticationFactory", "userFactory",

        function($rootScope, $state, $scope, $http, authenticationFactory, userFactory) {

            $rootScope.isLoggedIn = false;
            $rootScope.userObj = {};
            $rootScope.tokenObj = {};

            $state.go("/", {
                redirect_message: "Successfully logged out!"
            });
        }
    ]);