'use strict';

describe('sales exec', function() {
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
            tools.injector.require(['components/sales-exec/viewModel'], function(_Model) {
                Model = _Model;
                done();
            });
        });

        describe('list', function(){
            beforeEach(function(){
                tools.ajaxInjected.salesExec = {list: tools.ajax};
            });
            it('should set params to constructor parameter', function(){
                assert((new Model('params')).params === 'params');
            });
            it('should get sales execs', function(done){
                var model = new Model();
                assert(!tools.ajax.calledOnce, 'no ajax call on create');
                assert(model.refresh() === model);
                assert(tools.ajax.calledOnce, 'ajax call on refresh');
                tools.ajaxPromise.resolve('sales execs');
                tools.ajaxPromise.promise.then(function(){
                    assert(model.items() === 'sales execs', 'sales execs set');
                    done();
                });
            });
        });
        describe('list by dealer', function(){
            beforeEach(function(){
                tools.ajaxInjected.salesExec = {listByDealer: tools.ajax};
            });
            it('should get sales execs', function(done){
                var model = new Model({dealer: 'dealer'});
                assert(!tools.ajax.calledOnce, 'no ajax call on create');
                assert(model.refresh() === model);
                assert(tools.ajax.calledOnce, 'ajax call on refresh');
                assert(tools.ajax.args[0][0] === 'dealer', 'dealer id sent to ajax');
                tools.ajaxPromise.resolve('sales execs');
                tools.ajaxPromise.promise.then(function(){
                    assert(model.items() === 'sales execs', 'sales execs set');
                    done();
                });
            });
        });
        describe('new', function(){
            it('should make a new sales exec', function(){
                var model = new Model();
                model.new('sales exec');
                assert(model.item().title() === undefined, 'new sales exec created');
            });
            it('should make a new sales exec with a dealer', function(){
                var model = new Model({dealer: 'dealer'});
                model.new('sales exec');
                assert(model.item().dealer === 'dealer', 'new sales exec created with dealer');
            });
        });
        describe('get', function(){
            beforeEach(function(){
                tools.ajaxInjected.salesExec = {get: tools.ajax};
            });
            it('should get sales exec', function(done){
                var model = new Model();
                assert(!tools.ajax.calledOnce, 'no ajax call on create');
                model.get('sales exec')();
                assert(tools.ajax.calledOnce, 'ajax call on create');
                assert(tools.ajax.args[0][0] === 'sales exec');
                assert(model.item() === undefined);
                tools.ajaxPromise.resolve('sales exec!');
                tools.ajaxPromise.promise.then(function(){
                    assert(model.item() === 'sales exec!', 'sales exec set');
                    done();
                });
            });
        });
        describe('post', function(){
            beforeEach(function(){
                tools.ajaxInjected.salesExec = {post: tools.ajax};
            });
            it('should post sales exec', function(done){
                var model = new Model();
                assert(false);
                assert(!tools.ajax.calledOnce, 'no ajax call on create');
                model.post(function(){ return 'sales exec'; })();
                assert(tools.ajax.calledOnce, 'ajax call on post');
                assert(tools.ajax.args[0][0] === 'sales exec');
                assert(model.item() === undefined);
                tools.ajaxPromise.resolve('sales exec!');
                tools.ajaxPromise.promise.then(function(){
                    assert(model.item() === 'sales exec!', 'sales exec set');
                    done();
                });
            });
        });
        describe('put', function(){
            beforeEach(function(){
                tools.ajaxInjected.salesExec = {put: tools.ajax};
            });
            it('should put sales exec', function(done){
                var model = new Model();
                assert(!tools.ajax.calledOnce, 'no ajax call on put');
                model.put(function(){return 'sales exec'; })();
                assert(tools.ajax.calledOnce, 'ajax call on create');
                assert(tools.ajax.args[0][0] === 'sales exec');
                assert(model.item() === undefined);
                tools.ajaxPromise.resolve('sales exec!');
                tools.ajaxPromise.promise.then(function(){
                    assert(model.item() === 'sales exec!', 'sales exec set');
                    done();
                });
            });
        });
        describe('delete', function(){
            beforeEach(function(){
                tools.ajaxInjected.salesExec = {'delete': tools.ajax};
            });
            it('should delete sales exec', function(done){
                var model = new Model();
                model.refresh = sinon.spy();
                assert(!tools.ajax.calledOnce, 'no ajax call on create');
                model.item(1);
                model['delete']('sales exec')(); /* eslint dot-notation: 0*/
                assert(tools.ajax.calledOnce, 'ajax call on delete');
                assert(tools.ajax.args[0][0] === 'sales exec');
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
