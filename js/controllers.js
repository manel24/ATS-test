'use strict'
angular.module('ATS-products.controllers', ['ATS-products.services'])

    .controller('GetProductsCtrl', function ($scope, productsService) {
        $scope.products = [];
        var productsNodeRef = productsService.products;

        console.log("===testing===", 'inside products controller');
        //retrieve products from the firebase reference using the productsService
        var productsListPromise = new Promise(function (resolve, reject) {
            // query the products DB
            productsNodeRef.once('value').then(function (productsSnapshot) {
                $scope.products=productsSnapshot.val();
                if ($scope.products.length !== 0 ) {
                    resolve(products);
                }
                else {
                    var reason = new Error('couldn\'t load products ');
                    reject(reason);
                }
               /* productsSnapshot.forEach(function (child) {

                    var product = child.val();
                    // push product object to array
                    products.push(product);

                    if (products.length === productsSnapshot.length) {
                        resolve(products);
                    }
                    else {
                        var reason = new Error('couldn\'t load products ');
                        reject(reason);
                    }

                })*/

            })
        });
        //calling  promise
        console.log("calling products promise...");
        productsListPromise
            .then(function (productsList) {
                console.log((productsList));
        })
            .catch(function (error) {
                console.error(error.message);

            })
    });
