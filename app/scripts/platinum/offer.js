'use strict';
//headings view model - fetches headings for products - what each row represents.

define(
    [
        'jquery',
        'knockout',
        'platinum/product',
        'app.platinum.headings'
    ], function($, ko, PlatinumProduct, PlatinumHeadings){

    var Offer = function() {
        this.sbvid = ko.observable();
        this.headings = new PlatinumHeadings();
        this.platinumProducts = ko.observableArray();
        this.sbvid.subscribe(function(){
            this.platinumProducts(
                [
                    new PlatinumProduct('PCP'),
                    new PlatinumProduct('PCH'),
                    new PlatinumProduct('HP')
                ]
            );
         }.bind(this));
    };
    return Offer;
});
