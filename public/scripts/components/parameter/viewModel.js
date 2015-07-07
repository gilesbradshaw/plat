'use strict';


define([
    'knockout',
    'ajax'
], function(ko, ajax){
   var Parameter = function(params) {
        this.params = params;
        this.item = ko.observable();
        this.items = ko.observableArray();
    };
    Parameter.prototype.new = function(){
        this.item({product: this.params ? this.params.product : undefined, title: ko.observable()});
    };
    Parameter.prototype.refresh = function(){
        var self = this;
        if(this.params && this.params.product)
        {
            ajax.parameter.listByProduct(this.params.product)
                .then(function(items){
                    self.items(items);
                });
        }
        else
        {
            ajax.parameter.list()
                .then(function(items){
                    self.items(items);
                });
        }
        return this;
    };
    Parameter.prototype.post = function(item){
        var self = this;
        return function(){
            ajax.parameter.post({product: item().product, title: item().title()})
                .then(function(posted){
                    self.item(posted);
                    self.refresh();
                });
        };
    };
    Parameter.prototype.get = function(id){
        var self = this;
        return function(){
            ajax.parameter.get(id)
                .then(function(got){
                    self.item(got);
                });
        };
    };
    Parameter.prototype.put = function(item){
        var self = this;
        return function(){
            ajax.parameter.put(item())
                .then(function(put){
                    self.item(put);
                    self.refresh();
                });
        };
    };
    Parameter.prototype['delete'] = function(id){ /* eslint dot-notation: 0*/
        var self = this;
        return function(){
            ajax.parameter['delete'](id) /* eslint dot-notation: 0*/
                .then(function(){
                    self.refresh();
                });
        };
    };
    return Parameter;
});
