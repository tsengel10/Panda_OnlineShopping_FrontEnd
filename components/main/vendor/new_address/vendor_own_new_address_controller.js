angular.module("panda")
    .controller("newOwnVendorAddressController", ["$state", "$scope", "$mdSidenav", "$mdDialog", "$mdToast", "$timeout",

        function($state, $scope, $mdSidenav, $mdDialog, $mdToast, $timeout) {

            var vm = this;
            vm.closeSideBar = closeSideBar;
            vm.saveVendorAddress = saveVendorAddress;
            vm.vendor = $state.params.vendor;
            vm.address = $state.params.address;
            vm.saveEditVendorAddress = saveEditVendorAddress;

            $timeout(function() {
                $mdSidenav("left").open();
            }, 500);

            $scope.$watch("vm.sideNavOpen", function(sideNav) {
                if (sideNav == false) {
                    $mdSidenav("left").close()
                        .then(function() {
                            $state.go("vendor");
                        });
                }
            });

            function closeSideBar() {
                vm.sideNavOpen = false;
            }

            function saveEditVendorAddress(address) {
                if (address) {
                    $scope.$emit("editVendorAddress", address);
                    vm.sideNavOpen = false;
                }
            }

            function saveVendorAddress(address) {
                if (address) {
                    address.userid = vm.vendor.userid;
                    $scope.$emit("newVendorAddress", address, vm.vendor);
                    vm.sideNavOpen = false;
                }
            }


        }
    ]);