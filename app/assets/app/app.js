var app = angular.module('myApp', [
    'ngRoute',
    'ngCookies',
    'ngAnimate',
    //'$strap.directives',
    //'ngFilter',
    'myApp.services',
    'myApp.controllers'
]).
    config(function ($routeProvider) {
        $routeProvider.when('/producten', {templateUrl: 'views/ProductListItem.html', controller: 'ProductsController'});
                
        $routeProvider.when('/shoppingCart', {templateUrl: 'views/ShoppingCartListItem.html', controller: 'ShoppingCartController'});
        //$routeProvider.when('/shoppingCart/OrdercheckOut', {templateUrl: 'views/OrdercheckOut.html', controller: 'orderController'});
        //$routeProvider.when('/shoppingCart/OrderConfirmation', {templateUrl: 'views/OrderConfirmation.html', controller: 'orderController'});
        
        $routeProvider.when('/registerAccount', {templateUrl: 'views/registerAccount.html', controller: 'LoginController'});
        $routeProvider.when('/login', {templateUrl: 'views/login.html', controller: 'LoginController'});
        
        
        $routeProvider.otherwise({redirectTo: '/producten'});
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
