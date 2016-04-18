angular.module("panda")
        .controller("authenticationController", ["$rootScope", "$state", "$scope", "$http", "authenticationFactory", "userFactory", "$mdToast",
            function ($rootScope, $state, $scope, $http, authenticationFactory, userFactory, $mdToast) {

                var vm = this;
                vm.user;
                vm.login = login;
                vm.cancelLogin = cancelLogin;

                console.log("Im here...");

                function login(user) {
                    console.log("about to do login()");
                    authenticationFactory.authenticateUser(user)
                            .then(function (response) {
                                console.log("Auth success with code: " + response.status);
                                $rootScope.tokenObj = response.data;

                                console.log("Response result: " + response);
                                userFactory.getUserById($rootScope.tokenObj.userId)
                                        .then(function (user) {
                                            $rootScope.userObj = user.data;
                                            $rootScope.isLoggedIn = true;
                                            console.log("User is: "+user);
                                            //router(user.data);
                                        });
                            }, function (error) {
                                showToast("Invalid username or password. Try Again!");
                                console.log("Auth failed with code: " + error.status);
                            });
                }

                function showToast(message) {
                    $mdToast.show(
                            $mdToast.simple()
                            .content(message)
                            .position("top, right")
                            .hideDelay(3000)
                            );
                }

                function router(user) {
                    console.log("User is: "+user);
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