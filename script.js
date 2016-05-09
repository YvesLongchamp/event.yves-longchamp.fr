(function() {
	var app = angular.module('myApp', []);

	app.controller('getController', function($scope, $http) {
		$http.get("getUsersSQL.php")
    	.then(function (response) {$scope.users_DB = response.data;});

	});

	app.controller('putController', function($scope, $http) {
		$scope.formType = {
			pseudo: "",
			password: "",
			passwordConfirm: "",
			email: ""
		};

		$scope.compareTo = function() {
    		return {
      			require: "ngModel",
     			scopu: {
        			otherModelValue: "=compareTo"
      			},
      			link: function(scope, element, attributes, ngModel) {

        			ngModel.$validators.compareTo = function(modelValue) {
          				return modelValue == scopu.otherModelValue;
        			};

        			scopu.$watch("otherModelValue", function() {
          				ngModel.$validate();
        			});
      			}
    		};
  		};

		$scope.postOnDatabase = function() {
			$http.post("postSQL.php",{pseudo : $scope.formType.pseudo,email : $scope.formType.email})
        	.success(function(data, status, headers, config){
            	console.log("inserted Successfully");
            });
		};


		

	});
})();
