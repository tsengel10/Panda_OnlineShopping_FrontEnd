angular.module("panda")
    .controller("adminActionsController", ["$state", "$scope", "$http", "$mdSidenav", "$mdDialog", "$mdToast", "adminFactory",
        function($state, $scope, $http, $mdSidenav, $mdDialog, $mdToast, adminFactory) {

            var vm = this;

            vm.manageAdmins = manageAdmins;
            vm.manageVendors = manageVendors;
            vm.manageCustomers = manageCustomers;
            vm.approveProducts = approveProducts;

            function manageAdmins() {
                $state.go("admin.manage_admins");
            }

            function manageVendors() {
                $state.go("admin.manage_vendors");
            }

            function manageCustomers() {
                $state.go("admin.manage_customers");
            }

            function approveProducts() {
                $state.go("admin.approve_products");
            }

            function addNewAdmin() {
                $state.go("admin.manage_admins.new");
            }

        }

    ]);