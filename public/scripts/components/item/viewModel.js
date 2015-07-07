'use strict';


define([
    'knockout',
    'ajax'
], function(ko, ajax){
   var Item = function(params) {
        this.params = params;
        this.item = ko.observable();
        this.items = ko.observableArray();
    };
    Item.prototype.new = function(){
        this.item({product: this.params ? this.params.product : undefined, title: ko.observable()});
    };
    Item.prototype.refresh = function(){
        var self = this;
        if(this.params && this.params.product)
        {
            ajax.item.listByProduct(this.params.product)
                .then(function(items){
                    self.items(items);
                });
        }
        else
        {
            ajax.item.list()
                .then(function(items){
                    self.items(items);
                });
        }
        return this;
    };
    Item.prototype.post = function(item){
        var self = this;
        return function(){
            ajax.item.post({product: item().product, title: item().title()})
                .then(function(posted){
                    self.item(posted);
                    self.refresh();
                });
        };
    };
    Item.prototype.get = function(id){
        var self = this;
        return function(){
            ajax.item.get(id)
                .then(function(got){
                    self.item(got);
                });
        };
    };
    Item.prototype.put = function(item){
        var self = this;
        return function(){
            ajax.item.put(item())
                .then(function(put){
                    self.item(put);
                    self.refresh();
                });
        };
    };
    Item.prototype['delete'] = function(id){ /* eslint dot-notation: 0*/
        var self = this;
        return function(){
            ajax.item['delete'](id) /* eslint dot-notation: 0*/
                .then(function(){
                    self.refresh();
                });
        };
    };
    return Item;
});
