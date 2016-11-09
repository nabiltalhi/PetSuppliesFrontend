'use-strict';

angular.module('myApp.controllers', []).
        controller('ProductsController', function ($scope, Products, $cookieStore) {
            $scope.allProducts = Products.findAll();

            $scope.addToCart = function (product) {
                console.log("ProductsController - addToCart");
                
                //Get carts in shoppingCart
                shoppingCart = $cookieStore.get("shoppingCart");
                
                //Add the item to the shoppingcart
                if(shoppingCart == null){
                    shoppingCart = $cookieStore.put("shoppingCart", [{product, 'quantity':1}]);
                } else {
                    
                    var productFound = false;
                    var tempCart = new Array();
                    angular.forEach(shoppingCart, function(row){
                        if(row.product.id == product.id){
                            row.quantity = row.quantity +1;
                            
                            productFound = true;
                            
                        }
                        
                        tempCart.push(row);
                    });
                    
                    if(!productFound){
                        tempCart.push({product, 'quantity':1})
                       shoppingCart = $cookieStore.put("shoppingCart", tempCart);
                    } else {
                        shoppingCart = $cookieStore.put("shoppingCart", tempCart);
                    }
                    
                }
                                
            };
        }).
        controller('ShoppingCartController', function ($scope, $cookieStore) {
            $scope.CartItems = $cookieStore.get("shoppingCart");
            $scope.CountCartItems = function () {
                
                $scope.value = 1;//$cookieStore.get("shoppingCart").length;
                
                
            };
            
            $scope.getTotal = function(){
                var total = 0;
                var shoppingCart = $cookieStore.get("shoppingCart");
                angular.forEach(shoppingCart, function(row){
                        if(row.product.id == product.id){
                            row.quantity = row.quantity +1;
                            productFound = true;
                        }
                        
                        tempCart.push(row);
                    });
                return total;
            }
        });