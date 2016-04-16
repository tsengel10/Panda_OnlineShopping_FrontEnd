angular.module("panda")
    .factory('httpRequestInterceptor', function($rootScope) {
        return {
            request: function(config) {

                if ($rootScope.tokenObj !== undefined)
                    config.headers['PandaAuthToken'] = $rootScope.tokenObj.token;
                else {
                    config.headers['PandaAuthToken'] = '';
                    $rootScope.isLoggedIn = false;
                }


                return config;
            }
        };
    });