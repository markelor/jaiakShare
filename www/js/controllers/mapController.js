angular.module('jaia.mapController', ['jaia.jaiakServices', ])
    .controller('MapCtrl', function($cordovaToast, $scope, $cordovaGeolocation, $http, JaiakServices, $ionicLoading, $state, $interval) {
        //var distancia = 10000;

        $interval(function() { $scope.datuakLortu(); }, 300000);
        $scope.datuakLortu = function() {
            url = "https://dl.dropbox.com/s/qfmqwj60gy4kbls/tabernak.json?dl=0";
            var promise = JaiakServices.jsonFitxategia(url);
            promise.then(function(response) {
                if (response === "error") {
                    //ez da internetera konektatu
                    $cordovaToast
                        .show('Here is a message', 'long', 'center')
                        .then(function(success) {
                            // success
                        }, function(error) {
                            // error
                        });
                    if (window.localStorage.getItem("mapa") === null) {
                        //lehendabiziko aldiz abitu da programa eta ez dago konexiorik
                        internetGabeLehenAldizKargatu();
                        console.log("local json");

                    } else {
                        //ez dago konexiorik eta datuak localStoragen daude
                        console.log("localStoragen");
                        $scope.tabernak = JSON.parse(window.localStorage.getItem("mapa"));

                    }

                } else {
                    console.log("interneten");
                    //internet dago eta konexioa ondo egin da
                    $scope.tabernak = response;
                    window.localStorage.setItem("mapa", JSON.stringify(response));
                }
                // Mapa hasieratu //
                $scope.initialise = function() {
                    var options = { timeout: 10000, enableHighAccuracy: true };
                    var myLatlng = new google.maps.LatLng(25.718372, 32.65805);
                    var mapOptions = {
                        center: myLatlng,
                        zoom: 6,
                        mapTypeId: google.maps.MapTypeId.HYBRID
                    };
                    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
                    // Geo Location /
                    $cordovaGeolocation.getCurrentPosition(options).then(function(pos) {
                        //maparen zentrua aukeratu
                        map.setCenter(new google.maps.LatLng($scope.tabernak[1].koordenatuak[0].lat, $scope.tabernak[1].koordenatuak[0].lng));
                        //nire posizioa kalkulatu
                        var myLocation = new google.maps.Marker({
                            position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                            map: map,
                            animation: google.maps.Animation.DROP,
                            title: "Hemen nago"
                        });
                    }, function(error) {
                        console.log("Could not get location");
                    });
                    $scope.map = map;
                    // Gehituko dren tabernen markagailuak //
                    $scope.markers = [];
                    var infoWindow = new google.maps.InfoWindow();
                    var createMarker = function(taberna) {
                        var marker = new google.maps.Marker({
                            position: new google.maps.LatLng(taberna.koordenatuak[0].lat, taberna.koordenatuak[0].lng),
                            map: $scope.map,
                            animation: google.maps.Animation.DROP,
                            title: taberna.izena,
                            icon: 'img/beer.gif'
                        });
                        marker.content = '<div class="infoWindowContent">' + taberna.izena + '</div>';
                        google.maps.event.addListener(marker, 'click', function() {
                            infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
                            infoWindow.open($scope.map, marker);
                        });
                        $scope.markers.push(marker);
                    };

                    //tabernei markagailua erantsi
                    for (i = 0; i < $scope.tabernak.length; i++) {
                        createMarker($scope.tabernak[i]);
                    }

                };
                google.maps.event.addDomListener(document.getElementById("map"), 'load', $scope.initialise());
            });
        };

        $scope.onSwipeRight = function() {
            $state.go('tab.ekitaldiak');
        };
        $scope.onSwipeLeft = function() {
            $state.go('tab.kontaktua');
        };


    });
