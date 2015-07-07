'use strict';

describe('product', function() {
    var tools;
    beforeEach(function(done){
        requirejs(['testTools'], function(_tools){
            tools = _tools();
            done();
        });
    });
    describe('component', function() {
        var Model;
        beforeEach(function(done) {
            tools.injector.require(['components/product/viewModel'], function(_Model) {
                Model = _Model;
                done();
            });
        });

        describe('list', function(){
            beforeEach(function(){
                tools.ajaxInjected.product = {list: tools.ajax};
            });
            it('should set params to constructor parameter', function(){
                assert((new Model('params')).params === 'params');
            });
            it('should get products', function(done){
                var model = new Model();
                assert(!tools.ajax.calledOnce, 'no ajax call on create');
                assert(model.refresh() === model);
                assert(tools.ajax.calledOnce, 'ajax call on refresh');
                tools.ajaxPromise.resolve('products');
                tools.ajaxPromise.promise.then(function(){
                    assert(model.items() === 'products', 'products set');
                    done();
                });
            });
        });
        describe('list by category', function(){
            beforeEach(function(){
                tools.ajaxInjected.product = {listByCategory: tools.ajax};
            });
            it('should get products', function(done){
                var model = new Model({category: 'category'});
                assert(!tools.ajax.calledOnce, 'no ajax call on create');
                assert(model.refresh() === model);
                assert(tools.ajax.calledOnce, 'ajax call on refresh');
                assert(tools.ajax.args[0][0] === 'category', 'category id sent to ajax');
                tools.ajaxPromise.resolve('categories');
                tools.ajaxPromise.promise.then(function(){
                    assert(model.items() === 'categories', 'categories set');
                    done();
                });
            });
        });

        describe('new', function(){
            it('should make a new product', function(){
                var model = new Model();
                model.new('product');
                assert(model.item().title() === undefined, 'new product created');
            });
            it('should make a new product with a category', function(){
                var model = new Model({category: 'category'});
                model.new('product');
                assert(model.item().category === 'category', 'new product created with category');
            });
        });
        describe('get', function(){
            beforeEach(function(){
                tools.ajaxInjected.product = {get: tools.ajax};
            });
            it('should get product', function(done){
                var model = new Model();
                assert(!tools.ajax.calledOnce, 'no ajax call on create');
                model.get('product')();
                assert(tools.ajax.calledOnce, 'ajax call on create');
                assert(tools.ajax.args[0][0] === 'product');
                assert(model.item() === undefined);
                tools.ajaxPromise.resolve('product!');
                tools.ajaxPromise.promise.then(function(){
                    assert(model.item() === 'product!', 'product set');
                    done();
                });
            });
        });
        describe('post', function(){
            beforeEach(function(){
                tools.ajaxInjected.product = {post: tools.ajax};
            });
            it('should post product', function(done){
                var model = new Model();
                assert(!tools.ajax.calledOnce, 'no ajax call on create');
                model.post(function(){
                    return {
                        title: function(){return 'product'; },
                        category: 'category'
                    };
                })();
                assert(tools.ajax.calledOnce, 'ajax call on post');
                assert(tools.ajax.args[0][0].title === 'product');
                assert(tools.ajax.args[0][0].category === 'category');
                assert(model.item() === undefined);
                tools.ajaxPromise.resolve('product!');
                tools.ajaxPromise.promise.then(function(){
                    assert(model.item() === 'product!', 'product set');
                    done();
                });
            });
        });
        describe('put', function(){
            beforeEach(function(){
                tools.ajaxInjected.product = {put: tools.ajax};
            });
            it('should put product', function(done){
                var model = new Model();
                assert(!tools.ajax.calledOnce, 'no ajax call on put');
                model.put(function(){return 'product'; })();
                assert(tools.ajax.calledOnce, 'ajax call on create');
                assert(tools.ajax.args[0][0] === 'product');
                assert(model.item() === undefined);
                tools.ajaxPromise.resolve('product!');
                tools.ajaxPromise.promise.then(function(){
                    assert(model.item() === 'product!', 'product set');
                    done();
                });
            });
        });
        describe('delete', function(){
            beforeEach(function(){
                tools.ajaxInjected.product = {'delete': tools.ajax};
            });
            it('should delete product', function(done){
                var model = new Model();
                model.refresh = sinon.spy();
                assert(!tools.ajax.calledOnce, 'no ajax call on create');
                model.item(1);
                model['delete']('product')(); /* eslint dot-notation: 0*/
                assert(tools.ajax.calledOnce, 'ajax call on delete');
                assert(tools.ajax.args[0][0] === 'product');
                tools.ajaxPromise.resolve('done');
                tools.ajaxPromise.promise.then(function(){
                    assert(model.refresh.calledOnce, 'model refreshed');
                    assert(model.item() === 1, 'doesn\'t delete selected item');
                    done();
                });
            });
        });
    });
});
