//Application name and array of dependencies ...
angular.module("panda", ["ui.router", "ngMaterial", "validation.match"])
    .constant("backEndBaseUrl", "http://localhost:8080/my_project")
    .config(function($mdThemingProvider, $stateProvider, $httpProvider) {

        $httpProvider.interceptors.push('httpRequestInterceptor');

        $mdThemingProvider.theme("default")
            .primaryPalette("teal")
            .accentPalette("orange");

        //window.location = "#/";

        $stateProvider
            .state('root', {
                // Root state, Can be overridden in child states...
                abstract: true,
                views: {
                    '': {
                        templateUrl: 'components/main/pages/layout.html'
                    },
                    'header@root': {
                        templateUrl: 'components/main/pages/assets/header.html',
                        controller: 'headerController as vm'
                    },
                    'footer@root': {
                        templateUrl: 'components/main/pages/assets/footer.html'
                    },
                    'main@root': {
                        templateUrl: 'components/main/pages/main.html'
                    }
                }
            })
            .state("/", {
                parent: 'root',
                url: "/",
                views: {
                    'main': {
                        templateUrl: 'components/main/pages/main.html',
                        controller: "mainController as vm"
                    }
                },
                params: {
                    redirect_message: null
                }
            })
            .state("logout", {
                url: "/logout",
                parent: 'root',
                views: {
                    'main': {
                        controller: "logoutController as vm",
                        templateUrl: 'components/main/pages/main.html'
                    }
                }
            })
            .state("login", {
                parent: 'root',
                url: "/login",
                views: {
                    'main': {
                        controller: "authenticationController as vm",
                        templateUrl: 'components/authentication/login.html'
                    }
                }
            })
            .state("admin", {
                parent: "root",
                url: "/admin",
                views: {
                    'main': {
                        controller: "adminActionsController as vm",
                        templateUrl: 'components/admin/admin_actions.html'
                    }
                }
            })
            // Manage admins state
            .state("admin.manage_admins", {
                url: "/manage_admins",
                views: {
                    'adminActions': {
                        templateUrl: "components/admin/manage_admins/admins.html",
                        controller: "adminsController as vm"
                    }
                }
            })
            .state("admin.manage_admins.new", {
                url: "/new",
                views: {
                    'actions': {
                        templateUrl: "components/admin/manage_admins/new/admin_new_view.html",
                        controller: "newAdminController as vm"
                    }
                }
            })
            .state("admin.manage_admins.edit", {
                url: "/edit/:id",
                views: {
                    'actions': {
                        templateUrl: "components/admin/manage_admins/edit/admin_edit_view.html",
                        controller: "editAdminController as vm"
                    }
                },
                params: {
                    admin: null
                }
            })
            // Manage vendors state
            .state("admin.manage_vendors", {
                url: "/manage_vendors",
                views: {
                    'adminActions': {
                        templateUrl: "components/admin/manage_vendors/vendors.html",
                        controller: "vendorsController as vm"
                    }
                }
            })
            .state("admin.manage_vendors.new", {
                url: "/new",
                views: {
                    'actions': {
                        templateUrl: "components/admin/manage_vendors/new/vendor_new_view.html",
                        controller: "newVendorController as vm"
                    }
                }
            })
            .state("admin.manage_vendors.new_address", {
                url: "/new_address/:id",
                views: {
                    'actions': {
                        templateUrl: "components/admin/manage_vendors/new_address/vendor_new_address_view.html",
                        controller: "newVendorAddressController as vm"
                    }
                },
                params: {
                    vendor: null
                }
            })
            .state("admin.manage_vendors.edit", {
                url: "/edit/:id",
                views: {
                    'actions': {
                        templateUrl: "components/admin/manage_vendors/edit/vendor_edit_view.html",
                        controller: "editVendorController as vm"
                    }
                },
                params: {
                    vendor: null
                }
            })
            // //Manage customers state
            .state("admin.manage_customers", {
                url: "/manage_customers",
                views: {
                    'adminActions': {
                        templateUrl: "components/admin/manage_customers/customers.html",
                        controller: "customersController as vm"
                    }
                }
            })
            .state("admin.manage_customers.new", {
                url: "/new",
                views: {
                    'actions': {
                        templateUrl: "components/admin/manage_customers/new/customer_new_view.html",
                        controller: "newCustomerController as vm"
                    }
                }
            })
            .state("admin.manage_customers.new_address", {
                url: "/new_address/:id",
                views: {
                    'actions': {
                        templateUrl: "components/admin/manage_customers/new_address/customer_new_address_view.html",
                        controller: "newCustomerAddressController as vm"
                    }
                },
                params: {
                    customer: null
                }
            })
            .state("admin.manage_customers.edit", {
                url: "/edit/:id",
                views: {
                    'actions': {
                        templateUrl: "components/admin/manage_customers/edit/customer_edit_view.html",
                        controller: "editCustomerController as vm"
                    }
                },
                params: {
                    customer: null
                }
            })
            //Customer related states goes here
            .state("customer", {
                parent: 'root',
                url: "/customer",
                views: {
                    'main': {
                        templateUrl: "components/main/customer/customer_view.html",
                        controller: "customerController as vm"
                    }
                }
            })
            //Vendor related states goes here
            .state("vendor", {
                parent: 'root',
                url: "/vendor",
                views: {
                    "main": {
                        templateUrl: "components/main/vendor/vendor_view.html",
                        controller: "vendorController as vm",
                    }
                }
            })
            .state("vendor.new_address", {
                url: "/new_address",
                views: {
                    'actions': {
                        templateUrl: "components/main/vendor/new_address/vendor_new_address_view.html",
                        controller: "newOwnVendorAddressController as vm"
                    }
                },
                params: {
                    vendor: null
                }
            })
            .state("vendor.edit", {
                url: "/edit",
                views: {
                    'actions': {
                        templateUrl: "components/main/vendor/edit/vendor_edit_view.html",
                        controller: "editVendorOwnController as vm"
                    }
                },
                params: {
                    vendor: null
                }
            })




    });