'use strict';

define([
    'knockout',
    'ajax'
], function(ko, ajax){
   var SalesExec = function(params) {
        this.params = params;
        this.item = ko.observable();
        this.items = ko.observableArray();
    };
    SalesExec.prototype.new = function(){
        this.item({title: ko.observable()});
    };
    SalesExec.prototype.refresh = function(){
        var self = this;
        ajax.salesExec.list()
            .then(function(items){
                self.items(items);
            });
        return this;
    };
    SalesExec.prototype.post = function(item){
        var self = this;
        return function(){
            ajax.salesExec.post({title: item().title()})
                .then(function(posted){
                    self.item(posted);
                    self.refresh();
                });
        };
    };
    SalesExec.prototype.get = function(id){
        var self = this;
        return function(){
            ajax.salesExec.get(id)
                .then(function(got){
                    self.item(got);
                });
        };
    };
    SalesExec.prototype.put = function(item){
        var self = this;
        return function(){
            ajax.salesExec.put(item())
                .then(function(put){
                    self.item(put);
                    self.refresh();
                });
        };
    };
    SalesExec.prototype['delete'] = function(id){ /* eslint dot-notation: 0*/
        var self = this;
        return function(){
            ajax.salesExec['delete'](id) /* eslint dot-notation: 0*/
                .then(function(){
                    self.refresh();
                });
        };
    };
    return SalesExec;
});
