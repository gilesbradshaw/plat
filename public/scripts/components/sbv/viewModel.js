'use strict';


define([
    'knockout',
    'ajax',
    'app.component.ViewModel'
], function(ko, ajax, ViewModel){
   var Sbv = function(params) {
        ViewModel.call(this, params);
        this.ajax = ajax.sbv;
    };
    Sbv.prototype = new ViewModel();

    Sbv.prototype.new = function(){
        this.item({title: ko.observable()});
    };
    
    return Sbv;
});
