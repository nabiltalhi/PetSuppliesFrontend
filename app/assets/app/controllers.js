'use-strict';

angular.module('myApp.controllers', []).
        controller('ProductsController', function ($scope, Products, Categories) {
            $scope.allProducts = Products.findAll();
            $scope.allCategories = Categories.findAll();
            $scope.filteredProducts = Products.findAll();
            
            $scope.filterProducts = function(category){
                
		$scope.filteredProducts = $scope.allProducts.filter(function(fp){
                    if (category === ''){
                        return $scope.allProducts;
                    } else {
                        return (fp.category.id == category);
                    }
		});
            };
            
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
            };
        }).
        controller('orderController', function ($scope, $cookieStore, Order, $location) {
            $scope.CartItems = $cookieStore.get("shoppingCart");
            $scope.CountCartItems = function () {
                shoppingCart = $cookieStore.get("shoppingCart");
                
                return(shoppingCart != null ? shoppingCart.length : 0);
            };
            
            $scope.isFormFilled = function(){
                console.log("orderController - isFormFilled");
                
                var isFilled = true;
                isFilled = (isFilled & ($scope.firstName != null ? ($scope.firstName.length > 0) : false));
                isFilled = (isFilled & ($scope.lastName != null ? ($scope.lastName.length > 0) : false));
                isFilled = (isFilled & ($scope.address  != null ? ($scope.address.length > 0) : false));
                isFilled = (isFilled & ($scope.postalCode != null ? ($scope.postalCode.length > 0) : false));
                isFilled = (isFilled & ($scope.city != null ? ($scope.city.length > 0) : false));
                isFilled = (isFilled & ($scope.emailAddress != null ? ($scope.emailAddress.length > 0) : false));
                
                return (isFilled == 1 ? true : false);
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
                
                $scope.isOrdered(true);
                $location.path("/producten");
                $scope.DeleteCookies();
            };
            
            $scope.isOrdered = function(order){
                if(order == null){
                    return Order.isOrdered;
                } else {
                    Order.isOrdered = order;
                }
            };
                       
            $scope.GetOrder = function(){
                console.log("orderController - GetOrder");
                
                return $cookieStore.get("order");
            };
            
            $scope.OrderUser = function(){
                console.log("orderController - OrderUser");
                $scope.OrderUser = $cookieStore.get("order").user;
            };
            
            $scope.OrderItems = function(){
                console.log("orderController - OrderItems");
                $scope.OrderItems = $cookieStore.get("order").shoppingCart;
            };
            
            $scope.DeleteCookies = function(){
                console.log("orderController - DeleteCookies");
                
                $cookieStore.remove("shoppingCart");
                $cookieStore.remove("order");
                
            };
            
            
        }).
        controller('LoginController', function ($scope, Message, Accounts, $location, $timeout, M) {
            $scope.password = "";
            $scope.message = Message.message; 
            $scope.showMessage = Message.showMessage;
            M.successFn($scope);
            
            $scope.RegisterAccount = function(){
                console.log("LoginController - RegisterAccount");
                $scope.showMessage = false;
                $scope.message = "";
                
                if($scope.password != $scope.passwordRepeat){
                    $scope.message = "Het wachtwoord is niet hetzelfde, voer uw wachtwoorden opnieuw in.";
                    $scope.password = "";
                    $scope.passwordRepeat = "";
                    $scope.showMessage = true;
                } else if($scope.password.length == 0){
                    $scope.message = "Er is geen wachtwoord ingevoerd.";
                    $scope.password = "";
                    $scope.passwordRepeat = "";
                    $scope.showMessage = true;
                } else {
                    $scope.showMessage = false;
                    user = {'firstname' : $scope.firstName
                            , 'lastname' : $scope.lastName
                            , 'address' : $scope.address
                            , 'postalcode' : $scope.postalCode
                            , 'city' : $scope.city
                            , 'emailaddress' : $scope.emailAddress
                            , 'password' : $scope.password
                    };
                    
                    Accounts.save(user, function(){
                        Message.message = "Het account is succesvol aangemaakt, u kunt nu hieronder inloggen.";
                        Message.showMessage = true;
                        
                        $timeout(function () {
                            Message.showMessage = false;
                        }, 4000);
                        $location.path("/login");
                        
                        
                    }, function(){
                        $scope.message = "Het e-mailadres is al in gebruik, kies een ander e-mailadres.";
                        $scope.showMessage = true;
                    });
                }
            };
                        
            
        })
        .controller('AlertController', function($scope){
            $scope.message = {
              "type": "info",
              "title":"Hey!",
              "content": " Welcome back. This alert is for 5 seconds"
            };

            $scope.successFn = function() {
              $scope.message = {
                "type": "success",
                "title": "Success!",
                "content": "This is success message"
              };
              console.log('changing message to ' + $scope.message.type);
            };

            $scope.warningFn = function() {
              $scope.message = {
                "type": "warning",
                "title": "Warning!",
                "content": "This is warning message"
              };
              console.log('changing message to ' + $scope.message.type);
            };

            $scope.errorFn = function() {
              $scope.message = {
                "type": "error",
                "title": "Error!",
                "content": "This is error message"
              };
              console.log('changing message to ' + $scope.message.type);
            };
        });