/* global angular, cordova, StatusBar, console, ionic*/
// @codekit-append "controllers.js"
// @codekit-append "services.js"
// @codekit-append "../templates/canvas/canvas.js"

angular.module('lucidMobile', ['ionic', 'lucidMobile.controllers', 'lucidMobile.services', 'lucidComponents', 'lucidShapesData', 'lucidCanvas', 'ngDraggable'])

.run(['$ionicPlatform', function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    }])
    .config(['$stateProvider', '$urlRouterProvider', '$sceDelegateProvider', function($stateProvider, $urlRouterProvider, $sceDelegateProvider) {
        ionic.Platform.setPlatform('android');
        $stateProvider
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/menu.html',
                controller: 'appCtrl'
            })
            .state('app.documents', {
                url: '/documents/:filter',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/documents.html',
                        controller: 'documentsCtrl'
                    }
                }
            })
            .state('app.folder', {
                url: '/folder/:folderID',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/documents.html',
                        controller: 'documentsCtrl'
                    }
                }
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/documents/');
        $sceDelegateProvider.resourceUrlWhitelist([
            // Allow same origin resource loads.
            'self',
            // Allow loading from our assets domain.  Notice the difference between * and **.
            'https://lucidsoftware.github.io/particle/components/**',
            'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/**'
        ]);
    }])
    .directive('iconSvg', function() {
        return {
            replace: true,
            restrict: 'E',
            templateUrl: function(elem, attrs) {
                return attrs.src;
            }
        };
    });