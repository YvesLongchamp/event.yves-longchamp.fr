(function() {
	var app = angular.module('myApp', []);

	app.controller('getController', function($scope, $http) {
		$http.get("../PHP/getUsersSQL.php")
    	.then(function (response) {$scope.users_DB = response.data;});

	});

	app.controller('putController', ['$scope','$http',function($scope, $http) {
		$scope.formType = {
			pseudo : "",
			email : "",
			password : ""
		};
		$scope.logType = {
			pseudo : "",
			password : ""
		};
		$scope.reponse = "rien";
		
		this.postOnDatabase = function() {
		    $http.post("../PHP/postSQL.php",$scope.formType)
        	.then(
        		function succesCallBack(response) {
        			console.log("Inserted successfully :)");
        		}
        		,function errorCallBack(response){
        			console.log("Something went bad :(");
        		});
   		$scope.formType = {};
		};
		
		this.login = function() {
			console.log("function called.");
			console.log($scope.logType);
			$http.post("../PHP/checkingSQL.php",$scope.logType)
			.then(
				function succesCallBack(response){
					console.log(response);
					$scope.reponse = response.data;
				}
				,function errorCallBack(response){
					console.log("Bad.");
				});
			//$scope.logType.password = "";
		};	

	}]);
})();
