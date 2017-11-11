(function () {
        'use strict';
        //TODO split the services from the controller code (to the productsService code)
        //TODO add the pagination functionality

        angular.module('ATS-products.controllers', ['ATS-products.services'])

            .controller('getProductsCtrl', getProductsCtrl);
        getProductsCtrl.$inject = ['$http', '$firebaseArray', 'productsService'];
        function getProductsCtrl($http, $firebaseArray, productsService) {

            var vm = this;
            vm.loading = true;
            vm.products = [];
            vm.categories = [];
            vm.productKeys = [];
            vm.pages = 0;
            vm.sortKey = ""; //(not working)

            //order products in a random way using one of the keys
            vm.randomize = function () {
                console.log("randomizing in action...");
                vm.productKeys = ['basePrice', 'brand', 'category', 'delivery', 'details', 'imageUrl', 'productMaterial', 'productName', 'reviews'];
                var ind = Math.floor(Math.random() * vm.productKeys.length);
                vm.sortKey = vm.productKeys [ind];
                console.log("sorting using the attribute:", vm.sortKey);
            };

            var ref = firebase.database().ref().child('products');
            // this will be the synchronized products array (allowing 3 way data binding) any change in this array is vizualised in UI in realtime
            vm.products = $firebaseArray(ref);
            //check the content of the Firebase array
            vm.products.$loaded().then(function (data) {
                    //if DB is empty
                    if (data.length === 0) {
                        console.log("DB is empty..");
                        $http.get("http://internal.ats-digital.com:3066/api/products")
                            .then(function (products) {
                                    console.log("adding products..");
                                    console.log(products.data);
                                    vm.products.$add(products.data);
                                    console.log("added products..", vm.products);
                                },
                                function (error) {
                                    console.error("Error adding data...")

                                });
                    }
                    //else : DB is filled with products data
                    vm.loading = false;
                    data.forEach(function (product) {
                        //retreive distinct categories to be used as filetring options
                        product.forEach(function (p) {
                            if ((vm.categories.indexOf(p.category) < 0)) {
                                vm.categories.push(p.category);
                            }
                        })
                    });
                    console.log(vm.categories);
                }
                , function (error) {
                    console.log("error loading products...")
                });
        }
    })();