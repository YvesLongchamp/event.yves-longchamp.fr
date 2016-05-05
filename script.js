(function() {
	var app = angular.module('myApp', []);

	app.controller('myController', function($scope, $http) {
		$http.get("mySQL.php")
    	.then(function (response) {$scope.users_DB = response.data.users;});
    	/*$http.get("http://www.w3schools.com/angular/customers_mysql.php")
    	.then(function (response) {$scope.TRUC = response.data.records;});*/
	});

	/*var users = {
		name: 'Rambo',
		size: 1.7,
		angry: true,
	}*/

})();
