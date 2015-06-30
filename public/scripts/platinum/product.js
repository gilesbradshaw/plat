'use strict';

//products cieww model fetches a list of produ7cts

define(['ajax', 'knockout'], function(ajax, ko){
    var Product = function(){
        var self = this;
        this.product = ko.observable();
        this.items = ko.observableArray();
        this.product.subscribe(function(product){
            ajax.product.post(product).then(function(data){
                self.items(data);
            });
        });
    };
    return Product;
});
