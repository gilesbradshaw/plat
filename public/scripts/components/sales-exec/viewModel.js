'use strict';

define([
    'knockout',
    'ajax',
    'app.component.ViewModel'
], function(ko, ajax, ViewModel){
   var SalesExec = function(params) {
        ViewModel.call(this, params);
        this.ajax = ajax.salesExec;
    };
    SalesExec.prototype = new ViewModel();

    SalesExec.prototype.new = function(){
        this.item({dealer: this.params ? this.params.dealer : undefined, title: ko.observable()});
    };
    var refresh = SalesExec.prototype.refresh;
    SalesExec.prototype.refresh = function(){
        return refresh.call(
            this,
            this.params && this.params.dealer
                ? function(){
                    return this.ajax.listByDealer(this.params.dealer);
                }.bind(this)
                : undefined
        );
    };
    return SalesExec;
});
