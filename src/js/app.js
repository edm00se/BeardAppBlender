(function(){
	
	//defines the AngularJS app as a module
	angular.module('myApp',
		[
		'ui.router',
		'ngMessages'
		])

	//ui-router config
	.config(
		['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
			
			$urlRouterProvider.otherwise('/about');
			
			$stateProvider
				.state('about', {
					url: '/about',
					templateUrl: 'partials/about.html'
				});
	}]);

})();