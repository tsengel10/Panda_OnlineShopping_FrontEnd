angular.module("panda")
    .controller("vendorController", ["$rootScope", "$state", "$scope", "$http", "authenticationFactory", "adminFactory", "$mdToast",
        function($rootScope, $state, $scope, $http, authenticationFactory, adminFactory, $mdToast) {

            // if (!$rootScope.userObj || $rootScope.userObj.usertype != 2) {
            //     $state.go("/", {
            //         redirect_message: "You are not able to see 'Vendor' section"
            //     });
            // }

            var vm = this;
            vm.addVendorAddress = addVendorAddress;
            vm.editAddress = editAddress;
            vm.editVendor = editVendor;
            //vm.vendorId = $rootScope.userObj.userid;
            vm.vendor;

            adminFactory.getVendor(35)
                //adminFactory.getVendor(vm.vendorId)
                .then(function(vendor) {
                    vm.vendor = vendor.data;
                });

            function editVendor(vendor) {
                $state.go("vendor.edit", {
                    id: vendor.userid,
                    vendor: vendor
                });
            }


            function addVendorAddress(vendor) {
                $state.go("vendor.new_address", {
                    id: vendor.userid,
                    vendor: vendor
                });
            }

            function editAddress(address) {
                $state.go("vendor.edit_address", {
                    id: vm.vendor.userid,
                    address: address
                });
            }

            $scope.$on("editedVendor", function(event, vendor) {
                adminFactory.updateVendor(vendor)
                    .then(function(response) {
                        adminFactory.getVendor(vendor.userid)
                            .then(function(vendor) {
                                vm.vendor = vendor.data;
                            });
                        showToast("Vendor edited!");
                    }, function(error) {
                        showToast("Unable to update Vendor. " + error.message);
                    });
            });

            $scope.$on("newVendorAddress", function(event, address, vendor) {
                adminFactory.createAddress(vendor.userid, address)
                    .then(function(response) {
                        adminFactory.getVendor(vendor.userid)
                            .then(function(vendor) {
                                vm.vendor = vendor.data;
                            });
                        showToast("You have added new address!");
                    }, function(error) {
                        showToast("Unable to add address. " + error.message);
                    });
            });

            function showToast(message) {
                $mdToast.show(
                    $mdToast.simple()
                    .content(message)
                    .position("top, right")
                    .hideDelay(3000)
                );
            }

        }
    ]);