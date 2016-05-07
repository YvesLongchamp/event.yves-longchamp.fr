(function() {
	var app = angular.module('myApp', []);

	app.controller('getController', function($scope, $http) {
		$http.get("mySQL.php")
    	.then(function (response) {$scope.users_DB = response.data;});

	});

	app.controller('putController', function($scope, $http) {
		$scope.formType = {
			pseudo: "",
			firstname: "",
			lastname: "",
			email: ""
		};

		$scope.postOnDatabase = function() {
			$http.post("postSQL.php",{$scope.formType.pseudo,$scope.formType.firstname, $scope.formType.lastname, $scope.formType.email,10,10})
        	.success(function(data, status, headers, config){
            	console.log("inserted Successfully");});
		};

	});
})();
