angular.module("panda")
    .controller("vendorsController", ["$state", "$scope", "$http", "$mdSidenav", "$mdDialog", "$mdToast", "adminFactory",
        function($state, $scope, $http, $mdSidenav, $mdDialog, $mdToast, adminFactory) {

            var vm = this;
            vm.admins;
            vm.addNewVendor = addNewVendor;
            vm.addVendorAddress = addVendorAddress;
            vm.deleteVendor = deleteVendor;
            vm.editVendor = editVendor;
            vm.adminActionTitle = "Manage Vendors";
            vm.vendors;
            vm.vendor;
            

            adminFactory.getVendors()
                .then(function(vendors) {
                    vm.vendors = vendors.data;
                });

            $scope.$on("editedVendor", function(event, vendor) {
                adminFactory.updateVendor(vendor)
                    .then(function(response) {
                        adminFactory.getVendors()
                            .then(function(vendors) {
                                vm.vendors = vendors.data;
                            });
                        showToast("Vendor edited!");
                    }, function(error) {
                        showToast("Unable to update Vendor. " + error.message);
                    });
            });

            $scope.$on("newVendor", function(event, vendor) {
                vendor.usertype = 2;
                adminFactory.createVendor(vendor)
                    .then(function(response) {
                        adminFactory.getVendors()
                            .then(function(vendors) {
                                vm.vendors = vendors.data;
                            });
                        showToast("Vendor created!");
                    }, function(error) {
                        showToast("Unable to create Vendor. " + error.message);
                    });
            });

            $scope.$on("newAddress", function(event, address, vendor) {
                adminFactory.createAddress(vendor.userid, address)
                    .then(function(response) {
                        adminFactory.getVendors()
                            .then(function(vendors) {
                                vm.vendors = vendors.data;
                            });
                        showToast("Vendor address added!");
                    }, function(error) {
                        showToast("Unable to add address to Vendor. " + error.message);
                    });

            });

            function deleteVendor(event, vendor) {
                var confirm = $mdDialog.confirm()
                    .title("Are you sure you want to delete '" + vendor.vendorName + "' ?")
                    .ok("Yes")
                    .cancel("No")
                    .targetEvent(event);
                $mdDialog.show(confirm)
                    .then(function() {
                        adminFactory.deleteVendor(vendor)
                            .then(function(response) {
                                adminFactory.getVendors()
                                    .then(function(vendors) {
                                        vm.vendors = vendors.data;
                                    });
                                showToast("Vendor deleted!");
                            }, function(error) {
                                showToast("Unable to delete Vendor. " + error.message);
                            });

                    }, function() {
                        //Do nonthing when pressed no
                    });
            }


            function addVendorAddress(vendor) {
                $state.go("admin.manage_vendors.new_address", {
                    id: vendor.userid,
                    vendor: vendor
                });
            }

            function addNewVendor() {
                $state.go("admin.manage_vendors.new");
            }

            function editVendor(vendor) {
                $state.go("admin.manage_vendors.edit", {
                    id: vendor.userid,
                    vendor: vendor
                });
            }


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