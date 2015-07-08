'use strict';

describe('dealer', function() {
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
            tools.injector.require(['components/dealer/viewModel'], function(_Model) {
                Model = _Model;
                done();
            });
        });

        describe('list', function(){
            beforeEach(function(){
                tools.ajaxInjected.dealer = {list: tools.ajax};
            });
            it('should set params to constructor parameter', function(){
                assert((new Model('params')).params === 'params');
            });
            it('should get dealers', function(done){
                var model = new Model();
                assert(!tools.ajax.calledOnce, 'no ajax call on create');
                assert(model.refresh() === model);
                assert(tools.ajax.calledOnce, 'ajax call on refresh');
                tools.ajaxPromise.resolve('dealers');
                tools.ajaxPromise.promise.then(function(){
                    assert(model.items() === 'dealers', 'dealers set');
                    done();
                });
            });
        });
        describe('new', function(){
            it('should make a new dealer', function(){
                var model = new Model();
                model.new('dealer');
                assert(model.item().title() === undefined, 'new dealer created');
            });
        });
        describe('get', function(){
            beforeEach(function(){
                tools.ajaxInjected.dealer = {get: tools.ajax};
            });
            it('should get dealer', function(done){
                var model = new Model();
                assert(!tools.ajax.calledOnce, 'no ajax call on create');
                model.get('dealer')();
                assert(tools.ajax.calledOnce, 'ajax call on create');
                assert(tools.ajax.args[0][0] === 'dealer');
                assert(model.item() === undefined);
                tools.ajaxPromise.resolve('dealer!');
                tools.ajaxPromise.promise.then(function(){
                    assert(model.item() === 'dealer!', 'dealer set');
                    done();
                });
            });
        });
        describe('post', function(){
            beforeEach(function(){
                tools.ajaxInjected.dealer = {post: tools.ajax};
            });
            it('should post dealer', function(done){
                var model = new Model();
                assert(!tools.ajax.calledOnce, 'no ajax call on create');
                model.post(function(){ return 'dealer'; })();
                assert(tools.ajax.calledOnce, 'ajax call on post');
                assert(tools.ajax.args[0][0] === 'dealer');
                assert(model.item() === undefined);
                tools.ajaxPromise.resolve('dealer!');
                tools.ajaxPromise.promise.then(function(){
                    assert(model.item() === 'dealer!', 'dealer set');
                    done();
                });
            });
        });
        describe('put', function(){
            beforeEach(function(){
                tools.ajaxInjected.dealer = {put: tools.ajax};
            });
            it('should put dealer', function(done){
                var model = new Model();
                assert(!tools.ajax.calledOnce, 'no ajax call on put');
                model.put(function(){return 'dealer'; })();
                assert(tools.ajax.calledOnce, 'ajax call on create');
                assert(tools.ajax.args[0][0] === 'dealer');
                assert(model.item() === undefined);
                tools.ajaxPromise.resolve('dealer!');
                tools.ajaxPromise.promise.then(function(){
                    assert(model.item() === 'dealer!', 'dealer set');
                    done();
                });
            });
        });
        describe('delete', function(){
            beforeEach(function(){
                tools.ajaxInjected.dealer = {'delete': tools.ajax};
            });
            it('should delete dealer', function(done){
                var model = new Model();
                model.refresh = sinon.spy();
                assert(!tools.ajax.calledOnce, 'no ajax call on create');
                model.item(1);
                model['delete']('dealer')(); /* eslint dot-notation: 0*/
                assert(tools.ajax.calledOnce, 'ajax call on delete');
                assert(tools.ajax.args[0][0] === 'dealer');
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
