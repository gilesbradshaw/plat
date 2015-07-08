'use strict';

describe('item', function() {
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
            tools.injector.require(['components/item/viewModel'], function(_Model) {
                Model = _Model;
                done();
            });
        });

        describe('list', function(){
            beforeEach(function(){
                tools.ajaxInjected.item = {list: tools.ajax};
            });
            it('should set params to constructor parameter', function(){
                assert((new Model('params')).params === 'params');
            });
            it('should get items', function(done){
                var model = new Model();
                assert(!tools.ajax.calledOnce, 'no ajax call on create');
                assert(model.refresh() === model);
                assert(tools.ajax.calledOnce, 'ajax call on refresh');
                tools.ajaxPromise.resolve('items');
                tools.ajaxPromise.promise.then(function(){
                    assert(model.items() === 'items', 'items set');
                    done();
                });
            });
        });
        describe('list by product', function(){
            beforeEach(function(){
                tools.ajaxInjected.item = {listByProduct: tools.ajax};
            });
            it('should get items', function(done){
                var model = new Model({product: 'product'});
                assert(!tools.ajax.calledOnce, 'no ajax call on create');
                assert(model.refresh() === model);
                assert(tools.ajax.calledOnce, 'ajax call on refresh');
                assert(tools.ajax.args[0][0] === 'product', 'product id sent to ajax');
                tools.ajaxPromise.resolve('items');
                tools.ajaxPromise.promise.then(function(){
                    assert(model.items() === 'items', 'items set');
                    done();
                });
            });
        });

        describe('new', function(){
            it('should make a new item', function(){
                var model = new Model();
                model.new('item');
                assert(model.item().title() === undefined, 'new item created');
            });
            it('should make a new item with a product', function(){
                var model = new Model({product: 'product'});
                model.new('item');
                assert(model.item().product === 'product', 'new item created with product');
            });
        });
        describe('get', function(){
            beforeEach(function(){
                tools.ajaxInjected.item = {get: tools.ajax};
            });
            it('should get item', function(done){
                var model = new Model();
                assert(!tools.ajax.calledOnce, 'no ajax call on create');
                model.get('item')();
                assert(tools.ajax.calledOnce, 'ajax call on create');
                assert(tools.ajax.args[0][0] === 'item');
                assert(model.item() === undefined);
                tools.ajaxPromise.resolve('item!');
                tools.ajaxPromise.promise.then(function(){
                    assert(model.item() === 'item!', 'item set');
                    done();
                });
            });
        });
        describe('post', function(){
            beforeEach(function(){
                tools.ajaxInjected.item = {post: tools.ajax};
            });
            it('should post item', function(done){
                var model = new Model();
                assert(!tools.ajax.calledOnce, 'no ajax call on create');
                model.post(function(){ return 'item'; })();
                assert(tools.ajax.calledOnce, 'ajax call on post');
                assert(tools.ajax.args[0][0]=== 'item');
                assert(model.item() === undefined);
                tools.ajaxPromise.resolve('item!');
                tools.ajaxPromise.promise.then(function(){
                    assert(model.item() === 'item!', 'item set');
                    done();
                });
            });
        });
        describe('put', function(){
            beforeEach(function(){
                tools.ajaxInjected.item = {put: tools.ajax};
            });
            it('should put item', function(done){
                var model = new Model();
                assert(!tools.ajax.calledOnce, 'no ajax call on put');
                model.put(function(){return 'item'; })();
                assert(tools.ajax.calledOnce, 'ajax call on create');
                assert(tools.ajax.args[0][0] === 'item');
                assert(model.item() === undefined);
                tools.ajaxPromise.resolve('item!');
                tools.ajaxPromise.promise.then(function(){
                    assert(model.item() === 'item!', 'item set');
                    done();
                });
            });
        });
        describe('delete', function(){
            beforeEach(function(){
                tools.ajaxInjected.item = {'delete': tools.ajax};
            });
            it('should delete item', function(done){
                var model = new Model();
                model.refresh = sinon.spy();
                assert(!tools.ajax.calledOnce, 'no ajax call on create');
                model.item(1);
                model['delete']('item')(); /* eslint dot-notation: 0*/
                assert(tools.ajax.calledOnce, 'ajax call on delete');
                assert(tools.ajax.args[0][0] === 'item');
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
