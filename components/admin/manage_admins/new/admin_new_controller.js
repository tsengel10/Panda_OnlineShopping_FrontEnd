angular.module("panda")
    .controller("newAdminController", ["$state", "$scope", "$mdSidenav", "$mdDialog", "$mdToast", "$timeout",

        function($state, $scope, $mdSidenav, $mdDialog, $mdToast, $timeout) {

            var vm = this;
            vm.admin;
            vm.closeSideBar = closeSideBar;
            vm.saveAdmin = saveAdmin;

            $timeout(function() {
                $mdSidenav("left").open();
            }, 500);

            $scope.$watch("vm.sideNavOpen", function(sideNav) {
                if (sideNav == false) {
                    $mdSidenav("left").close()
                        .then(function() {
                            $state.go("admin.manage_admins");
                        });
                }
            });

            function closeSideBar() {
                vm.sideNavOpen = false;
            }

            function saveAdmin(admin) {
                if (admin) {
                    $scope.$emit("newAdmin", admin);
                    vm.sideNavOpen = false;
                }
            }



        }
    ]);