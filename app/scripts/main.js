'use strict';

requirejs.config({
    baseUrl: 'scripts',
    paths: {
        jquery: '/bower_components/jquery/dist/jquery.min',
        knockout: '/bower_components/knockout/dist/knockout',
        'knockout.punches': '/bower_components/knockout.punches/knockout.punches.min',
         mockHttp: '/test/spec/mockHttp/platinum'

    }
});



define(['jquery', 'knockout', 'platinum/model', 'mockHttp', 'knockout.punches'], function($, ko, platinumModel, mockHttp){

    ko.components.register('platinum', {
        viewModel: { require: 'components/viewModel' },
        template: { require: 'text!components/platinum.html' }
    });
    ko.punches.enableAll();
    ko.applyBindings(platinumModel);
    var server = sinon.fakeServer.create();
    server.xhr.useFilters = true;

    server.xhr.addFilter(function(method, url) {
        //return false;
        return url.match(/scripts/) !== null;
    });
    platinumModel.get(42);
    mockHttp(server);

});


