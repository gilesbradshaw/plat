'use strict';
//headings view model - fetches headings for products - what each row represents.

define(
    [
        'knockout',
        'app.platinum.product-category'
    ], function(ko, ProductCategory){

    var Products = function() {
        this.categories = ko.observableArray();
    };
    Products.prototype.sbv = function(){
        this.categories(
            [
                new ProductCategory('PCP'),
                new ProductCategory('PCH'),
                new ProductCategory('HP')
            ]
        );
    };
    return Products;
});
