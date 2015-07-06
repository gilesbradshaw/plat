'use strict';


define([
    'knockout',
    'ajax'
], function(ko, ajax){
   var Enquiry = function(params) {
        this.params = params;
        this.item = ko.observable();
        this.items = ko.observableArray();
    };
    Enquiry.prototype.new = function(){
        this.item({title: ko.observable()});
    };
    Enquiry.prototype.refresh = function(){
        var self = this;
        ajax.enquiry.list()
            .then(function(items){
                self.items(items);
            });
        return this;
    };
    Enquiry.prototype.post = function(item){
        var self = this;
        return function(){
            ajax.enquiry.post({title: item().title()})
                .then(function(posted){
                    self.item(posted);
                    self.refresh();
                });
        };
    };
    Enquiry.prototype.get = function(id){
        var self = this;
        return function(){
            ajax.enquiry.get(id)
                .then(function(got){
                    self.item(got);
                });
        };
    };
    Enquiry.prototype.put = function(item){
        var self = this;
        return function(){
            ajax.enquiry.put(item())
                .then(function(put){
                    self.item(put);
                    self.refresh();
                });
        };
    };
    Enquiry.prototype['delete'] = function(id){ /* eslint dot-notation: 0*/
        var self = this;
        return function(){
            ajax.enquiry['delete'](id) /* eslint dot-notation: 0*/
                .then(function(){
                    self.refresh();
                });
        };
    };
    return Enquiry;
});
