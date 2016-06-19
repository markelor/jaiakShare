// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('jaia', ['ionic', 'ngCordova', 'jaia.ekitaldiakController', 'jaia.ekitaldiaDetailController', 'jaia.mapController', 'jaia.kontaktuaController', 'pascalprecht.translate'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            // Don't remove this line unless you know what you are doing. It stops the viewport
            // from snapping when text inputs are focused. Ionic handles this internally for
            // a much nicer keyboard experience.
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
        if (!window.localStorage.getItem("lang")) {
            window.localStorage.setItem("lang", "eu");
        }
    });
}).config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $translateProvider) {
    $translateProvider.translations("eu", {
        "hizkuntza": "Es",
        "egunak": "Egunak",
        "ekitaldiak": "Ekitaldiak",
        "tabernak": "Tabernak",
        "kontaktua": "kontaktua",
        "urlInternet": "https://dl.dropbox.com/s/x9x9t7nzkb7l4hq/jaiak.json?dl=0",
        "urlLocal": "server/jaiak.json",
        "localStorage": "jaiak"
    });
    $translateProvider.translations("es", {
        "hizkuntza": "Eu",
        "egunak": "Dias",
        "ekitaldiak": "Actividades",
        "tabernak": "Bares",
        "kontaktua": "Contacto",
        "urlInternet": "https://dl.dropbox.com/s/r9y0gcoeuioh64m/fiestas.json?dl=0",
        "urlLocal": "server/fiestas.json",
        "localStorage": "fiestas"
    });

    //navigator.language -> en
    if (!window.localStorage.getItem("lang")) {
        $translateProvider.preferredLanguage('eu');
    } else {
        $translateProvider.preferredLanguage(window.localStorage.getItem("lang"));
    }
    
    $ionicConfigProvider.tabs.position("bottom");
    $ionicConfigProvider.navBar.alignTitle("center");
    $stateProvider
        .state('tab', {
            url: '/tab',
            abstract: true,
            templateUrl: 'templates/tabs.html'
        })
        .state('tab.ekitaldiak', {
            url: '/ekitaldiak',
            views: {
                'tab-ekitaldiak': {
                    templateUrl: 'templates/tab-ekitaldiak.html',
                    controller: 'EkitaldiakCtrl'
                }
            }
        })
        .state('tab.ekitaldia-detail', {
            url: '/ekitaldiak',
            params: { ekitaldiak: null, index: null },
            views: {
                'tab-ekitaldiak': {
                    templateUrl: 'templates/ekitaldia-detail.html',
                    controller: 'EkitaldiaDetailCtrl'
                }
            }
        })
        .state('tab.map', {
            url: '/map',
            views: {
                'tab-map': {
                    templateUrl: 'templates/map.html',
                    controller: 'MapCtrl'
                }
            }
        })
        .state('tab.kontaktua', {
            url: '/kontaktua',
            views: {
                'tab-kontaktua': {
                    templateUrl: 'templates/kontaktua.html',
                    controller: 'KontaktuaCtrl'
                }
            }
        });


    // defektuz hona, hau da, lehen orrira
    $urlRouterProvider.otherwise('/tab/ekitaldiak');

});
