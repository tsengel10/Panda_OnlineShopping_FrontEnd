//Application name and array of dependencies ...
angular.module("panda", ["ui.router", "ngMaterial"])
    .constant("backEndBaseUrl", "http://localhost:8080/my_project")
    .config(function($mdThemingProvider, $stateProvider, $httpProvider) {

        $httpProvider.interceptors.push('httpRequestInterceptor');

        $mdThemingProvider.theme("default")
            .primaryPalette("teal")
            .accentPalette("orange");

        window.location = "#/";

        $stateProvider
            .state("/", {
                url: "/",
                templateUrl: "components/main/main_view.html",
                controller: "mainController as vm",
                params: {
                    redirect_message: null
                }
            })
            .state("logout", {
                url: "/logout",
                controller: "logoutController as vm"
            })
            .state("login", {
                url: "/login",
                templateUrl: "components/authentication/login.html",
                controller: "authenticationController as vm"
            })
            .state("customer", {
                url: "/customer",
                templateUrl: "components/main/customer/customer_view.html",
                controller: "customerController as vm"
            })
            .state("vendor", {
                url: "/vendor",
                templateUrl: "components/main/vendor/vendor_view.html",
                controller: "vendorController as vm"
            })
            .state("admin", {
                url: "/admin",
                templateUrl: "components/admin/admin_actions.html",
                controller: "adminActionsController as vm"
            })
            //Manage admins state
            .state("admin.manage_admins", {
                url: "/manage_admins",
                templateUrl: "components/admin/manage_admins/admins.html",
                controller: "adminsController as vm"
            })
            .state("admin.manage_admins.new", {
                url: "/new",
                templateUrl: "components/admin/manage_admins/new/admin_new_view.html",
                controller: "newAdminController as vm"
            })
            .state("admin.manage_admins.edit", {
                url: "/edit/:id",
                templateUrl: "components/admin/manage_admins/edit/admin_edit_view.html",
                controller: "editAdminController as vm",
                params: {
                    admin: null
                }
            })
            //Manage vendors state
            .state("admin.manage_vendors", {
                url: "/manage_vendors",
                templateUrl: "components/admin/manage_vendors/vendors.html",
                controller: "vendorsController as vm"
            })
            .state("admin.manage_vendors.new", {
                url: "/new",
                templateUrl: "components/admin/manage_vendors/new/vendor_new_view.html",
                controller: "newVendorController as vm"
            })
            .state("admin.manage_vendors.new_address", {
                url: "/new_address/:id",
                templateUrl: "components/admin/manage_vendors/new_address/vendor_new_address_view.html",
                controller: "newVendorAddressController as vm",
                params: {
                    vendor: null
                }
            })
            .state("admin.manage_vendors.edit", {
                url: "/edit/:id",
                templateUrl: "components/admin/manage_vendors/edit/vendor_edit_view.html",
                controller: "editVendorController as vm",
                params: {
                    vendor: null
                }
            })
            //Manage customers state
            .state("admin.manage_customers", {
                url: "/manage_customers",
                templateUrl: "components/admin/manage_customers/customers.html",
                controller: "customersController as vm"
            })
            .state("admin.manage_customers.new", {
                url: "/new",
                templateUrl: "components/admin/manage_customers/new/customer_new_view.html",
                controller: "newCustomerController as vm"
            })
            .state("admin.manage_customers.new_address", {
                url: "/new_address/:id",
                templateUrl: "components/admin/manage_customers/new_address/customer_new_address_view.html",
                controller: "newCustomerAddressController as vm",
                params: {
                    customer: null
                }
            })
            .state("admin.manage_customers.edit", {
                url: "/edit/:id",
                templateUrl: "components/admin/manage_customers/edit/customer_edit_view.html",
                controller: "editCustomerController as vm",
                params: {
                    customer: null
                }
            })




    });