angular.module("panda")
    .controller("editVendorController", ["$state", "$scope", "$mdSidenav", "$mdDialog", "$mdToast", "adminFactory", "$timeout",

        function($state, $scope, $mdSidenav, $mdDialog, $mdToast, adminFactory, $timeout) {

            var vm = this;
            vm.closeSideBar = closeSideBar;
            vm.saveEditVendor = saveEditVendor;
            vm.vid = $state.params.id;
            vm.vendor = $state.params.vendor;

            $timeout(function() {
                $mdSidenav("left").open();
                if (!$state.params.vendor) {
                    if ($state.params.id) {
                        adminFactory.getVendor($state.params.id)
                            .then(function(vendor) {
                                vm.vendor = vendor.data;
                            }, function() {
                                showToast("Cannot find vendor of ID : " + $state.params.id)
                                $state.go("admin.manage_vendors");
                            });
                    } else
                        $state.go("admin.manage_vendors");
                }
            }, 500);

            $scope.$watch("vm.sideNavOpen", function(sideNav) {
                if (sideNav == false) {
                    $mdSidenav("left").close()
                        .then(function() {
                            $state.go("admin.manage_vendors");
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