(function() {
	var app = angular.module('myApp', []);

	app.controller('getController', function($scope, $http) {
		$http.get("getUsersSQL.php")
    	.then(function (response) {$scope.users_DB = response.data;});

	});

	app.controller('putController', ['$scope','$http',function($scope, $http) {
		$scope.formType = {};
		$scope.logType = {};
		this.postOnDatabase = function() {
			console.log($scope.formType);
		    $http.post("postSQL.php",$scope.formType)
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
			$http.post("checkingSQL.php",$scope.logType)
			.then(
				function succesCallBack(response){
					console.log("Good.");
				}
				,function errorCallBack(response){
					console.log("Bad.");
				});
			$scope.logType = {};
		};	

	}]);
})();
