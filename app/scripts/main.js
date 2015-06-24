'use strict';

requirejs.config({
    baseUrl: 'scripts',
    paths: {
        jquery: '/bower_components/jquery/dist/jquery.min',
        knockout: '/bower_components/knockout/dist/knockout.debug',
        'knockout.punches': '/bower_components/knockout.punches/knockout.punches.min',
         mockHttp: '/test/spec/mockHttp/platinum'

    }
});



define(
    [
        'jquery',
        'knockout',
        'platinum/product',
        'platinum/headings',
        'mockHttp',
        'knockout.punches'
    ], function($, ko, PlatinumProduct, PlatinumHeadings, mockHttp){

    ko.components.register('platinum-product', {
        viewModel: { require: 'components/product/viewModel' },
        template: { require: 'text!components/product/markup.html' }
    });
    ko.punches.enableAll();
    var server = sinon.fakeServer.create();
    server.xhr.useFilters = true;

    server.xhr.addFilter(function(method, url) {
        //return false;
        return url.match(/scripts/) !== null;
    });
    mockHttp.server = server;
    var viewModel = {
         headings: new PlatinumHeadings(),
         platinumProducts: [
            new PlatinumProduct('PCP'),
            new PlatinumProduct('PCH'),
            new PlatinumProduct('HP')
        ]
    };
    ko.applyBindings(viewModel);

});


