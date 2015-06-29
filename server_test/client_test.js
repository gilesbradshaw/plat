'use strict';

var requirejs = require('requirejs');
var sinon = require('sinon');
require('mocha-sinon');
var chai = require('chai');

var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

describe('Require js', function(){
  it('requires requirejs', function(){
    assert(requirejs);
  });
  it('requires sinon', function(){
    assert(sinon);
  });
});

global.window = {};


(function () {
    'use strict';
    requirejs.config({
        baseUrl: 'public/scripts',
        paths: {
           
            knockout: '../bower_components/knockout/dist/knockout.debug',
            mockHttp: '../test/spec/mockHttp/platinum',
            squirejs: 'lib/squire',
            tryme: 'lib/try',
            q: '../bower_components/q/q',

            //app
            'app.platinum.headings': 'platinum/headings',
            'app.platinum.product': 'platinum/product',
            'app.platinum.products': 'platinum/products',
            'ajax': 'ajax/ajax'
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
            requirejs(['tryme'], function(tryme){
                requirejs(['q', 'squirejs'], function(Q, Squire){
                    injector = new Squire();
                    ajaxPromise = Q.defer();
                    ajax = sinon.stub().returns(ajaxPromise.promise);
                    done();
                });
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
                injector.mock('app.platinum.headings', sinon.spy());
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
                    return;
                    var product = {name: 'prod'};
                    var model = new Model(43);
                    model.getProduct(product)();
                    assert(server.requests[server.requests.length - 1].requestBody === JSON.stringify(product));
                    assert(model.product()[0].name === 'V1_prod');
                    assert(model.product()[1].name === 'V2_prod');
                    assert(model.product().length === 2);
                });
            });
        });

        describe('headings view model Testing', function() {
            // Load modules with requirejs before tests
            var Model;
            beforeEach(function(done) {
                injector.mock('ajax', {headings: {post: ajax}});
                injector.require(['app.platinum.headings'], function(_Model) {
                    Model = _Model;
                    done(); // We can launch the tests!
                });
            });

            describe('#ajax calls', function(){
                it('should get headings', function(done){
                    var model = new Model();
                    var result = [1, 2];
                    ajaxPromise.resolve(result);
                    ajaxPromise.promise.then(function(){
                        assert(model.headings() === result);
                        done();
                    });
                });
            });
        });
    });
})();
