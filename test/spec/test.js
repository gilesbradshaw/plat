(function () {
    'use strict';
    requirejs.config({
        baseUrl: '/public/scripts',
        paths: {
            //libraries
            jquery: '/bower_components/jquery/jquery.min',
            knockout: '/bower_components/knockout/dist/knockout.debug',
            mockHttp: '/test/spec/mockHttp/platinum',
            Squire: '/node_modules/squirejs/src/squire',
            Q: '/bower_components/q/q',

            //app
            'app.platinum.headings': '/public/scripts/platinum/headings',
            'app.platinum.product': '/public/scripts/platinum/product',
            'app.platinum.products': '/public/scripts/platinum/products',
            'ajax': '/public/scripts/ajax/ajax'
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
                assert(params.getProduct.calledOnce, 'getProduct called');
                assert(params.getProduct.args[0][0] === product, 'getproduct called with product');
                assert(getProductSpy.calledOnce);
            });
        });
    });

    describe('mocked ajax testing', function() {
        var ajax;
        var ajaxPromise;
        var injector;
        beforeEach(function(done) {
            requirejs(['Q', 'Squire'], function(Q, Squire){
                injector = new Squire();
                ajaxPromise = Q.defer();
                ajax = sinon.stub().returns(ajaxPromise.promise);
                done();
            });
        });
        afterEach(function() {
            injector.clean();
        });
        describe('Offer view model Testing', function() {
            // Load modules with requirejs before tests
            var Model;
            var headings, products, sbv;
            beforeEach(function(done) {
                headings = sinon.spy();
                sbv = sinon.spy();
                products = sinon.stub().returns({sbv: sbv, yes: 111});
                injector.mock('app.platinum.headings', headings);
                injector.mock('app.platinum.products', products);
                injector.mock('ajax', {sbv: {get: ajax}});
                injector.require(['platinum/offer'], function(_Model) {
                    Model = _Model;
                    done(); // We can launch the tests!
                });
            });

            describe('#ajax calls', function(done){
                it('should create headings', function(){
                    new Model(); /*eslint no-new:0 */
                    assert(headings.calledOnce);
                });
                it('should get sbv when sbvid set and then create products', function(){
                    var model = new Model();
                    assert(products.callCount === 1, 'products created with new model');
                    model.sbvid(1);
                    assert(sbv.callCount === 0, 'sbv not called created with sbv set');
                    assert(ajax.callCount === 1, 'get sb ajax called');
                    ajaxPromise.resolve('sbvtest');
                    ajaxPromise.promise.then(function(){
                        assert(sbv.callCount === 1, 'sbv called');
                        assert(sbv.args[0][0] === 'sbvtest', 'sbv called with data from ajax call');
                        done();
                    });
                });
            });
        });


        describe('products view model Testing', function() {
            // Load modules with requirejs before tests
            var Model;
            var product;
            beforeEach(function(done) {
                product = sinon.spy();
                injector.mock('app.platinum.product', product);
                injector.require(['platinum/products'], function(_Model) {
                    Model = _Model;
                    done(); // We can launch the tests!
                });
            });

            describe('#ajax calls', function(){
                it('should get sbv when sbvid set and then create products', function(){
                    var model = new Model();
                    assert(product.callCount === 0, 'no products created with new model');
                    model.sbv(1);
                    assert(model.options().length === 3, 'three products created');
                    assert(product.callCount === 3, 'three new products');
                });
            });
        });



        describe('product view model Testing', function() {
            // Load modules with requirejs before tests
            var Model, server;
            describe('#get products', function(){
                beforeEach(function(done) {
                    injector.mock('ajax', {products: {post: ajax}});
                    injector.require(['platinum/product'], function(_Model) {
                        Model = _Model;
                        done(); // We can launch the tests!
                    });
                });

                it('should get products', function(done){
                    var model = new Model(42);
                    assert(ajax.callCount === 1, 'get products ajax called');
                    assert(ajax.args[0][0] === 42);
                    assert(!model.products().length, 'no products before ajax returns data');
                    ajaxPromise.resolve([1, 2, 3]);
                    ajaxPromise.promise.then(function(){
                        assert(model.products()[0] === 1);
                        assert(model.products().length === 3);
                        done();
                    });
                });
                it('should get product', function(){
                    return;
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
            describe('#get product', function(){
                beforeEach(function(done) {
                    injector.mock('ajax', {product: {post: ajax}});
                    injector.require(['platinum/product'], function(_Model) {
                        Model = _Model;
                        done(); // We can launch the tests!
                    });
                });
 
                it('should get product', function(){
                    var product = {name: 'prod'};
                    var model = new Model(43);
                    model.getProduct(product)();
                    return;
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
    });
})();
