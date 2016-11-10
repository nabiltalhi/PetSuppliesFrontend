'use-strict';

angular.module('myApp.controllers', []).
        controller('ProductsController', function ($scope, Products, $cookieStore) {
            $scope.allProducts = Products.findAll();

            
            
            
            
            
        }).
        controller('ShoppingCartController', function ($scope, $cookieStore) {
            $scope.CartItems = $cookieStore.get("shoppingCart");
            $scope.CountCartItems = function () {
                shoppingCart = $cookieStore.get("shoppingCart");
                
                return(shoppingCart != null ? shoppingCart.length : 0);
            };
            
            $scope.TotalPrice = function(){
                console.log("ShoppingCartController - TotalPrice");
                shoppingCart = $cookieStore.get("shoppingCart");
                total = 0;

                angular.forEach(shoppingCart, function(row){
                    total = (total + (row.product.price * row.quantity));
                });
                
                return total;
            };
            
            
            $scope.addToCart = function (product) {
                console.log("ShoppingCartController - addToCart");
                
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
                
                $scope.CartItems = tempCart;

            };
            
            $scope.removeFromCart = function (product) {
                console.log("ShoppingCartController - removeFromCart");
                
                //Get carts in shoppingCart
                shoppingCart = $cookieStore.get("shoppingCart");
                tempCart = new Array();
                    
                angular.forEach(shoppingCart, function(row){
                    if(row.product.id == product.id){
                        row.quantity = row.quantity - 1;
                        if(row.quantity > 0){
                            tempCart.push(row);
                        }
                    } else {
                        tempCart.push(row);
                    }
                    
                });
                    
                shoppingCart = $cookieStore.put("shoppingCart", tempCart);
                
                $scope.CartItems = tempCart;

            };
            
            $scope.deleteProductFromCart = function (product) {
                console.log("ShoppingCartController - deleteProductFromCart");
                
                //Get carts in shoppingCart
                shoppingCart = $cookieStore.get("shoppingCart");
                tempCart = new Array();
                    
                angular.forEach(shoppingCart, function(row){
                    if(row.product.id != product.id){
                        tempCart.push(row);
                    }
                });
                    
                shoppingCart = $cookieStore.put("shoppingCart", tempCart);
                
                $scope.CartItems = tempCart;
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
        }).
        controller('orderController', function ($scope, $cookieStore) {
            $scope.CartItems = $cookieStore.get("shoppingCart");
            $scope.CountCartItems = function () {
                shoppingCart = $cookieStore.get("shoppingCart");
                
                return(shoppingCart != null ? shoppingCart.length : 0);
            };
            
            
            $scope.SaveOrder = function(){
                console.log("orderController - SaveOrder");
                
                shoppingCart = $cookieStore.get("shoppingCart");
                
                user = {'firstName' : $scope.firstName
                        , 'lastName' : $scope.lastName
                        , 'address' : $scope.address
                        , 'postalCode' : $scope.postalCode
                        , 'city' : $scope.city
                        , 'emailAddress' : $scope.emailAddress
                };
                
                $cookieStore.put("order", {'user' :user, 'shoppingCart' :shoppingCart});
                
                console.log($cookieStore.get("order"));
            };
            
            $scope.GetOrder = function(){
                console.log("orderController - GetOrder");
                
                return $cookieStore.get("order");
            };
            
            $scope.OrderUser = function(){
                console.log("orderController - OrderUser");
                $scope.OrderUser = $cookieStore.get("order").user;
            }
            
            $scope.OrderItems = function(){
                console.log("orderController - OrderItems");
                $scope.OrderItems = $cookieStore.get("order").shoppingCart;
            }
        });