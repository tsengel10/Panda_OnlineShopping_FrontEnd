angular.module("panda")
    .controller("newVendorController", ["$state", "$scope", "$mdSidenav", "$mdDialog", "$mdToast", "$timeout",

        function($state, $scope, $mdSidenav, $mdDialog, $mdToast, $timeout) {

            var vm = this;
            vm.closeSideBar = closeSideBar;
            vm.saveVendor = saveVendor;
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

            function saveVendor(vendor) {
                if (vendor) {
                    $scope.$emit("newVendor", vendor);
                    vm.sideNavOpen = false;
                }
            }



        }
    ]);