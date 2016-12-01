'use strict';

var empService = angular.module('myApp.services', ['ngResource']);

empService.factory('Products', function($resource){
    return $resource('http://localhost:8080/PetSuppliesBackend/rest/product/', {}, {
        findAll:{method:'get', isArray:true},
        findByCategory:{method:'get', isArray:true}
    });
});
empService.factory('Categories', function($resource){
    return $resource('http://localhost:8080/PetSuppliesBackend/rest/category/', {}, {
        findAll:{method:'get', isArray:true}
    });
});
empService.factory('Accounts', function($resource, $http){
    return $resource('http://localhost:8080/PetSuppliesBackend/rest/account/', {
    });
});

empService.service('Order', function() {
    this.isOrdered = false;
});
empService.service('Message', function() {
    this.showMessage = false;
    return this.message = "";
});

empService.service('M', function(){
    this.successFn = function($scope) {
              $scope.message = {
                "type": "success",
                "title": "Success!",
                "content": "This is success message"
              };
              console.log('changing message to ' + $scope.message.type);
            };
});