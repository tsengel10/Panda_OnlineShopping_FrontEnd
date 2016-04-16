angular.module("panda")
    .controller("authenticationController", ["$rootScope", "$state", "$scope", "$http", "authenticationFactory", "userFactory",

        function($rootScope, $state, $scope, $http, authenticationFactory, userFactory) {

            var vm = this;
            vm.user;
            vm.login = login;
            vm.cancelLogin = cancelLogin;

            function login(user) {
                authenticationFactory.authenticateUser(user)
                    .then(function(response) {
                        console.log("Auth success with code: " + response.status);
                        $rootScope.tokenObj = response.data;
                        userFactory.getUserById($rootScope.tokenObj.userId)
                            .then(function(user) {
                                $rootScope.userObj = user.data;
                                $rootScope.isLoggedIn = true;
                                router(user.data);
                            });
                    }, function(error) {
                        console.log("Auth failed with code: " + error.status);
                    });
            }

            function router(user) {

                if (user.usertype == 2)
                    $state.go("vendor");
                else if (user.usertype == 10)
                    $state.go("customer");
                else if (user.usertype == 99)
                    $state.go("admin");
                else
                    $state.go("/");
            }

            function cancelLogin() {
                console.log("cancelled login");
            }
        }
    ]);