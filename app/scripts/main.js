'use strict';

//require js configuration
requirejs.config({
    baseUrl: 'scripts',
    paths: {
        jquery: '/bower_components/jquery/dist/jquery.min',
        knockout: '/bower_components/knockout/dist/knockout.debug',
        'knockout.punches': '/bower_components/knockout.punches/knockout.punches.min',
        mockHttp: '/test/spec/mockHttp/platinum',
        pager: '/node_modules/pagerjs/pager',

        'app.platinum.headings': '/scripts/platinum/headings'

    }
});



define(
    [
        'jquery',
        'knockout',
        'pager',
        'platinum/Offer',
        'mockHttp',
        'knockout.punches'
    ], function($, ko, pager, Offer, mockHttp){

    //register knockout components
    ko.components.register('platinum-product', {
        viewModel: { require: 'components/product/viewModel' },
        template: { require: 'text!components/product/markup.html' }
    });
    ko.punches.enableAll();

    //fake server for mocked ajax
    var server = sinon.fakeServer.create();
    server.xhr.useFilters = true;
    server.xhr.addFilter(function(method, url) {
        return url.match(/scripts/) !== null;
    });
    mockHttp.server = server;

    var offer = new Offer();

    pager.extendWithPage(offer);
    ko.applyBindings(offer);
    pager.start();

});


