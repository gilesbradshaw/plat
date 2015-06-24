(function () {
    'use strict';
    requirejs.config({
        baseUrl: '/app/scripts',
        paths: {
            jquery: '/bower_components/jquery/dist/jquery.min',
            knockout: '/bower_components/knockout/dist/knockout',
            mockHttp: '/test/spec/mockHttp/platinum'
        }
    });

    describe('platinum model Testing', function() {
        // Load modules with requirejs before tests
        var model;
        before(function(done) {
            requirejs(['platinum/model'], function(_model) {
                model = _model;
                done(); // We can launch the tests!
            });
        });

        describe('#instanciation', function(){
            it('should work without problems', function(){
                model.ok().should.equal('ok!!!');
            });
        });
    });

    describe('ajax Testing', function() {
        // Load modules with requirejs before tests
        var model, server, mockHttp;
        before(function(done) {
            server = sinon.fakeServer.create();
            requirejs(['platinum/model', 'mockHttp'], function(_model, _mockHttp) {
                model = _model;
                mockHttp = _mockHttp;
                done(); // We can launch the tests!
            });
        });

        describe('#ajax call', function(){
            it('should do what it does', function(){
                model.get(42);
                mockHttp(server);
                //server.respondWith('FooBarBaz!');
                server.respond();
                assert(server.requests[0].requestBody === 'Data');
                assert(model.result()[0].name === 'hey1');
            });
        });
    });


})();
