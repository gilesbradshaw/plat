'use strict';

var requirejs = require('requirejs');
var sinon = require('sinon');

require('mocha-sinon');
var chai = require('chai');

global.assert = chai.assert;
global.expect = chai.expect;
global.should = chai.should();

describe('Require js', function(){
  it('requires requirejs', function(){
    assert(requirejs);
  });
  it('requires sinon', function(){
    assert(sinon);
  });
});

global.window = {};
global.requirejs = requirejs;
global.define = require('requirejs');



(function () {
    requirejs.config({
        baseUrl: 'public/scripts',
        paths: {
            knockout: '../bower_components/knockout/dist/knockout.debug',
            squirejs: 'lib/Squire',
            q: '../bower_components/q/q',

            //app
            'app.platinum.sbv': 'platinum/sbv',
            'app.platinum.headings': 'platinum/headings',
            'app.platinum.product-category': 'platinum/product-category',
            'app.platinum.products': 'platinum/products',
            'app.platinum.product': 'platinum/product',
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
            requirejs(['q', 'squirejs'], function(Q, Squire){
                injector = new Squire();
                ajaxPromise = Q.defer();
                ajax = sinon.stub().returns(ajaxPromise.promise);
                done();
            });
        });
        afterEach(function() {
            injector.clean();
        });

        describe('Sbv view model list Testing', function() {
            var Model, ajaxInjected = {};
            beforeEach(function(done) {
                injector.mock('ajax', ajaxInjected);
                injector.require(['platinum/sbv'], function(_Model) {
                    Model = _Model;
                    done();
                });
            });

            describe('list', function(){
                beforeEach(function(){
                    ajaxInjected.sbv = {list: ajax};
                });
                it('should get sbvs', function(done){
                    var model = new Model();
                    assert(!ajax.calledOnce, 'no ajax call on create');
                    model.refresh();
                    assert(ajax.calledOnce, 'ajax call on refresh');
                    ajaxPromise.resolve('sbvs');
                    ajaxPromise.promise.then(function(){
                        assert(model.items() === 'sbvs', 'sbvs set');
                        done();
                    });
                });
            });
            describe('new', function(){
                it('should make a new sbv', function(){
                    var model = new Model();
                    model.new('sbv');
                    assert(model.item().title() === undefined, 'new sbv created');
                });
            });
            describe('get', function(){
                beforeEach(function(){
                    ajaxInjected.sbv = {get: ajax};
                });
                it('should get sbv', function(done){
                    var model = new Model();
                    assert(!ajax.calledOnce, 'no ajax call on create');
                    model.get('sbv');
                    assert(ajax.calledOnce, 'ajax call on create');
                    assert(ajax.args[0][0] === 'sbv');
                    assert(model.item() === undefined);
                    ajaxPromise.resolve('sbv!');
                    ajaxPromise.promise.then(function(){
                        assert(model.item() === 'sbv!', 'sbv set');
                        done();
                    });
                });
            });
            describe('post', function(){
                beforeEach(function(){
                    ajaxInjected.sbv = {post: ajax};
                });
                it('should post sbv', function(done){
                    var model = new Model();
                    assert(!ajax.calledOnce, 'no ajax call on create');
                    model.post('sbv');
                    assert(ajax.calledOnce, 'ajax call on create');
                    assert(ajax.args[0][0] === 'sbv');
                    assert(model.item() === undefined);
                    ajaxPromise.resolve('sbv!');
                    ajaxPromise.promise.then(function(){
                        assert(model.item() === 'sbv!', 'sbv set');
                        done();
                    });
                });
            });
            describe('put', function(){
                beforeEach(function(){
                    ajaxInjected.sbv = {put: ajax};
                });
                it('should put sbv', function(done){
                    var model = new Model();
                    assert(!ajax.calledOnce, 'no ajax call on create');
                    model.put('sbv');
                    assert(ajax.calledOnce, 'ajax call on create');
                    assert(ajax.args[0][0] === 'sbv');
                    assert(model.item() === undefined);
                    ajaxPromise.resolve('sbv!');
                    ajaxPromise.promise.then(function(){
                        assert(model.item() === 'sbv!', 'sbv set');
                        done();
                    });
                });
            });
            describe('delete', function(){
                beforeEach(function(){
                    ajaxInjected.sbv = {'delete': ajax};
                });
                it('should delete sbv', function(done){
                    var model = new Model();
                    model.refresh = sinon.spy();
                    assert(!ajax.calledOnce, 'no ajax call on create');
                    model.item(1);
                    model['delete']('sbv'); /* eslint dot-notation: 0*/
                    assert(ajax.calledOnce, 'ajax call on create');
                    assert(ajax.args[0][0] === 'sbv');
                    ajaxPromise.resolve();
                    ajaxPromise.promise.then(function(){
                        assert(model.refresh.calledOnce, 'model refreshed');
                        assert(model.item() === 1, 'doesn\'t delete selected item');
                        done();
                    });
                });
            });
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
            var productCategory;
            beforeEach(function(done) {
                productCategory = sinon.spy();
                injector.mock('app.platinum.product-category', productCategory);
                injector.mock('app.platinum.headings', sinon.spy());
                injector.require(['platinum/products'], function(_Model) {
                    Model = _Model;
                    done(); // We can launch the tests!
                });
            });

            describe('#ajax calls', function(){
                it('should get sbv when sbvid set and then create products', function(){
                    var model = new Model();
                    assert(productCategory.callCount === 0, 'no product categories created with new model');
                    model.sbv(1);
                    assert(model.categories().length === 3, 'three product categories created');
                    assert(productCategory.callCount === 3, 'three new product categories');
                });
            });
        });

        describe('product category view model Testing', function() {
            // Load modules with requirejs before tests
            var Model, Product;
            describe('#get products', function(){
                beforeEach(function(done) {
                    Product = sinon.stub().returns('Product');
                    injector.mock('app.platinum.product', Product);
                    injector.mock('ajax', {products: {post: ajax}});
                    injector.require(['platinum/product-category'], function(_Model) {
                        Model = _Model;
                        done(); // We can launch the tests!
                    });
                });
                it('should have a new product', function(){
                    var model = new Model();
                    console.log(model.product);
                    assert(Product.callCount === 1);
                    //work outy how to test for product return
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
            });
        });

        describe('product view model Testing', function() {
            // Load modules with requirejs before tests
            var Model;
            describe('#get product', function(){
                beforeEach(function(done) {
                    injector.mock('ajax', {product: {post: ajax}});
                    injector.require(['platinum/product'], function(_Model) {
                        Model = _Model;
                        done(); // We can launch the tests!
                    });
                });
                it('should get product', function(done){
                    var model = new Model();
                    assert(ajax.callCount === 0, 'get product ajax not called');
                    model.product('product');
                    assert(ajax.callCount === 1, 'get product ajax called');
                    assert(ajax.args[0][0] === 'product');
                    assert(!model.items().length, 'no items before ajax returns data');
                    ajaxPromise.resolve([1, 2, 3]);
                    ajaxPromise.promise.then(function(){
                        assert(model.items()[0] === 1);
                        assert(model.items().length === 3);
                        done();
                    });
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
