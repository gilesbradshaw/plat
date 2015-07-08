'use strict';
describe('sbv', function() {
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
            tools.injector.require(['components/sbv/viewModel'], function(_Model) {
                Model = _Model;
                done();
            });
        });

        describe('list', function(){
            beforeEach(function(){
                tools.ajaxInjected.sbv = {list: tools.ajax};
            });
            it('should set params to constructor parameter', function(){
                assert((new Model('params')).params === 'params');
            });
            it('should get sbvs', function(done){
                var model = new Model();
                assert(!tools.ajax.calledOnce, 'no ajax call on create');
                assert(model.refresh() === model);
                assert(tools.ajax.calledOnce, 'ajax call on refresh');
                tools.ajaxPromise.resolve('sbvs');
                tools.ajaxPromise.promise.then(function(){
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
                tools.ajaxInjected.sbv = {get: tools.ajax};
            });
            it('should get sbv', function(done){
                var model = new Model();
                assert(!tools.ajax.calledOnce, 'no ajax call on create');
                model.get('sbv')();
                assert(tools.ajax.calledOnce, 'ajax call on create');
                assert(tools.ajax.args[0][0] === 'sbv');
                assert(model.item() === undefined);
                tools.ajaxPromise.resolve('sbv!');
                tools.ajaxPromise.promise.then(function(){
                    assert(model.item() === 'sbv!', 'sbv set');
                    done();
                });
            });
        });
        describe('post', function(){
            beforeEach(function(){
                tools.ajaxInjected.sbv = {post: tools.ajax};
            });
            it('should post sbv', function(done){
                var model = new Model();
                assert(!tools.ajax.calledOnce, 'no ajax call on create');
                model.post(function(){ return 'sbv'; })();
                assert(tools.ajax.calledOnce, 'ajax call on post');
                assert(tools.ajax.args[0][0] === 'sbv');
                assert(model.item() === undefined);
                tools.ajaxPromise.resolve('sbv!');
                tools.ajaxPromise.promise.then(function(){
                    assert(model.item() === 'sbv!', 'sbv set');
                    done();
                });
            });
        });
        describe('put', function(){
            beforeEach(function(){
                tools.ajaxInjected.sbv = {put: tools.ajax};
            });
            it('should put sbv', function(done){
                var model = new Model();
                assert(!tools.ajax.calledOnce, 'no ajax call on put');
                model.put(function(){return 'sbv'; })();
                assert(tools.ajax.calledOnce, 'ajax call on create');
                assert(tools.ajax.args[0][0] === 'sbv');
                assert(model.item() === undefined);
                tools.ajaxPromise.resolve('sbv!');
                tools.ajaxPromise.promise.then(function(){
                    assert(model.item() === 'sbv!', 'sbv set');
                    done();
                });
            });
        });
        describe('delete', function(){
            beforeEach(function(){
                tools.ajaxInjected.sbv = {'delete': tools.ajax};
            });
            it('should delete sbv', function(done){
                var model = new Model();
                model.refresh = sinon.spy();
                assert(!tools.ajax.calledOnce, 'no ajax call on create');
                model.item(1);
                model['delete']('sbv')(); /* eslint dot-notation: 0*/
                assert(tools.ajax.calledOnce, 'ajax call on delete');
                assert(tools.ajax.args[0][0] === 'sbv');
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
