angular.module("panda")
    .controller("DialogController", ["$mdDialog", "$rootScope", "$state", "$scope", "$http",
        "authenticationFactory", "adminFactory", "$mdToast", "inventoryFactory", "categoryFactory",
        "productFactory", "data",
        function($mdDialog, $rootScope, $state, $scope, $http, authenticationFactory, adminFactory, $mdToast,
            inventoryFactory, categoryFactory, productFactory, data) {

            var vm = this;
            vm.data = data;
            vm.cancel = cancel;

            function cancel() {
                $mdDialog.cancel();
            }

        }
    ])
    .controller("vendorController", ["$mdDialog", "$rootScope", "$state", "$scope", "$http",
        "authenticationFactory", "adminFactory", "$mdToast", "inventoryFactory", "categoryFactory",
        "productFactory",
        function($mdDialog, $rootScope, $state, $scope, $http, authenticationFactory, adminFactory, $mdToast,
            inventoryFactory, categoryFactory, productFactory) {

            if (!$rootScope.userObj || $rootScope.userObj.usertype != 2) {
                $state.go("/", {
                    redirect_message: "You are not able to see 'Vendor' section"
                });
            }

            var vm = this;
            vm.showPopUp = showPopUp;
            vm.addVendorAddress = addVendorAddress;
            vm.editAddress = editAddress;
            vm.editVendor = editVendor;
            vm.addProduct = addProduct;


            vm.vendorId = $rootScope.userObj.userid;
            vm.vendor;
            vm.inventories;
            vm.inventory;

            adminFactory.getVendor(vm.vendorId)
                .then(function(vendor) {
                    vm.vendor = vendor.data;
                }, function() {
                    console.log("No content found for vendor");
                });

            inventoryFactory.getInventoryByVendorId(vm.vendorId)
                .then(function(inventories) {
                    vm.inventories = inventories.data;
                    vm.inventories.forEach(function(inv) {
                        categoryFactory.getCategoryById(inv.categoryId)
                            .then(function(cat) {
                                inv.category = cat.data;
                            }, function() {
                                console.log("No content found for vendor");
                            });
                    });
                });

            function addProduct(vendor) {
                $state.go("vendor.addProduct", {
                    vendor: vendor
                });
            }

            function showPopUp(ev, inv) {
                $mdDialog.show({
                    locals: { data: inv },
                    controller: "DialogController as vm",
                    templateUrl: 'components/main/vendor/popup_product/detail_view.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: true
                });
            }


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



            $scope.$on("newProduct", function(event, product) {
                inventoryFactory.createInventory(product)
                    .then(function() {
                        inventoryFactory.getInventoryByVendorId(product.vendorId)
                            .then(function(inventories) {
                                vm.inventories = inventories.data;

                                vm.inventories.forEach(function(inv) {
                                    categoryFactory.getCategoryById(inv.categoryId)
                                        .then(function(cat) {
                                            inv.category = cat.data;
                                        });
                                });
                            });
                    });
            });


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