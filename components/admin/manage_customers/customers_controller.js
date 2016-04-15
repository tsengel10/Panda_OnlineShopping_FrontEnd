angular.module("panda")
    .controller("customersController", ["$state", "$scope", "$http", "$mdSidenav", "$mdDialog", "$mdToast", "adminFactory",
        function($state, $scope, $http, $mdSidenav, $mdDialog, $mdToast, adminFactory) {

            var vm = this;
            vm.customers;
            vm.adminActionTitle = "Manage Customers";
            vm.addNewCustomer = addNewCustomer;
            vm.addCustomerAddress = addCustomerAddress;
            vm.deleteCustomer = deleteCustomer;
            vm.editCustomer = editCustomer;

            adminFactory.getCustomers()
                .then(function(customers) {
                    vm.customers = customers.data;
                });

            function addCustomerAddress(customer) {
                $state.go("admin.manage_customers.new_address", {
                    id: customer.userid,
                    customer: customer
                });
            }

            function addNewCustomer(customer) {
                $state.go("admin.manage_customers.new");
            }

            $scope.$on("editedCustomer", function(event, customer) {
                adminFactory.updateCustomer(customer)
                    .then(function(response) {
                        adminFactory.getCustomers()
                            .then(function(customers) {
                                vm.customers = customers.data;
                            });
                        showToast("Customer edited!");
                    }, function(error) {
                        showToast("Unable to update Customer. " + error.message);
                    });
            });

            $scope.$on("newAddress", function(event, address, customer) {
                adminFactory.createAddress(customer.userid, address)
                    .then(function(response) {
                        adminFactory.getCustomers()
                            .then(function(customers) {
                                vm.customers = customers.data;
                            });
                        showToast("Customer address added!");
                    }, function(error) {
                        showToast("Unable to add address to Customer. " + error.message);
                    });

            });

            $scope.$on("newCustomer", function(event, customer) {
                customer.usertype = 10;
                adminFactory.createCustomer(customer)
                    .then(function(response) {
                        adminFactory.getCustomers()
                            .then(function(customers) {
                                vm.customers = customers.data;
                            });
                        showToast("Customer created!");
                    }, function(error) {
                        showToast("Unable to create Customer. " + error.message);
                    });
            });

            function editCustomer(customer) {
                $state.go("admin.manage_customers.edit", {
                    id: customer.userid,
                    customer: customer
                });
            }

            function deleteCustomer(event, customer) {
                var confirm = $mdDialog.confirm()
                    .title("Are you sure you want to delete '" + customer.firstName + " " + customer.lastName + "' ?")
                    .ok("Yes")
                    .cancel("No")
                    .targetEvent(event);
                $mdDialog.show(confirm)
                    .then(function() {
                        adminFactory.deleteCustomer(customer)
                            .then(function(response) {
                                adminFactory.getCustomers()
                                    .then(function(customers) {
                                        vm.customers = customers.data;
                                    });
                                showToast("Customer deleted!");
                            }, function(error) {
                                showToast("Unable to delete Customer. " + error.message);
                            });

                    }, function() {
                        //Do nonthing when pressed no
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