'use strict';


define([
    'knockout',
    'ajax',
    'app.component.ViewModel'
], function(ko, ajax, ViewModel){

    ko.components.register('sbvs', {
        viewModel: { require: 'components/sbv/viewModel' },
        template: { require: 'text!components/sbv/sbvs.html' }
    });


    var Offer = function(params) {
        ViewModel.call(this, params);
        this.ajax = ajax.offer;
    };
    Offer.prototype = new ViewModel();

    Offer.prototype.new = function(){
        this.item({
            enquiry: this.params ? this.params.enquiry : undefined,
            title: ko.observable()
        });
    };
    var refresh = Offer.prototype.refresh;
    Offer.prototype.refresh = function(){
        return refresh.call(
            this,
            this.params && this.params.enquiry
                ? function(){
                    return this.ajax.listByEnquiry(this.params.enquiry);
                }.bind(this)
                : undefined
        );
    };
    return Offer;
});
