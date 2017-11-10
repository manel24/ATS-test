(function () {
    'use strict';
    //TODO split the services from the controller code (to the productsService code)
    //TODO add a $http service consuming the ATS webservice and filling the frebase DB with the incoming data
    //TODO add the pagination functionality

    angular.module('ATS-products.controllers', ['ATS-products.services'])

        .controller('getProductsCtrl', getProductsCtrl);
    getProductsCtrl.$inject = ['$scope', '$firebaseArray', 'productsService'];
    function getProductsCtrl($scope, $firebaseArray, productsService) {

        var vm = this;
        vm.loading = true;
        vm.categories = [];
        $scope.productKeys = [];
        vm.pages = 0;
        $scope.sortKey = ""; //(not working)
        //TODO fix this function
        //order products in a random way using one of the keys
        vm.randomize = function () {
            console.log("randomizing in action...");
            $scope.sortKey = $scope.productKeys [Math.floor(Math.random() * $scope.productKeys.length)];
            console.log($scope.sortKey);
        };
        var ref = firebase.database().ref().child('products');
        // download the data into a local object

        $firebaseArray(ref).$loaded().then(function (data) {
            vm.products = data;
            vm.pages = data.length / 20;
            vm.loading = false;
            //save products keys (used by randomize() )
            $scope.productKeys.push(Object.keys(data[0]));
            console.log($scope.productKeys);
            //retreive distinct categories to be used as filetring options
            data.forEach(function (product) {
                //save products categories used to filter rendered data
                if ((vm.categories.indexOf(product.category) < 0)) {
                    vm.categories.push(product.category);
                }
            });
            console.log(vm.categories);
        });

    }
})();