angular.module("panda")
    .controller("vendorAddProduct", ["$state", "$scope", "$mdSidenav", "$mdDialog",
        "$mdToast", "$timeout", "productFactory",

        function($state, $scope, $mdSidenav, $mdDialog, $mdToast, $timeout, productFactory) {

            $mdDialog.show({
                controller: "vendorAddProductDialog as vm",
                templateUrl: 'components/main/vendor/add_product/add_product_view.html',
                parent: angular.element(document.body),
                clickOutsideToClose: false,
                fullscreen: true
            });

        }
    ])
    .controller("vendorAddProductDialog", ["$state", "$scope", "$mdSidenav", "$mdDialog",
        "$mdToast", "$timeout", "categoryFactory", "inventoryFactory", "productFactory",
        function($state, $scope, $mdSidenav, $mdDialog, $mdToast, $timeout, categoryFactory,
            inventoryFactory, productFactory) {

            var vm = this;
            vm.vendorId = $state.params.vendor.userid;
            vm.product;
            vm.categories;
            vm.cancel = cancel;
            vm.getDate = getDate;
            vm.products;
            vm.newCat;
            vm.addNewCat = addNewCat;
            vm.img = [];
            vm.addProduct = addProduct;

            console.log($state.params);

            function addProduct(product, images) {
                product.CreatedDate = getDate();
                product.pictures = []
                product.vendorId = vm.vendorId;
                images.forEach(function(image) {
                    product.pictures.push({ "pictureLink": image });
                });
                $scope.$emit("newProduct", product);
                cancel();
            }

            function addNewCat(category) {
                categoryFactory.createCategory(category)
                    .then(function() {
                        categoryFactory.getAllCategory()
                            .then(function(categories) {
                                vm.categories = categories.data;
                            });
                    });
                vm.newCat = {};
            }

            function cancel() {
                $mdDialog.cancel();
                $state.go("vendor");
            }

            function getDate() {
                var currentDate = new Date();
                var day = currentDate.getDate();
                var month = currentDate.getMonth() + 1;
                var year = currentDate.getFullYear();

                return year + "-" + month + "-" + day;
            }

            categoryFactory.getAllCategory()
                .then(function(categories) {
                    vm.categories = categories.data;
                });

            productFactory.getAllProducts()
                .then(function(products) {
                    vm.products = products.data;
                });

        }
    ])


;