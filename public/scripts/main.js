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
        'ajax': '/scripts/ajax/ajax',
        'ajax.sbv': '/scripts/ajax/sbv/ajax',
        'ajax.enquiry': '/scripts/ajax/enquiry/ajax',
        'ajax.sales-exec': '/scripts/ajax/sales-exec/ajax',
        'ajax.dealer': '/scripts/ajax/dealer/ajax'
    }
});



define(
    [
        'knockout',
        'pager',
        'knockout.punches'
    ], function(ko, pager){

    //register knockout components
    ko.components.register('sbv', {
        viewModel: { require: 'components/sbv/viewModel' },
        template: { require: 'text!components/sbv/markup.html' }
    });
    ko.components.register('enquiry', {
        viewModel: { require: 'components/enquiry/viewModel' },
        template: { require: 'text!components/enquiry/markup.html' }
    });
    ko.components.register('sales-exec', {
        viewModel: { require: 'components/sales-exec/viewModel' },
        template: { require: 'text!components/sales-exec/markup.html' }
    });
    ko.components.register('dealer', {
        viewModel: { require: 'components/dealer/viewModel' },
        template: { require: 'text!components/dealer/markup.html' }
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


