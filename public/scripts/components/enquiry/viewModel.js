'use strict';


define([
    'knockout',
    'ajax',
    'app.component.ViewModel'
], function(ko, ajax, ViewModel){
   var Enquiry = function(params) {
        ViewModel.call(this, params);
        this.ajax = ajax.enquiry;
    };
    Enquiry.prototype = new ViewModel();

    Enquiry.prototype.new = function(){
        this.item({dealer: this.params ? this.params.dealer : undefined, title: ko.observable()});
    };
    var refresh = Enquiry.prototype.refresh;
    Enquiry.prototype.refresh = function(){
        return refresh.call(
            this,
            this.params && this.params.dealer
                ? function(){
                    return this.ajax.listByDealer(this.params.dealer);
                }.bind(this)
                : undefined
        );
    };
    return Enquiry;
});
