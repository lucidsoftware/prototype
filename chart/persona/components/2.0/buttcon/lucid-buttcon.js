angular.module("lucidButtcon", ['appConfig'])
    .directive('lucidButtcon', ['config', function(config) {
        return {
            restrict: 'E',
            scope: {
                icon: '@',
                label: '@',
                active: '='
            },
            replace: true,
            templateUrl: config.componentsURL + 'buttcon/lucid-buttcon.html',
        };
    }]);