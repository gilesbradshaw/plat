'use strict';
//headings view model - fetches headings for products - what each row represents.

define(
    [
        'jquery',
        'knockout',
        'app.platinum.product',
        'app.platinum.headings',
        'mockHttp'
    ], function($, ko, Product, Headings, mockHttp){

    var Offer = function() {
        var self = this;
        this.sbvid = ko.observable();
        this.headings = new Headings();
        this.products = ko.observableArray();
        this.sbvid.subscribe(function(sbvid){
            $.ajax({
                method: 'GET',
                contentType: 'application/json',
                url: '/sbv/' + sbvid,
                success: function () {
                    self.products(
                        [
                            new Product('PCP'),
                            new Product('PCH'),
                            new Product('HP')
                        ]
                    );
                }
            });
            mockHttp.sbv(sbvid);
         });
    };
    return Offer;
});
