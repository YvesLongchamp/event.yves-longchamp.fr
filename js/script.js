(function() {
	var app = angular.module('myApp', ['ngCookies']);

	app.controller('getUsersController', [ '$scope', '$http', function($scope, $http) {
		$http.get("../PHP/getUsersSQL.php")
		.then(function (response) {
			$scope.users_DB = response.data;
		});
	}]);

	app.controller('getEventsController', [ '$scope', '$http', function($scope, $http) {
		$http.get("../PHP/getEventsSQL.php")
		.then(function (response) {
			$scope.events_DB = response.data;
		});

	}]);

	app.controller('postController', ['$scope','$http','$window','$cookies',function($scope, $http, $window,$cookies) {
		$scope.formType = {
			pseudo : "",
			email : "",
			password : ""
		};
		$scope.logType = {
			pseudo : "",
			password : "",
			rememberCheck : "false"
		};
		$scope.reponse = "rien";
		
		this.postOnDatabase = function() {
		    $http.post("../PHP/postSQL.php",$scope.formType)
        	.then(
        		function succesCallBack(response) {
        			console.log("Inserted successfully :)");
   					$scope.formType = {};        			
        			$window.location.href = "index.html";
        		}
        		,function errorCallBack(response){
        			console.log("Something went bad :(");
        		});

		};
		
		this.login = function() {
			$http.post("../PHP/checkingSQL.php",$scope.logType)
			.then(
				function succesCallBack(response){
					$scope.reponse = response.data;
					if($scope.reponse === "true") {
						$window.location.href = "index.html";
					} else {
						$window.alert("Bad credentials");
						$scope.logType.password = "";
					}
				}
				,function errorCallBack(response){
					console.log("Bad.");
				});
		};	



	}]);

	app.controller('cookieController', ['$scope','$cookies','$window', function($scope, $cookies, $window) {
		$scope.cookieUser = {
			val : false,
			pseudo : ""
		};
		this.checkTheCookie = function() {
			$scope.cookieUser.pseudo = $cookies.get("AYBABTU");
			if(angular.isDefined($scope.cookieUser.pseudo)) {
				$scope.cookieUser.val = true;
			} else {
				$scope.cookieUser.val = false;
			}
		};
		this.checkTheCookie();

		this.logout = function() {
			$cookies.remove("AYBABTU");
			$window.alert("You've been disconnected.");
			this.checkTheCookie();
		};
	}]);

    app.directive('rpgNavbarMenu', function() {
        return {
            templateUrl : 'templates-html/navbarMenu.html' 
        };
    });
    app.directive('rpgFooter', function() {
        return {
            templateUrl : 'templates-html/footerEvents.html'
        }
    })

})();
