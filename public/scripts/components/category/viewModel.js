'use strict';

define([
    'knockout',
    'ajax'
], function(ko, ajax){
    ko.components.register('products', {
        viewModel: { require: 'components/product/viewModel' },
        template: { require: 'text!components/product/products.html' }
    });
   var Category = function(params) {
        this.params = params;
        this.id = ko.observable();
        this.item = ko.observable();
        this.items = ko.observableArray();
    };
    Category.prototype.new = function(){
        this.item({title: ko.observable()});
    };
    Category.prototype.refresh = function(){
        var self = this;
        ajax.category.list()
            .then(function(items){
                self.items(items);
            });
        return this;
    };
    Category.prototype.post = function(item){
        var self = this;
        return function(){
            ajax.category.post({title: item().title()})
                .then(function(posted){
                    self.item(posted);
                    self.refresh();
                });
        };
    };
    Category.prototype.get = function(id){
        var self = this;
        return function(){
            ajax.category.get(id)
                .then(function(got){
                    self.item(got);
                });
        };
    };
    Category.prototype.put = function(item){
        var self = this;
        return function(){
            ajax.category.put(item())
                .then(function(put){
                    self.item(put);
                    self.refresh();
                });
        };
    };
    Category.prototype['delete'] = function(id){ /* eslint dot-notation: 0*/
        var self = this;
        return function(){
            ajax.category['delete'](id) /* eslint dot-notation: 0*/
                .then(function(){
                    self.refresh();
                });
        };
    };
    return Category;
});
