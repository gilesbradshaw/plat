'use strict';

//product component view model gets new product when selected product changes

define(
    [
        'ajax',
        'knockout'
    ], function(ajax, ko){
    var Offer = function(params){
        this.params = params;
        this.products = ko.observableArray();
        this.categories = ko.observableArray(['PCP', 'PCH', 'HP']);
        this.refresh();
    };
    Offer.prototype.refresh = function(){
        var self = this;
        ajax.products.post(this.params).then(function(data){
            self.products(data);
        });
    };
    return Offer;
});
