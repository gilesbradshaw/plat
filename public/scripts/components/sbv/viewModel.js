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
        this.item({
            title: ko.observable(),
            offer: this.params ? this.params.offer : undefined
        });
    };
    var refresh = Sbv.prototype.refresh;
    Sbv.prototype.refresh = function(){
        return refresh.call(
            this,
            this.params && this.params.offer
                ? function(){
                    return this.ajax.listByOffer(this.params.offer);
                }.bind(this)
                : undefined
        );
    };

    return Sbv;
});
