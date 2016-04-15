angular.module("panda")
    .controller("newVendorAddressController", ["$state", "$scope", "$mdSidenav", "$mdDialog", "$mdToast", "$timeout",

        function($state, $scope, $mdSidenav, $mdDialog, $mdToast, $timeout) {

            var vm = this;
            vm.vendor;
            vm.closeSideBar = closeSideBar;
            vm.saveVendorAddress = saveVendorAddress;
            vm.vendor = $state.params.vendor;
            vm.address;

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

            function saveVendorAddress(address) {
                if (address) {
                    address.userid = vm.vendor.userid;
                    $scope.$emit("newAddress", address, vm.vendor);
                    vm.sideNavOpen = false;
                }
            }

        }
    ]);