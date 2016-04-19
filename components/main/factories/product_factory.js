angular.module("panda")
    .factory("productFactory", ["$http", "backEndBaseUrl", function($http, backEndBaseUrl) {

        var productFactory = {};

        productFactory.getAllProducts = function() {
            return $http.get(backEndBaseUrl + "/product/get/all");
        }

        productFactory.getProductById = function(id) {
            return $http.get(backEndBaseUrl + "/product/get/" + id);
        };

        productFactory.createProduct = function(product) {
            return $http.post(backEndBaseUrl + "/product/create", product);
        };

        productFactory.updateProduct = function(product) {
            return $http.put(backEndBaseUrl + "/product/edit/" + product.productId, product);
        };

        return productFactory;
    }]);