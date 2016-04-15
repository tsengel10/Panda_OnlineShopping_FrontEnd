angular.module("panda")
    .controller("editVendorController", ["$state", "$scope", "$mdSidenav", "$mdDialog", "$mdToast", "adminFactory", "$timeout",

        function($state, $scope, $mdSidenav, $mdDialog, $mdToast, adminFactory, $timeout) {

            var vm = this;
            vm.closeSideBar = closeSideBar;
            vm.saveEditVendor = saveEditVendor;
            vm.vendor = $state.params.vendor;

            $timeout(function() {
                $mdSidenav("left").open();
            }, 500);

            $scope.$watch("vm.sideNavOpen", function(sideNav) {
                if (sideNav == false) {
                    $mdSidenav("left").close()
                        .then(function() {
                            $state.go("admin.manage_vendors");
                        });
                }
            });

            function closeSideBar() {
                vm.sideNavOpen = false;
            }

            function saveEditVendor(vendor) {
                $scope.$emit("editedVendor", vendor);
                vm.sideNavOpen = false;
            }

        }
    ]);