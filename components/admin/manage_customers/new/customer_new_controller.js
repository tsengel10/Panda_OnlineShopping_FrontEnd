angular.module("panda")
    .controller("newCustomerController", ["$state", "$scope", "$mdSidenav", "$mdDialog", "$mdToast", "$timeout",

        function($state, $scope, $mdSidenav, $mdDialog, $mdToast, $timeout) {

            var vm = this;
            vm.customer;
            vm.closeSideBar = closeSideBar;
            vm.saveCustomer = saveCustomer;

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

            function saveCustomer(customer) {
                if (customer) {
                    $scope.$emit("newCustomer", customer);
                    vm.sideNavOpen = false;
                }
            }



        }
    ]);