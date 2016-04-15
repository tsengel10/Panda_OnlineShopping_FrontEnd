angular.module("panda")
    .controller("newCustomerAddressController", ["$state", "$scope", "$mdSidenav", "$mdDialog", "$mdToast", "$timeout",

        function($state, $scope, $mdSidenav, $mdDialog, $mdToast, $timeout) {

            var vm = this;
            vm.customer;
            vm.closeSideBar = closeSideBar;
            vm.saveCustomerAddress = saveCustomerAddress;
            vm.customer = $state.params.customer;
            vm.address;

            $timeout(function() {
                $mdSidenav("left").open();
            }, 500);

            $scope.$watch("vm.sideNavOpen", function(sideNav) {
                if (sideNav == false) {
                    $mdSidenav("left").close()
                        .then(function() {
                            $state.go("admin.manage_customers");
                        });
                }
            });

            function closeSideBar() {
                vm.sideNavOpen = false;
            }

            function saveCustomerAddress(address) {
                if (address) {
                    address.userid = vm.customer.userid;
                    $scope.$emit("newAddress", address, vm.customer);
                    vm.sideNavOpen = false;
                }
            }

        }
    ]);