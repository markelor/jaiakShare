angular.module('jaia.kontaktuaController', [])
    .controller('KontaktuaCtrl', function($scope, $state) {
	$scope.onSwipeRight = function() {
    $state.go('tab.map');
};
});

