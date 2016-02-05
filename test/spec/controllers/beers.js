'use strict';

describe('Controller: BeersCtrl', function () {

  // load the controller's module
  beforeEach(module('amazingDemoApp'));

  var BeersCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BeersCtrl = $controller('BeersCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(BeersCtrl.awesomeThings.length).toBe(3);
  });
});
