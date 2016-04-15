angular.module("panda")
    .controller("adminsController", ["$state", "$scope", "$http", "$mdSidenav", "$mdDialog", "$mdToast", "adminFactory",
        function($state, $scope, $http, $mdSidenav, $mdDialog, $mdToast, adminFactory) {

            var vm = this;
            vm.admins;
            vm.addNewAdmin = addNewAdmin;
            vm.editAdmin = editAdmin;
            vm.adminActionTitle = "Manage Admins";
            vm.admins;
            vm.admin;

            adminFactory.getAdmins()
                .then(function(admins) {
                    vm.admins = admins.data;
                });

            function addNewAdmin() {
                $state.go("admin.manage_admins.new");
            }

            function editAdmin(admin) {
                $state.go("admin.manage_admins.edit", {
                    id: admin.userid,
                    admin: admin
                });
            }

            $scope.$on("editedAdmin", function(event, admin) {
                adminFactory.updateAdmin(admin)
                    .then(function(response) {
                        adminFactory.getAdmins()
                            .then(function(admins) {
                                vm.admins = admins.data;
                            });
                        showToast("Admin edited!");
                    }, function(error) {
                        showToast("Unable to update Admin. " + error.message);
                    });
            });

            $scope.$on("newAdmin", function(event, admin) {
                admin.usertype = 99;
                adminFactory.createAdmin(admin)
                    .then(function(response) {
                        adminFactory.getAdmins()
                            .then(function(admins) {
                                vm.admins = admins.data;
                            });
                        showToast("Admin created!");
                    }, function(error) {
                        showToast("Unable to create Admin. " + error.message);
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