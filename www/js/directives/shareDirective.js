angular.module("jaia.shareDirective", [])
    .directive('shareDirective', function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/share.html',
            controller:"ShareCtrl"
        };
    })
    .controller('ShareCtrl', function($scope) {
        console.log("hemen");
        $scope.shareAnywhere = function() {
            $cordovaSocialSharing.shareViaWhatsApp("Aplikazioari WhatsUp bidezko partekatzea jarri diot eta probatzen ari naiz ", "http://i.imgur.com/lENhudU.jpg", "https://www.dropbox.com/sh/hff0ws31yfn29q4/AACmOIHnXpS8bHBczMAKehNKa?dl=0");
            $cordovaSocialSharing.shareViaTwitter("Aplikazioari Twitter bidezko partekatzea jarri diot eta probatzen ari naiz ", "http://i.imgur.com/lENhudU.jpg", "https://www.dropbox.com/sh/hff0ws31yfn29q4/AACmOIHnXpS8bHBczMAKehNKa?dl=0");
        };

        /*  $cordovaSocialSharing
    .share(message, subject, file, link) // Share via native share sheet
    .then(function(result) {
      // Success!
    }, function(err) {
      // An error occured. Show a message to the user
    });

  $cordovaSocialSharing
    .shareViaTwitter(message, image, link)
    .then(function(result) {
      // Success!
    }, function(err) {
      // An error occurred. Show a message to the user
    });

  $cordovaSocialSharing
    .shareViaWhatsApp(message, image, link)
    .then(function(result) {
      // Success!
    }, function(err) {
      // An error occurred. Show a message to the user
    });

  $cordovaSocialSharing
    .shareViaFacebook(message, image, link)
    .then(function(result) {
      // Success!
    }, function(err) {
      // An error occurred. Show a message to the user
    });

  // access multiple numbers in a string like: '0612345678,0687654321'
  $cordovaSocialSharing
    .shareViaSMS(message, number)
    .then(function(result) {
      // Success!
    }, function(err) {
      // An error occurred. Show a message to the user
    });

// toArr, ccArr and bccArr must be an array, file can be either null, string or array
  $cordovaSocialSharing
    .shareViaEmail(message, subject, toArr, ccArr, bccArr, file)
    .then(function(result) {
      // Success!
    }, function(err) {
      // An error occurred. Show a message to the user
    });

  $cordovaSocialSharing
    .canShareVia(socialType, message, image, link)
    .then(function(result) {
      // Success!
    }, function(err) {
      // An error occurred. Show a message to the user
    });

  $cordovaSocialSharing
    .canShareViaEmail()
    .then(function(result) {
      // Yes we can
    }, function(err) {
      // Nope
    });
*/
    });
