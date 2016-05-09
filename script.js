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
			email: ""
		};
		this.postOnDatabase = function() {
			console.log($scope.formType);
		    $http.post("postSQL.php",{pseudo : $scope.formType.pseudo, email : $scope.formType.email, password : $scope.formType.password})
        	.then(
        		function succesCallBack(response) {
        			console.log("Inserted successfully.");
        		}
        		,function errorCallBack(response){
        			console.log("Something went bad :(");
        		});
   		$scope.formType = {};
		};	

	}]);
})();
