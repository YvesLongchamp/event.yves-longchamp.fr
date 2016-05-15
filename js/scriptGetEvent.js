(function() {
	angular.module('myApp', ['ngCookies', 'ngRoute']);

		.controller('getEventsController', [ '$scope', '$http', '$window', '$cookies', function($scope, $http, $window, $cookies) {
		$http.get("../PHP/getEventsSQL.php")
		.then(function (response) {
			$scope.events_DB = response.data;
			console.log($scope.events_DB);
		});


	}]);
})();