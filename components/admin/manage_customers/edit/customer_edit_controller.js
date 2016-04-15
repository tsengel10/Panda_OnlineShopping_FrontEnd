angular.module("panda")
    .controller("editCustomerController", ["$state", "$scope", "$mdSidenav", "$mdDialog", "$mdToast", "adminFactory", "$timeout",

        function($state, $scope, $mdSidenav, $mdDialog, $mdToast, adminFactory, $timeout) {

            var vm = this;
            vm.closeSideBar = closeSideBar;
            vm.saveEditCustomer = saveEditCustomer;
            vm.customer = $state.params.customer;

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

            function saveEditCustomer(customer) {
                $scope.$emit("editedCustomer", customer);
                vm.sideNavOpen = false;
            }

        }
    ]);