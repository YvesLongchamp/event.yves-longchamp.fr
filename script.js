(function() {
	var app = angular.module('myApp', []);

	app.controller('myController', function($scope, $http) {
		$http.get("mySQL.php")
    	.then(function (response) {$scope.users_DB = response.data;});

	});

	/*var users = {
		name: 'Rambo',
		size: 1.7,
		angry: true,
	}*/

})();
