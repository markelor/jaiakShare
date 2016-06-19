angular.module('jaia.jaiakServices', [])

.factory('JaiakServices', ['$http', function($http) {
    var jsonFitxategia = function(url) {
        return $http({
                url: url,
                method: "GET"

            })
            .then(function(response) {
                return response.data;

            }, function(error) {
                error.data = "error";
                return error.data;
                


            });

    };
    return {
        jsonFitxategia: jsonFitxategia,
    };

}]);
