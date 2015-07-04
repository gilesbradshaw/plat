'use strict';

//require js configuration
requirejs.config({
    baseUrl: 'scripts',
    paths: {
        jquery: '/bower_components/jquery/jquery.min',
        Q: '/bower_components/q/q',
        superagent: 'lib/superagent.min',
        knockout: '/bower_components/knockout/dist/knockout.debug',
        'knockout.punches': '/bower_components/knockout.punches/knockout.punches.min',
        pager: '/bower_components/pagerjs/pager',

        'app.platinum.Offer': '/scripts/platinum/Offer',
        'app.platinum.sbv': '/scripts/platinum/sbv',
        'app.platinum.headings': '/scripts/platinum/headings',
        'app.platinum.products': '/scripts/platinum/products',
        'app.platinum.product-category': '/scripts/platinum/product-category',
        'ajax': '/scripts/ajax/ajax'
    }
});



define(
    [
        'knockout',
        'pager',
        'app.platinum.Offer',
        'knockout.punches'
    ], function(ko, pager, Offer){

    //register knockout components
    ko.components.register('platinum-product', {
        viewModel: { require: 'components/product/viewModel' },
        template: { require: 'text!components/product/markup.html' }
    });
    ko.components.register('platinum-category', {
        viewModel: { require: 'components/category/viewModel' },
        template: { require: 'text!components/category/markup.html' }
    });
    ko.punches.enableAll();

    var offer = new Offer();

    pager.extendWithPage(offer);
    ko.applyBindings(offer);
    pager.start();

});


