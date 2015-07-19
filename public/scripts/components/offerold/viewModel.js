'use strict';

define(
    [
        'ajax',
        'knockout',
        'app.platinum.headings'
    ],
    function(ajax, ko, Headings){
        ko.components.register('platinum-compare-and-select', {
            viewModel: { require: 'components/compare-and-select/viewModel' },
            template: { require: 'text!components/compare-and-select/markup.html' }
        });
        ko.components.register('platinum-product', {
            viewModel: { require: 'components/product/viewModel' },
            template: { require: 'text!components/product/markup.html' }
        });
        ko.components.register('platinum-category', {
            viewModel: { require: 'components/category/viewModel' },
            template: { require: 'text!components/category/markup.html' }
        });
        return function(params){
            this.params = params;
            var self = this;
            this.sbv = ko.observable();
            this.headings = new Headings();
            ajax.sbv.get(params)
                .then(function(sbv){
                    self.sbv(sbv);
                });
     };
});
