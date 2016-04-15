angular.module("panda")
    .controller("editAdminController", ["$state", "$scope", "$mdSidenav", "$mdDialog", "$mdToast", "adminFactory", "$timeout",

        function($state, $scope, $mdSidenav, $mdDialog, $mdToast, adminFactory, $timeout) {

            var vm = this;
            vm.closeSideBar = closeSideBar;
            vm.saveEditAdmin = saveEditAdmin;
            vm.admin = $state.params.admin;

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

            function saveEditAdmin(admin) {
                $scope.$emit("editedAdmin", admin);
                vm.sideNavOpen = false;
            }

        }
    ]);