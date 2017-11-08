angular.module('ATS-products.services', [])

    .factory('productsService',
        function () {
            console.log("getting DB reference");
            var root = firebase.database().ref();
            var service = {
                root: root,
                products: root.child('products')
            };
            return service;
        }

 );

