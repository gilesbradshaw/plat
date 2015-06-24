'use strict';

//products cieww model fetches a list of produ7cts

define(['jquery', 'knockout', 'mockHttp'], function($, ko, mockHttp){
    var viewModel = function(type){
        this.type = type;
        this.products = ko.observableArray();
        this.product = ko.observableArray();
        this.getProducts();
    };
    viewModel.prototype.getProducts = function(){
        var self = this;
        $.ajax({
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(self.type),
            url: '/products/' + self.type,
            success: function (data) {
                self.products(data);
            }
        });
        mockHttp.products(self.type);
    };
    viewModel.prototype.getProduct = function(product){
        var self = this;
        $.ajax({
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(product),
            url: '/product',
            success: function (data) {
                self.product(data);
            }
        });
        mockHttp.product(product);
    };
    return viewModel;
});
