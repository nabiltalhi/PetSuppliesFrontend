'use-strict';

angular.module('myApp.controllers', []).
        controller('ProductsController', function ($scope, Products, $cookieStore) {
            $scope.allProducts = Products.findAll();

            $scope.addToCart = function (p) {
                console.log("ProductsController - addToCart");
                
                //Get carts in shoppingCart
                shoppingCart = $cookieStore.get("shoppingCart");
                
                //Add the item to the shoppingcart
                if(shoppingCart == null){
                    $cookieStore.put("shoppingCart", [p]);
                } else {
                    shoppingCart.push(p);
                    $cookieStore.put("shoppingCart", shoppingCart);
                }
                
                console.log($cookieStore.get("shoppingCart"));
                
            };
        }).
        controller('ShoppingCartController', function ($scope, $cookieStore) {
            $scope.CountCartItems = function () {
                
                return shoppingCart = $cookieStore.get("shoppingCart").count;
                
                
            };
        });