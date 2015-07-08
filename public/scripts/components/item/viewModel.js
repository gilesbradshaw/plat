'use strict';


define([
    'knockout',
    'ajax',
    'app.component.ViewModel'
], function(ko, ajax, ViewModel){
   var Item = function(params) {
        ViewModel.call(this, params);
        this.ajax = ajax.item;
    };
    Item.prototype = new ViewModel();

    Item.prototype.new = function(){
        this.item({product: this.params ? this.params.product : undefined, title: ko.observable()});
    };
    var refresh = Item.prototype.refresh;
    Item.prototype.refresh = function(){
        return refresh.call(
            this,
            this.params && this.params.product
                ? function(){
                    return this.ajax.listByProduct(this.params.product);
                }.bind(this)
                : undefined
        );
    };
    return Item;
});
