'use strict';


define([
    'knockout',
    'ajax'
], function(ko, ajax){
   var Sbv = function(params) {
        this.params = params;
        this.item = ko.observable();
        this.items = ko.observableArray();
    };
    Sbv.prototype.new = function(){
        this.item({title: ko.observable()});
    };
    Sbv.prototype.refresh = function(){
        var self = this;
        ajax.sbv.list()
            .then(function(sbvs){
                self.items(sbvs);
            });
        return this;
    };
    Sbv.prototype.post = function(sbv){
        var self = this;
        return function(){
            ajax.sbv.post({title: sbv().title()})
            .then(function(sbvPosted){
                self.item(sbvPosted);
                self.refresh();
            });
        };
    };
    Sbv.prototype.get = function(sbv){
        var self = this;
        return function(){
            ajax.sbv.get(sbv)
            .then(function(sbvGot){
                self.item(sbvGot);
            });
        };
    };
    Sbv.prototype.put = function(sbv){
        var self = this;
        return function(){
            ajax.sbv.put(sbv())
                .then(function(sbvPut){
                    self.item(sbvPut);
                    self.refresh();
                });
        };
    };
    Sbv.prototype['delete'] = function(sbv){ /* eslint dot-notation: 0*/
        var self = this;
        return function(){
            ajax.sbv['delete'](sbv) /* eslint dot-notation: 0*/
                .then(function(){
                    self.refresh();
                });
        };
    };
    return Sbv;
});
