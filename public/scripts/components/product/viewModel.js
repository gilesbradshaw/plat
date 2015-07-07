'use strict';


define([
    'knockout',
    'ajax'
], function(ko, ajax){
    ko.components.register('items', {
        viewModel: { require: 'components/item/viewModel' },
        template: { require: 'text!components/item/items.html' }
    });
     ko.components.register('parameters', {
        viewModel: { require: 'components/parameter/viewModel' },
        template: { require: 'text!components/parameter/parameters.html' }
    });

    var Product = function(params) {
        this.params = params;
        this.item = ko.observable();
        this.items = ko.observableArray();
    };
    Product.prototype.new = function(){
        this.item({category: this.params ? this.params.category : undefined, title: ko.observable()});
    };
    Product.prototype.refresh = function(){
        var self = this;
        if(this.params && this.params.category)
        {
            ajax.product.listByCategory(this.params.category)
                .then(function(items){
                    self.items(items);
                });
        }
        else
        {
            ajax.product.list()
                .then(function(items){
                    self.items(items);
                });
        }
        return this;
    };
    Product.prototype.post = function(item){
        var self = this;
        return function(){
            ajax.product.post({category: item().category, title: item().title()})
                .then(function(posted){
                    self.item(posted);
                    self.refresh();
                });
        };
    };
    Product.prototype.get = function(id){
        var self = this;
        return function(){
            ajax.product.get(id)
                .then(function(got){
                    self.item(got);
                });
        };
    };
    Product.prototype.put = function(item){
        var self = this;
        return function(){
            ajax.product.put(item())
                .then(function(put){
                    self.item(put);
                    self.refresh();
                });
        };
    };
    Product.prototype['delete'] = function(id){ /* eslint dot-notation: 0*/
        var self = this;
        return function(){
            ajax.product['delete'](id) /* eslint dot-notation: 0*/
                .then(function(){
                    self.refresh();
                });
        };
    };
    return Product;
});
