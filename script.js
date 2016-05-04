(function() {
	var app = angular.module('myApp', []);
app.controller('myController', function() {
	this.user = users;
	});
	var users = {
		name: 'Rambo',
		size: 1.7,
		angry: true,
	}

})();