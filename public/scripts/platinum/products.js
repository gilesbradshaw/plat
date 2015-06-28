'use strict';
//headings view model - fetches headings for products - what each row represents.

define(
    [
        'knockout',
        'app.platinum.product'
    ], function(ko, Product){

    var Products = function() {
        this.options = ko.observableArray();
    };
    Products.prototype.sbv = function(){
        this.options(
            [
                new Product('PCP'),
                new Product('PCH'),
                new Product('HP')
            ]
        );
    };
    return Products;
});
