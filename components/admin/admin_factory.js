angular.module("panda")
    .factory("adminFactory", ["$http", "backEndBaseUrl", function($http, backEndBaseUrl) {

        var adminFactory = {};

        // User --> Admin related functions
        adminFactory.getAdmins = function() {
            return $http.get(backEndBaseUrl + "/admin/get/all");
        }

        adminFactory.getAdmin = function(id) {
            return $http.get(backEndBaseUrl + "/admin/get/" + id);
        };

        adminFactory.createAdmin = function(admin) {
            return $http.post(backEndBaseUrl + "/admin/create", admin);
        };

        adminFactory.updateAdmin = function(admin) {
            return $http.put(backEndBaseUrl + "/admin/edit/" + admin.userid, admin);
        };

        //User --> Vendor related functions
        adminFactory.getVendors = function() {
            return $http.get(backEndBaseUrl + "/admin/vendor/get/all");
        }

        adminFactory.getVendor = function(id) {
            return $http.get(backEndBaseUrl + "/admin/vendor/get/" + id);
        };

        adminFactory.createVendor = function(vendor) {
            return $http.post(backEndBaseUrl + "/admin/vendor/create", vendor);
        };

        adminFactory.updateVendor = function(vendor) {
            return $http.put(backEndBaseUrl + "/admin/vendor/edit/" + vendor.userid, vendor);
        };

        adminFactory.deleteVendor = function(vendor) {
            return $http.delete(backEndBaseUrl + "/admin/vendor/delete/" + vendor.userid);
        };

        //User --> Address related functions
        adminFactory.createAddress = function(userId, address) {
            return $http.post(backEndBaseUrl + "/admin/create/address/" + userId, address);
        };

        //User --> Customer related functions
        adminFactory.getCustomers = function() {
            return $http.get(backEndBaseUrl + "/admin/customer/get/all");
        }

        adminFactory.getCustomer = function(id) {
            return $http.get(backEndBaseUrl + "/admin/customer/get/" + id);
        };

        adminFactory.createCustomer = function(customer) {
            return $http.post(backEndBaseUrl + "/admin/customer/create", customer);
        };

        adminFactory.updateCustomer = function(customer) {
            return $http.put(backEndBaseUrl + "/admin/customer/edit/" + customer.userid, customer);
        };

        adminFactory.deleteCustomer = function(customer) {
            return $http.delete(backEndBaseUrl + "/admin/customer/delete/" + customer.userid);
        };


        return adminFactory;


    }]);