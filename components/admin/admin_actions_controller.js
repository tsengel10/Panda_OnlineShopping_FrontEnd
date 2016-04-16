angular.module("panda")
    .controller("adminActionsController", ["$rootScope", "$state", "$scope", "$http", "$mdSidenav", "$mdDialog", "$mdToast", "adminFactory",
        function($rootScope, $state, $scope, $http, $mdSidenav, $mdDialog, $mdToast, adminFactory) {


            if (!$rootScope.userObj || $rootScope.userObj.usertype != 99) {
                $state.go("/", {
                    redirect_message: "You are not able to see 'Admin' section"
                });
            }

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