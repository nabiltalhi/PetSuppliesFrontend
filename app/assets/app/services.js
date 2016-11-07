'use strict';

var empService = angular.module('myApp.services', ['ngResource']);

empService.factory('Products', function($resource){
    return $resource('http://localhost:8080/PetSuppliesBackend/rest/product', {}, {
        findAll:{method:'GET', isArray:true}
    });
});