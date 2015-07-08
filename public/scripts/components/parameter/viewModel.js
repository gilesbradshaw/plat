'use strict';


define([
    'knockout',
    'ajax',
    'app.component.ViewModel'
], function(ko, ajax, ViewModel){
   var Parameter = function(params) {
        ViewModel.call(this, params);
        this.ajax = ajax.parameter;
    };
    Parameter.prototype = new ViewModel();

    Parameter.prototype.new = function(){
        this.item({product: this.params ? this.params.product : undefined, title: ko.observable()});
    };
    var refresh = Parameter.prototype.refresh;
    Parameter.prototype.refresh = function(){
        return refresh.call(
            this,
            this.params && this.params.product
                ? function(){
                    return this.ajax.listByProduct(this.params.product);
                }.bind(this)
                : undefined
        );
    };
    return Parameter;
});
