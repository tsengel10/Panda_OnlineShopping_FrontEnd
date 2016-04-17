angular.module("panda")
    .controller("mainController", ["$mdToast", "$rootScope", "$state", "$scope", "$http", "authenticationFactory", "userFactory",
        function($mdToast, $rootScope, $state, $scope, $http, authenticationFactory, userFactory) {

            vm = this;
            vm.redirect_message = $state.params.redirect_message;

            if (vm.redirect_message) {
                showToast(vm.redirect_message);
            }

            console.log("IM HERE YOU NOOB");

            function showToast(message) {
                $mdToast.show(
                    $mdToast.simple()
                    .content(message)
                    .position("top, right")
                    .hideDelay(3000)
                );
            }

        }
    ]);