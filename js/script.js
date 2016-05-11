(function() {
	var app = angular.module('myApp', ['ngCookies']);

	app.controller('getController', function($scope, $http) {
		$http.get("../PHP/getUsersSQL.php")
    	.then(function (response) {$scope.users_DB = response.data;});

	});

	app.controller('postController', ['$scope','$http','$window','$cookies',function($scope, $http, $window,$cookies) {
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
			$http.post("../PHP/checkingSQL.php",$scope.logType)
			.then(
				function succesCallBack(response){
					$scope.reponse = response.data;
					if($scope.reponse === "true") {
						$cookies.put("AOYBBTU",$scope.logType.pseudo,new Date());
						$window.location.href = "index.html";
					} else {
						$window.alert("Bad IDs");
						$scope.logType.password = "";
					}
				}
				,function errorCallBack(response){
					console.log("Bad.");
				});
		};	

	}]);

	app.controller('cookieController', ['$scope','$cookies', function($scope, $cookies) {
		$scope.cookieUser = {};
		this.checkTheCookie = function() {
			$scope.cookieUser.key = $cookies.get("AOYBBTU");
			if($scope.cookieUser != "") {
				$scope.cookieUser.val = true;
			} else {
				$scope.cookieUser.val = false;
			}
		}
	}]);
})();
