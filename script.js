(function() {
	var app = angular.module('myApp', []);

	app.controller('getController', function($scope, $http) {
		$http.get("getUsersSQL.php")
    	.then(function (response) {$scope.users_DB = response.data;});

	});

	app.controller('putController', ['$scope','$http',function($scope, $http) {
		$scope.formType = {
			pseudo: "",
			password: "",
			email: "",
		};
		$scope.postOnDatabase = function() {
		console.log("debug1");
		    $http.post("postSQL.php",{pseudo : $scope.formType.pseudo, email : $scope.formType.email, password : $scope.formType.password})
        	.then(
		    function (response) {
            		console.log("inserted Successfully");
		    },
		    function(response) {
			console.log("There is a problem D:");
		    }
		);
   		$scope.formType = {};
		};	

	}]);
})();
