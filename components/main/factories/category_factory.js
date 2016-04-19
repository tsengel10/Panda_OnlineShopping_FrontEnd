angular.module("panda")
    .factory("categoryFactory", ["$http", "backEndBaseUrl", function($http, backEndBaseUrl) {

        var categoryFactory = {};

        categoryFactory.getAllCategory = function() {
            return $http.get(backEndBaseUrl + "/category/get/all");
        }

        categoryFactory.getCategoryById = function(id) {
            return $http.get(backEndBaseUrl + "/category/get/" + id);
        };

        categoryFactory.createCategory = function(category) {
            return $http.post(backEndBaseUrl + "/category/create", category);
        };

        categoryFactory.updateCategory = function(category) {
            return $http.put(backEndBaseUrl + "/category/edit/" + category.categoryId, category);
        };

        return categoryFactory;
    }]);