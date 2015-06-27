(function () {
    'use strict';
    requirejs.config({
        baseUrl: '/app/scripts',
        paths: {
            //libraries
            jquery: '/bower_components/jquery/dist/jquery.min',
            knockout: '/bower_components/knockout/dist/knockout.debug',
            mockHttp: '/test/spec/mockHttp/platinum',
            Squire: '/node_modules/squirejs/src/squire',

            //app
            'app.platinum.headings': '/app/scripts/platinum/headings' 
        }
    });

    describe('platinum component viewmodel testing', function() {
        // Load modules with requirejs before tests
        var viewModel, params, getProductSpy;
        beforeEach(function(done) {
            requirejs(['components/product/viewModel'], function(ViewModel) {
                getProductSpy = sinon.spy();
                params = {
                    getProduct: sinon.stub().returns(getProductSpy)
                };
                viewModel = new ViewModel(params);
                done(); // We can launch the tests!
            });
        });

        describe('#view model functions', function(){
            it('should call params.getProduct when product set', function(){
                var product = {name: 'prod'};
                viewModel.product(product);
                assert(params.getProduct.calledOnce);
                assert(params.getProduct.args[0][0] === product);
                assert(getProductSpy.calledOnce);
            });
        });
    });

    describe('offer view model Testing', function() {
        // Load modules with requirejs before tests
        var Model, server, mockHttp;
        var headings;
        beforeEach(function(done) {
            server = sinon.fakeServer.create();
            requirejs(['Squire'], function(Squire){
                var injector = new Squire();
                headings = sinon.spy();
                injector.mock('app.platinum.headings', headings);
                injector.require(['platinum/offer', 'mockHttp'], function(_Model, _mockHttp) {
                    Model = _Model;
                    mockHttp = _mockHttp;
                    done(); // We can launch the tests!
                });
            });
        });

        describe('#ajax calls', function(){
            it('should create headings', function(){
                new Model();
                assert(headings.calledOnce);
            });
        });
    });



    describe('product view model Testing', function() {
        // Load modules with requirejs before tests
        var Model, server, mockHttp;
        beforeEach(function(done) {
            server = sinon.fakeServer.create();
            requirejs(['platinum/product', 'mockHttp'], function(_Model, _mockHttp) {
                Model = _Model;
                mockHttp = _mockHttp;
                done(); // We can launch the tests!
            });
        });

        describe('#ajax calls', function(){
            it('should get products', function(){
                var model = new Model(42);
                mockHttp.products(42, server);
                assert(server.requests[server.requests.length - 1].requestBody === '42');
                assert(model.products()[0].name === 'P1_42');
                assert(model.products()[1].name === 'P2_42');
                assert(model.products().length === 2);
            });
            it('should get product', function(){
                var product = {name: 'prod'};
                var model = new Model(43);
                model.getProduct(product)();
                mockHttp.product(product, server);
                assert(server.requests[server.requests.length - 1].requestBody === JSON.stringify(product));
                assert(model.product()[0].name === 'V1_prod');
                assert(model.product()[1].name === 'V2_prod');
                assert(model.product().length === 2);
            });
        });
    });

    describe('headings view model Testing', function() {
        // Load modules with requirejs before tests
        var model, server, mockHttp;
        beforeEach(function(done) {
            server = sinon.fakeServer.create();
            requirejs(['app.platinum.headings', 'mockHttp'], function(Model, _mockHttp) {
                model = new Model();
                mockHttp = _mockHttp;
                done(); // We can launch the tests!
            });
        });

        describe('#ajax calls', function(){
            it('should get headings', function(){
                mockHttp.headings(server);
                assert(model.headings()[0].name === 'Heading1');
                assert(model.headings()[1].name === 'Heading2');
            });
        });
    });

})();
