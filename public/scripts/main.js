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
        pager: 'lib/pager',

        'custom-bindings.defaultPage': '/scripts/custom-bindings/defaultPage',

        'app.component.ViewModel': '/scripts/components/ViewModel',
        'app.platinum.Offer': '/scripts/platinum/Offer',
        'app.platinum.sbv': '/scripts/platinum/sbv',
        'app.platinum.headings': '/scripts/platinum/headings',

        'ajax': '/scripts/ajax/ajax',
        'ajax.sbv': '/scripts/ajax/sbv',
        'ajax.enquiry': '/scripts/ajax/enquiry',
        'ajax.sales-exec': '/scripts/ajax/sales-exec',
        'ajax.dealer': '/scripts/ajax/dealer',
        'ajax.category': '/scripts/ajax/category',
        'ajax.product': '/scripts/ajax/product',
        'ajax.parameter': '/scripts/ajax/parameter',
        'ajax.item': '/scripts/ajax/item',
        'ajax.auth': '/scripts/ajax/auth'
    }
});



define(
    [
        'knockout',
        'pager',
        'knockout.punches',
        'custom-bindings.defaultPage'
    ], function(ko, pager){

    //register knockout components
    ko.components.register('auth', {
        viewModel: { require: 'components/auth/viewModel' },
        template: { require: 'text!components/auth/markup.html' }
    });
    ko.components.register('sbv', {
        viewModel: { require: 'components/sbv/viewModel' },
        template: { require: 'text!components/sbv/markup.html' }
    });
    ko.components.register('enquiry', {
        viewModel: { require: 'components/enquiry/viewModel' },
        template: { require: 'text!components/enquiry/enquiry.html' }
    });
    ko.components.register('sales-exec', {
        viewModel: { require: 'components/sales-exec/viewModel' },
        template: { require: 'text!components/sales-exec/sales-exec.html' }
    });
    ko.components.register('dealer', {
        viewModel: { require: 'components/dealer/viewModel' },
        template: { require: 'text!components/dealer/markup.html' }
    });
    ko.components.register('category', {
        viewModel: { require: 'components/category/viewModel' },
        template: { require: 'text!components/category/markup.html' }
    });
    ko.components.register('product', {
        viewModel: { require: 'components/product/viewModel' },
        template: { require: 'text!components/product/product.html' }
    });
    ko.components.register('parameter', {
        viewModel: { require: 'components/parameter/viewModel' },
        template: { require: 'text!components/parameter/parameter.html' }
    });
    ko.components.register('item', {
        viewModel: { require: 'components/item/viewModel' },
        template: { require: 'text!components/item/item.html' }
    });
    ko.components.register('offer', {
        viewModel: { require: 'components/offer/viewModel' },
        template: { require: 'text!components/offer/markup.html' }
    });

    ko.punches.enableAll();

    var offer = {};

    pager.extendWithPage(offer);
    ko.applyBindings(offer);
    pager.start();
});


