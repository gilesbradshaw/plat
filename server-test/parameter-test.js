'use strict';

describe('parameter', function() {
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
            tools.injector.require(['components/parameter/viewModel'], function(_Model) {
                Model = _Model;
                done();
            });
        });

        describe('list', function(){
            beforeEach(function(){
                tools.ajaxInjected.parameter = {list: tools.ajax};
            });
            it('should set params to constructor parameter', function(){
                assert((new Model('params')).params === 'params');
            });
            it('should get parameters', function(done){
                var model = new Model();
                assert(!tools.ajax.calledOnce, 'no ajax call on create');
                assert(model.refresh() === model);
                assert(tools.ajax.calledOnce, 'ajax call on refresh');
                tools.ajaxPromise.resolve('parameters');
                tools.ajaxPromise.promise.then(function(){
                    assert(model.items() === 'parameters', 'parameters set');
                    done();
                });
            });
        });
        describe('list by product', function(){
            beforeEach(function(){
                tools.ajaxInjected.parameter = {listByProduct: tools.ajax};
            });
            it('should get parameters', function(done){
                var model = new Model({product: 'product'});
                assert(!tools.ajax.calledOnce, 'no ajax call on create');
                assert(model.refresh() === model);
                assert(tools.ajax.calledOnce, 'ajax call on refresh');
                assert(tools.ajax.args[0][0] === 'product', 'product id sent to ajax');
                tools.ajaxPromise.resolve('parameters');
                tools.ajaxPromise.promise.then(function(){
                    assert(model.items() === 'parameters', 'parameters set');
                    done();
                });
            });
        });

        describe('new', function(){
            it('should make a new parameter', function(){
                var model = new Model();
                model.new('parameter');
                assert(model.item().title() === undefined, 'new parameter created');
            });
            it('should make a new parameter with a product', function(){
                var model = new Model({product: 'product'});
                model.new('parameter');
                assert(model.item().product === 'product', 'new parameter created with product');
            });
        });
        describe('get', function(){
            beforeEach(function(){
                tools.ajaxInjected.parameter = {get: tools.ajax};
            });
            it('should get parameter', function(done){
                var model = new Model();
                assert(!tools.ajax.calledOnce, 'no ajax call on create');
                model.get('parameter')();
                assert(tools.ajax.calledOnce, 'ajax call on create');
                assert(tools.ajax.args[0][0] === 'parameter');
                assert(model.item() === undefined);
                tools.ajaxPromise.resolve('parameter!');
                tools.ajaxPromise.promise.then(function(){
                    assert(model.item() === 'parameter!', 'parameter set');
                    done();
                });
            });
        });
        describe('post', function(){
            beforeEach(function(){
                tools.ajaxInjected.parameter = {post: tools.ajax};
            });
            it('should post parameter', function(done){
                var model = new Model();
                assert(!tools.ajax.calledOnce, 'no ajax call on create');
                model.post(function(){ return 'parameter'; })();
                assert(tools.ajax.calledOnce, 'ajax call on post');
                assert(tools.ajax.args[0][0]=== 'parameter');
                assert(model.item() === undefined);
                tools.ajaxPromise.resolve('parameter!');
                tools.ajaxPromise.promise.then(function(){
                    assert(model.item() === 'parameter!', 'parameter set');
                    done();
                });
            });
        });
        describe('put', function(){
            beforeEach(function(){
                tools.ajaxInjected.parameter = {put: tools.ajax};
            });
            it('should put parameter', function(done){
                var model = new Model();
                assert(!tools.ajax.calledOnce, 'no ajax call on put');
                model.put(function(){return 'parameter'; })();
                assert(tools.ajax.calledOnce, 'ajax call on create');
                assert(tools.ajax.args[0][0] === 'parameter');
                assert(model.item() === undefined);
                tools.ajaxPromise.resolve('parameter!');
                tools.ajaxPromise.promise.then(function(){
                    assert(model.item() === 'parameter!', 'parameter set');
                    done();
                });
            });
        });
        describe('delete', function(){
            beforeEach(function(){
                tools.ajaxInjected.parameter = {'delete': tools.ajax};
            });
            it('should delete parameter', function(done){
                var model = new Model();
                model.refresh = sinon.spy();
                assert(!tools.ajax.calledOnce, 'no ajax call on create');
                model.item(1);
                model['delete']('parameter')(); /* eslint dot-notation: 0*/
                assert(tools.ajax.calledOnce, 'ajax call on delete');
                assert(tools.ajax.args[0][0] === 'parameter');
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
