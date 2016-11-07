angular.module('myApp', [
    'ngRoute',
    'ngCookies',
    'myApp.services',
    'myApp.controllers'
]).
    config(function ($routeProvider) {
        $routeProvider.when('/home', {templateUrl: 'views/ProductListItem.html', controller: 'ProductsController'});
        
        $routeProvider.otherwise({redirectTo: '/home'});
    });