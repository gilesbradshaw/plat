'use strict';


define([
    'knockout',
    'ajax',
    'app.component.ViewModel'
], function(ko, ajax, ViewModel){
    ko.components.register('items', {
        viewModel: { require: 'components/item/viewModel' },
        template: { require: 'text!components/item/items.html' }
    });
     ko.components.register('parameters', {
        viewModel: { require: 'components/parameter/viewModel' },
        template: { require: 'text!components/parameter/parameters.html' }
    });

    var Product = function(params) {
        ViewModel.call(this, params);
        this.ajax = ajax.product;
    };
    Product.prototype = new ViewModel();

    Product.prototype.new = function(){
        this.item({category: this.params ? this.params.category : undefined, title: ko.observable()});
    };
    var refresh = Product.prototype.refresh;
    Product.prototype.refresh = function(){
        return refresh.call(
            this,
            this.params && this.params.category
                ? function(){
                    return this.ajax.listByCategory(this.params.category);
                }.bind(this)
                : undefined
        );
    };
    return Product;
});
