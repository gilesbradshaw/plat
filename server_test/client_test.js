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
            andme: 'lib/try1',
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
            requirejs(['andme', 'tryme'], function(tryme, andme){
                ajax = tryme;
                ajaxPromise=andme;
                done();
            });
        });
        afterEach(function() {
            //injector.clean();
        });
        describe('Offer view model Testing', function() {
            it('should work', function(){
                    assert(ajax === 'ok');
                    assert(ajaxPromise === 'ok');
                });
            // Load modules with requirejs before tests
        });
    });
})();
