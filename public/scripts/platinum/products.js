'use strict';
//headings view model - fetches headings for products - what each row represents.

define(
    [
        'ajax',
        'knockout',
        'app.platinum.product-category'
    ], function(ajax, ko, ProductCategory){

    var Products = function() {
        this.products = ko.observableArray();
        this.categories = ko.observableArray([
            new ProductCategory('PCP', this.products),
            new ProductCategory('PCH', this.products),
            new ProductCategory('HP', this.products)
        ]);
        this.sbv = ko.observable();
        this.sbv.subscribe(this.refresh.bind(this));
    };
    Products.prototype.refresh = function(){
        var self = this;
        ajax.products.post(this.sbv()).then(function(data){
            self.products(data);
        });
    };
    return Products;
});
