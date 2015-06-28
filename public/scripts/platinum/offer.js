'use strict';
//headings view model - fetches headings for products - what each row represents.

define(
    [
        'ajax',
        'knockout',
        'app.platinum.products',
        'app.platinum.headings'
    ], function(ajax, ko, Products, Headings){

    var Offer = function() {
        var self = this;
        this.sbvid = ko.observable();
        this.headings = new Headings();
        this.products = new Products();
        this.sbvid.subscribe(function(sbvid){
            ajax.sbv.get(sbvid)
                .then(function(sbv){
                    self.products.sbv(sbv);
                });
         });
    };
    return Offer;
});
