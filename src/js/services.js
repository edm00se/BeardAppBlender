(function(){
	
	//defines the AngularJS app as a module
	angular.module('myApp')

	/*
	 *	Factories
	 */
	
	//defines the $HTTP factory, one of the 3 service types
	.factory('someCollectionFactory', [ '$http', function($http) {
		return $http( {
			method : 'GET',
			url : 'xsp/some'
		});
	} ]);

})();