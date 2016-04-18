angular.module("panda")
    .controller("customerController", ["$rootScope", "$state", "$scope", "$http", "authenticationFactory", "userFactory",
        function($rootScope, $state, $scope, $http, authenticationFactory, userFactory) {F

            if (!$rootScope.userObj || $rootScope.userObj.usertype != 10) {
                $state.go("/", {
                    redirect_message: "You are not able to see 'Customer' section"
                });
            }

        }
    ]);