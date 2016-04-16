angular.module("panda")
    .controller("vendorController", ["$rootScope", "$state", "$scope", "$http", "authenticationFactory", "userFactory",
        function($rootScope, $state, $scope, $http, authenticationFactory, userFactory) {

            console.log("Inside Vendor controller");

            if (!$rootScope.userObj || $rootScope.userObj.usertype != 2) {
                $state.go("/", {
                    redirect_message: "You are not able to see 'Vendor' section"
                });
            }

        }
    ]);