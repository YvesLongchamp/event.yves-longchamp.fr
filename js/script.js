(function() {
	var app = angular.module('myApp', ['ngCookies']);



	app.controller('getUsersController', [ '$scope', '$http', function($scope, $http) {
		$http.get("../PHP/getUsersSQL.php")
		.then(function (response) {
			$scope.users_DB = response.data;
		});
	}]);




	app.controller('getEventsController', [ '$scope', '$http', '$window', '$cookies', function($scope, $http, $window, $cookies) {
		$http.get("../PHP/getEventsSQL.php")
		.then(function (response) {
			$scope.events_DB = response.data;
		});
		$scope.cookieUser = {};
		$scope.hasACookie = false;


        this.isEnroled = function (nameOfEvent) {
            console.log("appel");
            if($scope.hasACookie) {
                $http.post("../PHP/checkingEngageSQL.php",{name : nameOfEvent, pseudo : $scope.cookieUser.pseudo})
            .then(
                function succesCallBack(response) {
                    $scope.reponse = response.data;
                    console.log($scope.reponse);
                    if($scope.reponse == "true") {
                        return true;
                    } else {
                        return false;
                    }

                }
                ,function errorCallBack(response){
                    
                });
            } else {
                $scope.responseBool = false;
            } 
            
        };

		this.isConnected = function() {
			$scope.cookieUser.cookieVal = $cookies.get("AYBABTU");
			$http.post("../PHP/checkPsswrdCookieJSONSQL.php",{pseudo : $scope.cookieUser.cookieVal})
            .then(
                function succesCallBack(response) {
                    $scope.response = response.data;
                    if($scope.response != 'false') {
                        $scope.hasACookie = true;
                        $scope.cookieUser.pseudo = $scope.response;
                    } else {
			            $cookies.remove("AYBABYU");
                        $scope.hasACookie = false;
                    }

                }
                ,function errorCallBack(response){
                    
                });
		};


        this.enrol = function(nameOfEvent) {
            if($scope.hasACookie) {
                $http.post("../PHP/postEngagedSQL.php", {name : nameOfEvent, pseudo : $scope.cookieUser.pseudo})
                .then(
                    function succesCallBack(response){

                    }
                    , function errorCallBack(response){

                    });
            } else {
                $window.location.href = "login.html";
            }
        };
        this.isConnected();
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



	app.controller('cookieController', ['$scope','$cookies','$window', '$http', function($scope, $cookies, $window, $http) {
		$scope.cookieUser = {
			val : false,
			pseudo : "",
			isHere : ""
		};
		this.checkTheCookie = function() {
			$scope.cookieUser.isHere = $cookies.get("AYBABTU");
			if(angular.isDefined($scope.cookieUser.isHere)) {
			    $http.post("../PHP/checkPsswrdCookieSQL.php",$scope.cookieUser.isHere)
			    .then(
				function succesCallBack(response){
					$scope.reponse = response.data;
					if($scope.reponse != "false") {
						$scope.cookieUser.pseudo = $scope.reponse;
					} else {
					    $cookies.remove("AYBABTU");
					}
				}
				,function errorCallBack(response){
					console.log("Bad.");
				});
                $scope.cookieUser.val = true;
			} else {
				$scope.cookieUser.val = false;
			}
		};
		this.checkTheCookie();

		this.logout = function() {
			$cookies.remove("AYBABTU");
			this.checkTheCookie();
			$window.location.reload();
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
