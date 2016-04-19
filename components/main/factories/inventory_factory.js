angular.module("panda")
    .factory("inventoryFactory", ["$http", "backEndBaseUrl", function($http, backEndBaseUrl) {

        var inventoryFactory = {};

        inventoryFactory.getInventoryById = function(id) {
            return $http.get(backEndBaseUrl + "/inventory/get/" + id);
        }

        inventoryFactory.getInventoryByVendorId = function(id) {
            return $http.get(backEndBaseUrl + "/inventory/get/vendor/" + id);
        };

        inventoryFactory.getInventoryByProductId = function(id) {
            return $http.get(backEndBaseUrl + "/inventory/get/product/" + id);
        };

        inventoryFactory.createInventory = function(inventory) {
            return $http.post(backEndBaseUrl + "/inventory/create", inventory);
        };

        inventoryFactory.updateInventory = function(inventory) {
            return $http.put(backEndBaseUrl + "/inventory/edit/" + inventory.inventoryId, inventory);
        };

        return inventoryFactory;
    }]);