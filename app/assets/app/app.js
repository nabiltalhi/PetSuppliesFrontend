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
        $routeProvider.when('/shoppingCart/OrdercheckOut', {templateUrl: 'views/OrdercheckOut.html', controller: 'orderController'});
        $routeProvider.when('/shoppingCart/OrderConfirmation', {templateUrl: 'views/OrderConfirmation.html', controller: 'orderController'});
        
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
