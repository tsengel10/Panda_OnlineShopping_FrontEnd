angular.module("panda")
    .controller("editAdminController", ["$state", "$scope", "$mdSidenav", "$mdDialog", "$mdToast", "adminFactory", "$timeout",

        function($state, $scope, $mdSidenav, $mdDialog, $mdToast, adminFactory, $timeout) {

            var vm = this;
            vm.closeSideBar = closeSideBar;
            vm.saveEditAdmin = saveEditAdmin;
            vm.admin = $state.params.admin;

            $timeout(function() {
                $mdSidenav("left").open();

                if (!$state.params.admin) {
                    if ($state.params.id) {
                        adminFactory.getAdmin($state.params.id)
                            .then(function(admin) {
                                vm.admin = admin.data;
                            }, function() {
                                showToast("Cannot find admin of ID : " + $state.params.id)
                                $state.go("admin.manage_admins");
                            });
                    } else
                        $state.go("admin.manage_admins");
                }

            }, 500);

            $scope.$watch("vm.sideNavOpen", function(sideNav) {
                if (sideNav == false) {
                    $mdSidenav("left").close()
                        .then(function() {
                            $state.go("admin.manage_admins");
                        });
                }
            });

            function showToast(message) {
                $mdToast.show(
                    $mdToast.simple()
                    .content(message)
                    .position("top, right")
                    .hideDelay(3000)
                );
            }

            function closeSideBar() {
                vm.sideNavOpen = false;
            }

            function saveEditAdmin(admin) {
                $scope.$emit("editedAdmin", admin);
                vm.sideNavOpen = false;
            }

        }
    ]);