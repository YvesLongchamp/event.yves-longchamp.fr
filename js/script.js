(function() {
	var app = angular.module('myApp', ['ngCookies', 'ngRoute']);
	app.config(['$routeProvider',
	    function($routeProvider) { 
	        
	        // route System
	        $routeProvider
	        .when('/home', {
	        	templateUrl: 'templates-html/homepage.html',
	        	controller: 'getUsersController'
	        })
	 		.when('/events', {
	        	templateUrl : 'templates-html/events.html',
	        	controller : 'getEventsController'
	        })
	        .when('/events/:eventId', {
	            templateUrl: 'templates-html/event.html',
	            controller: 'eventController'
	        })
	        .when('/events/user/:userId', {
	        	templateUrl: 'templates-html/eventsByUser.html',
	        	controller: 'eventController'
	        })
	        .when('/profile/:userId', {
	        	templateUrl: 'templates-html/userpage.html',
	        	controller: 'userController'
	        })
	        .when('/login', {
	        	templateUrl: 'templates-html/login.html'
	        })
	        .when('/register', {
	        	templateUrl: 'templates-html/formToNewUser.html'
	        })
	        .when('/settlement', {
	        	templateUrl: 'templates-html/settlement.html'
	        })
	        .otherwise({
	        	redirectTo : '/home'
	        })
	    }
	]);

	app.controller('getUsersController', [ '$scope', '$http', function($scope, $http) {
		$http.get("../PHP/getUsersSQL.php")
		.then(function (response) {
			$scope.users_DB = response.data;
		});
	}]);




	app.controller('getEventsController', [ '$scope', '$http', '$window', '$cookies', function($scope, $http, $window, $cookies) {
		$http.get("../PHP/getEventsSQL.php")
		.then(function (responseEvents) {
			$scope.events_DB = responseEvents.data;
		});
	}]);


	app.controller('getEventsByUserController',['$scope', '$cookies', '$window','$routeParams','$http',
		function($scope, $cookies, $window, $routeParams, $http) {
 		$scope.userId = $routeParams.userId;
 		$scope.formCreateEvent = {
 			name: "",
 			availability: null,
 			beginning_date: null,
 			ending_date: null,
 			location: "",
 			description: "",
 			username: $scope.userId
 		};

		$http.post("../PHP/getEventsByUserSQL.php",{pseudo : $scope.userId})
			.then(function (response) {
			$scope.eventsByUser_DB = response.data;
		});

		this.isConnected = function() {
			$scope.cookieUser.cookieVal = $cookies.get("AYBABTU");
			$http.post("../PHP/checkPsswrdCookieJSONSQL.php",{pseudo : $scope.cookieUser.cookieVal})
            .then(
                function succesCallBack(response) {
                    $scope.response = response.data;
                    if($scope.response == 'false' || $scope.response == '') {
                    	$cookies.remove("AYBABYU");
                        $window.location.href = '#/home';
                    	
                    } else {
                    	if($scope.response == $scope.userId) {
							$scope.hasACookie = true;
                        	$scope.cookieUser.pseudo = $scope.response;
                        	$scope.isEnroled($scope.eventId);
                    	} else {
                    		$window.location.href = '#/home';
                    	}

                    }

                }
                ,function errorCallBack(response){
                    
                });
        };

        this.newEvent = function() {
        	$http.post("../PHP/postNewEventSQL.php", $scope.formCreateEvent)
        	.then(function (response) {
        		if(response.data == 'false') {
        			$window.alert("The event already exist.");
        		}
        	})
        };

        $scope.deleteEvent = function(indexDelete) {
        	$scope.showDelete = true;
        	$scope.deleteModel = $scope.eventsByUser_DB[indexDelete];
        };

        $scope.deleteForReal = function() {
        	$http.delete("../PHP/deleteEventSQL.php", {data : $scope.deleteModel})
        	.then(function (response) {
        		$window.location.reload();
        	})
        };

        $scope.update = function(indexUpdate) {
        	$scope.showUpdate = true;
        	$scope.updateModel = $scope.eventsByUser_DB[indexUpdate];
        };

        this.updateEvent = function() {
        	$http.put("../PHP/postUpdateEventSQL.php", $scope.updateModel)
        	.then(function (response) {
        		$window.location.reload();
        	})
        }
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
		$scope.reponsePost = "rien";
		
		this.checkLogin = function() {
			$scope.cookieCheck = $cookies.get("AYBABTU");
			if(angular.isDefined($scope.cookieCheck)) {
				$window.location.href = "#";
			}
		};

		this.postOnDatabase = function() {
		    $http.post("../PHP/postSQL.php",$scope.formType)
        	.then(
        		function succesCallBack(response) {
        			console.log("Inserted successfully :)");
   					$scope.formType = {};        			
        			$window.location.href = "#/index";
        		}
        		,function errorCallBack(response){
        			console.log("Something went bad :(");
        		});

		};
		
		this.login = function() {
			$http.post("../PHP/checkingSQL.php",$scope.logType)
			.then(
				function succesCallBack(response){
					$scope.reponsePost = response.data;
					if($scope.reponsePost === "true") {
						$window.location.reload();
					} else {
						$window.alert("Bad credentials");
						$scope.logType.password = "";
					}
				}
				,function errorCallBack(response){
					console.log("Bad.");
				});
		};	


		this.checkLogin();
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
					$scope.reponseCookie = response.data;
					if($scope.reponseCookie != "false") {
						$scope.cookieUser.pseudo = $scope.reponseCookie;
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



	app.controller('eventController', [ '$scope', '$cookies', '$window','$routeParams','$http',
		function($scope, $cookies, $window, $routeParams, $http) {
	    $scope.eventId = $routeParams.eventId;
   		$scope.cookieUser = {};
		$scope.isEngaged = false;
		$scope.hasACookie = false;

		$http.get("../PHP/getUsersForAnEventSQL.php?name=" + $scope.eventId)
		.then(function (response) {
			$scope.users_in_event_DB = response.data;
		});

	    $http.post("../PHP/checkEventSQL.php",{name: $scope.eventId})
			    .then(
				function successCallBack(response){
					$scope.reponseEvent = response.data;
				}, function errorCallBack(response) {
					console.log("Something went bad :(");
				});

	 	        $scope.isEnroled = function (nameOfEvent) {
            		if($scope.hasACookie) {
		                $http.post("../PHP/checkingEngageSQL.php",{name : nameOfEvent, pseudo : $scope.cookieUser.pseudo})
		            	.then(
		                function succesCallBack(response) {
		                    $scope.reponseForCookie = response.data;
		                    if($scope.reponseForCookie == "true") {
		                        $scope.isEngaged = true;
		                    } else {
		                        $scope.isEngaged = false;
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
                    $scope.reponse = response.data;
                    if($scope.reponse == 'false' || $scope.reponse == '') {
                    	$cookies.remove("AYBABYU");
                        $scope.hasACookie = false;
                    	
                    } else {
                    	$scope.hasACookie = true;
                        $scope.cookieUser.pseudo = $scope.reponse;
                        $scope.isEnroled($scope.eventId);
                    	}

                    }

                ,function errorCallBack(response){
                    
               });
		};


        this.enrol = function(nameOfEvent) {
            if($scope.hasACookie) {
                $http.post("../PHP/postEngagedSQL.php", {name : nameOfEvent, pseudo : $scope.cookieUser.pseudo})
                .then(
                    function successCallBack(response){
                    	$window.location.reload();
                    }
                    , function errorCallBack(response){

                    });
            } else {
                $window.location.href = "#/login";
            }
        };

        this.cancel = function() {
        	$http.post("../PHP/postAndDeleteEngageSQL.php", {name : $scope.eventId, pseudo : $scope.cookieUser.pseudo}) 	// We don't only delete, we also
        	.then(
        		function successCallBack(response){
        			$window.location.reload();
        		}
        		, function errorCallBack(response){
        			console.log("An error has occured");
        		}
        	)																												// Decrease the rank of the member
        }
        this.isConnected();
	 }]);
    

    app.controller('userController', ['$scope', '$cookies', '$window', '$routeParams', '$http', 
    	function($scope, $cookies, $window, $routeParams, $http) {
    	$scope.userId = $routeParams.userId;
    	$http.get("../PHP/getInformationUsersSQL.php?pseudo=" + $scope.userId)
    	.then(
    		function successCallBack(response) {
    			$scope.userInfo = response.data;
    		},
    		function errorCallBack(response) {
    			console.log("Something bad happened :(");
    		});
    }]);

	app.directive('rpgFormNewEvent', function() {
		return {
			templateUrl : 'templates-html/formCreateEvent.html'
		};
	});
	app.directive('rpgFormUpdateEvent', function() {
		return {
			templateUrl : 'templates-html/formUpdateEvent.html'
		};
	});
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
