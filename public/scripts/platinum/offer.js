'use strict';

define(
    [
        'ajax',
        'knockout',
        'app.platinum.products',
        'app.platinum.headings',
        'app.platinum.sbv'
    ], function(ajax, ko, Products, Headings, Sbv){

    var Offer = function() {
        var self = this;
        this.sbv = new Sbv();
        this.sbv.refresh();
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
