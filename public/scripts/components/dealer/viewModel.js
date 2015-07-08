'use strict';

define([
    'knockout',
    'ajax',
    'app.component.ViewModel'
], function(ko, ajax, ViewModel){
        ko.components.register('sales-execs', {
        viewModel: { require: 'components/sales-exec/viewModel' },
        template: { require: 'text!components/sales-exec/sales-execs.html' }
    });
    ko.components.register('enquiries', {
        viewModel: { require: 'components/enquiry/viewModel' },
        template: { require: 'text!components/enquiry/enquiries.html' }
    });
    var Dealer = function(params) {
        ViewModel.call(this, params);
        this.ajax = ajax.dealer;
    };
    Dealer.prototype = new ViewModel();

    Dealer.prototype.new = function(){
        this.item({title: ko.observable()});
    };
    return Dealer;
});
