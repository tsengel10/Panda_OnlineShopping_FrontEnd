angular.module("panda")
    .controller("editVendorOwnController", ["$state", "$scope", "$mdSidenav", "$mdDialog", "$mdToast", "adminFactory", "$timeout",

        function($state, $scope, $mdSidenav, $mdDialog, $mdToast, adminFactory, $timeout) {

            var vm = this;
            vm.closeSideBar = closeSideBar;
            vm.saveEditVendor = saveEditVendor;
            vm.vid = $state.params.id;
            vm.vendor = $state.params.vendor;

            console.log("inside edit vendor controller...");
            console.log(vm.vendor);

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

            function saveEditVendor(vendor) {
                $scope.$emit("editedVendor", vendor);
                vm.sideNavOpen = false;
            }

        }
    ]);