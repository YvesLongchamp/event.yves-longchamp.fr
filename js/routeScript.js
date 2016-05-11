angular.module('ngRouteUser', ['ngRoute'])

 .controller('MainController', function($scope, $route, $routeParams, $location) {
     $scope.$route = $route;
     $scope.$location = $location;
     $scope.$routeParams = $routeParams;
 })

 .controller('eventsController', function($scope, $routeParams) {
     $scope.name = "eventsController";
     $scope.params = $routeParams;
 })

 .controller('engageController', function($scope, $routeParams) {
     $scope.name = "engageController";
     $scope.params = $routeParams;
 })

.config(function($routeProvider, $locationProvider) {
  $routeProvider
   .when('/events/:eventID', {
    templateUrl: 'event.html',
    controller: 'eventsController',
    resolve: {
     
      delay: function($q, $timeout) {
        var delay = $q.defer();
        $timeout(delay.resolve, 1000);// <=> 1 sec of delay.
        return delay.promise;
      }
    }
  })
  .when('/Book/:bookId/ch/:engageId', {
    templateUrl: 'engage.html',
    controller: 'engageController'
  });

  // configure html5 to get links working on jsfiddle.
  $locationProvider.html5Mode(true);
});