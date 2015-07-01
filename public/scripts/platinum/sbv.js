'use strict';

define(
    [
        'ajax',
        'knockout'
    ], function(ajax, ko){

    var Sbv = function() {
        this.item = ko.observable();
        this.items = ko.observableArray();
    };
    Sbv.prototype.new = function(){
        this.item({title: ko.observable()});
    };
    Sbv.prototype.refresh = function(){
        var self = this;
        ajax.sbv.post({title: "Hell is other people's robots"});
        ajax.sbv.list()
            .then(function(sbvs){
                self.items(sbvs);
            });
    };
    Sbv.prototype.post = function(sbv){
        var self = this;
        ajax.sbv.post(sbv)
            .then(function(sbvPosted){
                self.item(sbvPosted);
            });
    };
    Sbv.prototype.get = function(sbv){
        var self = this;
        ajax.sbv.get(sbv)
            .then(function(sbvGot){
                self.item(sbvGot);
            });
    };
    Sbv.prototype.put = function(sbv){
        var self = this;
        ajax.sbv.put(sbv)
            .then(function(sbvPut){
                self.item(sbvPut);
            });
    };
    Sbv.prototype['delete'] = function(sbv){ /* eslint dot-notation: 0*/
        var self = this;
        ajax.sbv['delete'](sbv) /* eslint dot-notation: 0*/
            .then(function(){
                self.refresh();
            });
    };
    return Sbv;
});
