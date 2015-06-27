'use strict';
//headings view model - fetches headings for products - what each row represents.

define(
    [
        'jquery',
        'knockout',
        'app.platinum.products',
        'app.platinum.headings',
        'mockHttp'
    ], function($, ko, Products, Headings, mockHttp){

    var Offer = function() {
        var self = this;
        this.sbvid = ko.observable();
        this.headings = new Headings();
        this.products = new Products();
        this.sbvid.subscribe(function(sbvid){
            $.ajax({
                method: 'GET',
                contentType: 'application/json',
                url: '/sbv/' + sbvid,
                success: function (sbv) {
                    self.products.sbv(sbv);
                }
            });
            mockHttp.sbv(sbvid);
         });
    };
    return Offer;
});
