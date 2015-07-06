'use strict';

define([
    'knockout',
    'ajax'
], function(ko, ajax){
   var Dealer = function(params) {
        this.params = params;
        this.item = ko.observable();
        this.items = ko.observableArray();
    };
    Dealer.prototype.new = function(){
        this.item({title: ko.observable()});
    };
    Dealer.prototype.refresh = function(){
        var self = this;
        ajax.dealer.list()
            .then(function(items){
                self.items(items);
            });
        return this;
    };
    Dealer.prototype.post = function(item){
        var self = this;
        return function(){
            ajax.dealer.post({title: item().title()})
                .then(function(posted){
                    self.item(posted);
                    self.refresh();
                });
        };
    };
    Dealer.prototype.get = function(id){
        var self = this;
        return function(){
            ajax.dealer.get(id)
                .then(function(got){
                    self.item(got);
                });
        };
    };
    Dealer.prototype.put = function(item){
        var self = this;
        return function(){
            ajax.dealer.put(item())
                .then(function(put){
                    self.item(put);
                    self.refresh();
                });
        };
    };
    Dealer.prototype['delete'] = function(id){ /* eslint dot-notation: 0*/
        var self = this;
        return function(){
            ajax.dealer['delete'](id) /* eslint dot-notation: 0*/
                .then(function(){
                    self.refresh();
                });
        };
    };
    return Dealer;
});
