'use strict';

define([
    'knockout',
    'ajax',
    'app.component.ViewModel'
], function(ko, ajax, ViewModel){
    ko.components.register('products', {
        viewModel: { require: 'components/product/viewModel' },
        template: { require: 'text!components/product/products.html' }
    });
   var Category = function(params) {
        ViewModel.call(this, params);
        this.ajax = ajax.category;
    };
    Category.prototype = new ViewModel();

    Category.prototype.new = function(){
        this.item({title: ko.observable()});
    };
    return Category;
});
