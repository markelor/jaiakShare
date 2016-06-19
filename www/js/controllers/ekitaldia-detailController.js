angular.module('jaia.ekitaldiaDetailController', [])
    .controller('EkitaldiaDetailCtrl', function($scope, $stateParams, $state, $ionicHistory, $cordovaSocialSharing) {

        $scope.ekitaldia = $stateParams.ekitaldiak[$stateParams.index];
        $scope.eguna=$stateParams.ekitaldiak;
        $scope.ekitaldietaraItzuli = function() {
            $state.go('tab.ekitaldiak');
            $ionicHistory.clearHistory();
        };

        $scope.onSwipeLeft = function() {
            if ($stateParams.index !== $stateParams.ekitaldiak.length - 1)
                $stateParams.index = $stateParams.index + 1;
            $scope.ekitaldia = $stateParams.ekitaldiak[$stateParams.index];
            console.log($scope.ekitaldia.izenburua);
        };
        $scope.onSwipeRight = function() {
            if ($stateParams.index !== 0)
                $stateParams.index = $stateParams.index - 1;
            $scope.ekitaldia = $stateParams.ekitaldiak[$stateParams.index];
            console.log($scope.ekitaldia.izenburua);
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
                katea = objToString($scope.ekitaldia);     
                console.log(katea);
                console.log($scope.eguna);
            $cordovaSocialSharing
                .share(katea, "Antzuolako festak", null, "https://www.dropbox.com/sh/hff0ws31yfn29q4/AACmOIHnXpS8bHBczMAKehNKa?dl=0") // Share via native share sheet
                .then(function(result) {}, function(err) {
                    // An error occured. Show a message to the user
                });

        };
    });
