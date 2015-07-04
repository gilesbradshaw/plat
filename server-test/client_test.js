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
            q: '../bower_components/q/q'

        }
    });

    describe('mocked ajax testing', function() {
        var ajax, ajaxInjected;
        var ajaxPromise;
        var injector;
        var ko;
        beforeEach(function(done) {
            requirejs(['knockout', 'q', 'squirejs'], function(_ko, Q, Squire){
                ko = _ko;
                injector = new Squire();
                ajaxPromise = Q.defer();
                ajax = sinon.stub().returns(ajaxPromise.promise);
                ajaxInjected = {};
                injector.mock('ajax', ajaxInjected);
                done();
            });
        });
        afterEach(function() {
            injector.clean();
        });
        describe('platinum component category viewmodel testing', function() {
            // Load modules with requirejs before tests
            var ViewModel;
            beforeEach(function(done) {
                injector.require(['components/category/viewModel'], function(_ViewModel) {
                    ViewModel = _ViewModel;
                    done(); // We can launch the tests!
                });
            });
            describe('#view model functions', function(){
                it('should set params to constructor parameter', function(){
                    assert((new ViewModel('params')).params === 'params');
                });
                it('should have an observable category', function(){
                    assert((new ViewModel('params')).category);
                    console.log('look into this!!!!!');
                    //assert(ko.isObservable((new ViewModel('params')).category));
                });
            });
        });
        describe('platinum component product viewmodel testing', function() {
            // Load modules with requirejs before tests
            var ViewModel;
            beforeEach(function(done) {
                injector.require(['components/product/viewModel'], function(_ViewModel) {
                    ViewModel = _ViewModel;
                    done(); // We can launch the tests!
                });
            });
            describe('#view model functions', function(){
                it('should set params to constructor parameter', function(){
                    assert((new ViewModel('params')).params === 'params');
                });
                it('should call get parameters when product set and set parameters to result', function(done){
                    ajaxInjected.parameters = {list: ajax};
                    var product = {name: 'prod'};
                    var viewModel = new ViewModel();
                    viewModel.product(product);
                    assert(ajax.calledOnce, 'get Parameters called');
                    assert(ajax.args[0][0] === product, 'getproduct called with product');
                    ajaxPromise.resolve('parameters');
                    ajaxPromise.promise.then(function(){
                        assert(viewModel.parameters() === 'parameters', 'parameters set');
                        done();
                    });
                });
                it('should post a product when getProduct called and set items to result', function(done){
                    ajaxInjected.product = {post: ajax};
                    var product = {name: 'prod'};
                    var viewModel = new ViewModel();
                    viewModel.getProduct(product)();
                    assert(ajax.calledOnce, 'post product called');
                    assert(ajax.args[0][0] === product, 'post product called with product');
                    ajaxPromise.resolve('items');
                    ajaxPromise.promise.then(function(){
                        assert(viewModel.items() === 'items', 'items set');
                        done();
                    });
                });
            });
        });
        describe('Sbv view model list Testing', function() {
            var Model;
            beforeEach(function(done) {
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
                injector.mock('app.platinum.sbv', sinon.stub().returns({refresh: sinon.spy()}));
                injector.mock('app.platinum.headings', headings);
                injector.mock('app.platinum.products', products);
                injector.mock('ajax', {sbv: {get: ajax}});
                injector.require(['platinum/Offer'], function(_Model) {
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

            it('should create three product categories when created', function(){
                var model = new Model();
                assert(model.categories().length === 3, 'three product categories created');
                assert(productCategory.callCount === 3, 'three new product categories');
            });

            it('should post get products when sb set then create products', function(done){
                ajaxInjected.products = {post: ajax};
                var model = new Model();
                model.sbv(1);
                ajaxPromise.resolve('products');
                ajaxPromise.promise.then(function(){
                    assert(model.products() === 'products', 'products set');
                    done();
                });
            });
        });

        describe('product category view model testing', function() {
            // Load modules with requirejs before tests
            var Model;
            describe('#get products', function(){
                beforeEach(function(done) {
                    injector.require(['platinum/product-category'], function(_Model) {
                        Model = _Model;
                        done(); // We can launch the tests!
                    });
                });
                it('should filter products by category', function(){
                    var model = new Model('cat', function(){
                        return [
                            {category: 'cat'},
                            {category: 'cat1'}
                        ];
                    });

                    assert(model.products().length === 1);
                    assert(model.products()[0].category === 'cat');
                });
            });
        });

        describe('headings view model Testing', function() {
            // Load modules with requirejs before tests
            var Model;
            beforeEach(function(done) {
                injector.mock('ajax', {headings: {post: ajax}});
                injector.require(['platinum/headings'], function(_Model) {
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
