angular.module('myApp', [
    'ngRoute',
    'ngCookies',
    //'ngFilter',
    'myApp.services',
    'myApp.controllers'
]).
    config(function ($routeProvider) {
        $routeProvider.when('/home', {templateUrl: 'views/ProductListItem.html', controller: 'ProductsController'});
        $routeProvider.when('/shoppingCart', {templateUrl: 'views/ShoppingCartListItem.html', controller: 'ShoppingCartController'});
        
        $routeProvider.otherwise({redirectTo: '/home'});
    });
/*
    .filter('groupBy', function($parse) {
        return _.memoize(function(items, field) {
            var getter = $parse(field);
            return _.groupBy(items, function(item) {
                return getter(item);
            });
        });
    });*/
