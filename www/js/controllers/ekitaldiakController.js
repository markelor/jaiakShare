angular.module('jaia.ekitaldiakController', ['jaia.jaiakServices', 'jaia.shareDirective'])

.controller('EkitaldiakCtrl', function($cordovaSplashscreen, $translate, $scope, $cordovaSocialSharing, $ionicSideMenuDelegate, $interval, JaiakServices, $window) {

    //http deia asinkronoa denez, behin deia egin eta datuak lortuta gainontzekoa egingo dugu.
    //horretarako promise honetaz baliatuko gara, hau da egindu bat bata bestearen ondoren egin dadin
    //$state.go($state.current, {}, {reload: true});
    //local storage ordubetero eguneratuko dugu hemen
    // window.localStorage.setItem("jaiak",JSON.stringify(response));
    //$window.localStorage[key] = value;
    $cordovaSplashscreen.show();

    $scope.lang = window.localStorage.getItem("lang");
    $translate('localStorage')
        .then(function(value) {
            $scope.localStorage = value;
        });
    $translate('urlLocal')
        .then(function(value) {
            $scope.urlLocal = value;
        });
    $translate('urlInternet')
        .then(function(value) {
            $scope.urlInternet = value;
            $scope.datuakLortu();
        });

    $scope.selectLang = function(lang) {
        if (lang === "es")
            lang = "eu";
        else
            lang = "es";
        window.localStorage.setItem("lang", lang);
        $window.location.reload();
    };

    $interval(function() { $scope.datuakLortu(); }, 300000);
    $scope.datuakLortu = function() {
        url = $scope.urlInternet;
        console.log(url);
        var promise = JaiakServices.jsonFitxategia(url);
        promise.then(function(response) {
            if (response === "error") {
                //ez da internetera konektatu
                if (window.localStorage.getItem($scope.localStorage) === null) {
                    //lehendabiziko aldiz abitu da programa eta ez dago konexiorik
                    internetGabeLehenAldizKargatu();
                    console.log("local json");

                } else {
                    //ez dago konexiorik eta datuak localStoragen daude
                    console.log("localStoragen");
                    $scope.egitaraua = JSON.parse(window.localStorage.getItem($scope.localStorage));
                    console.log($scope.egitaraua);
                    //defektuz lehen eguneko ekilaldia jarri
                    $scope.ekitaldiak = $scope.egitaraua[0].ekitaldiak;
                    $scope.eguna = $scope.egitaraua[0].eguna;
                }

                //$scope.ekitaldiak = $scope.egitaraua[0].ekitaldiak;

            } else {
                console.log("interneten");
                //internet dago eta konexioa ondo egin da
                $scope.egitaraua = response;
                //defektuz lehen eguneko ekilaldia jarri
                $scope.ekitaldiak = $scope.egitaraua[0].ekitaldiak;
                $scope.eguna = $scope.egitaraua[0].eguna;
                //local Storage eguneratu
                //window.localStorage.clear();
                console.log($scope.localStorage);
                window.localStorage.setItem($scope.localStorage, JSON.stringify(response));
            }

        });

    };
    internetGabeLehenAldizKargatu = function() {
        url = $scope.urlLocal;
        var promise = JaiakServices.jsonFitxategia(url);
        promise.then(function(response) {
            $scope.egitaraua = response;
            $scope.ekitaldiak = $scope.egitaraua[0].ekitaldiak;
            $scope.eguna = $scope.egitaraua[0].eguna;
        });
    };

    $scope.egunaAukeratu = function(index, eguna) {
        $scope.ekitaldiak = eguna.ekitaldiak;
        $scope.eguna = eguna.eguna;
    };
    $scope.onSwipeLeft = function() {
        if (openSideMenu === false) {
            console.log("itxita");

            $state.go('tab.map');
        } else {
            console.log("irekita");
        }
    };

    function objToString(obj) {
        var str = '';
        for (var p in obj) {
            if (p === "$$hashKey") {

            } else {
                if (obj.hasOwnProperty(p)) {
                    str += p + ':' + obj[p] + '\n';
                }
            }

        }
        return str;
    }

    $scope.shareAnywhere = function() {
        ekitaldia = $scope.eguna + '\n';
        $scope.ekitaldiak.forEach(function(value) {
            a = objToString(value);
            ekitaldia += a + '\n';
        });
        $cordovaSocialSharing
            .share(ekitaldia, "Antzuolako festak", null, "https://www.dropbox.com/sh/hff0ws31yfn29q4/AACmOIHnXpS8bHBczMAKehNKa?dl=0") // Share via native share sheet
            .then(function(result) {}, function(err) {
                // An error occured. Show a message to the user
            });

    };

});
