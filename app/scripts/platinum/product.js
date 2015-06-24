'use strict';

define(['jquery', 'knockout', 'mockHttp'], function($, ko, mockHttp){
    var viewModel = function(name){
        this.name = name;
        this.products = ko.observableArray();
        this.product = ko.observableArray();
        this.getProducts(name);
    };
    viewModel.prototype.getProducts = function(spec){
        var self = this;
        $.ajax({
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(spec),
            url: '/products/' + spec,
            success: function (data) {
                self.products(data);
            }
        });
        mockHttp.products(spec);
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
