(function () {
    'use strict';

    angular.module('ATS-products.services', [])
        .service('productsService', productsService);
    productsService.$inject = ['$firebaseArray'];

    function productsService($firebaseArray) {

    }
})();

