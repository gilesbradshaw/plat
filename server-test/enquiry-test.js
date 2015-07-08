'use strict';

describe('enquiry', function() {
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
            tools.injector.require(['components/enquiry/viewModel'], function(_Model) {
                Model = _Model;
                done();
            });
        });

        describe('list', function(){
            beforeEach(function(){
                tools.ajaxInjected.enquiry = {list: tools.ajax};
            });
            it('should set params to constructor parameter', function(){
                assert((new Model('params')).params === 'params');
            });
            it('should get enquiries', function(done){
                var model = new Model();
                assert(!tools.ajax.calledOnce, 'no ajax call on create');
                assert(model.refresh() === model);
                assert(tools.ajax.calledOnce, 'ajax call on refresh');
                tools.ajaxPromise.resolve('enquiries');
                tools.ajaxPromise.promise.then(function(){
                    assert(model.items() === 'enquiries', 'enquiries set');
                    done();
                });
            });
        });
        describe('list by dealer', function(){
            beforeEach(function(){
                tools.ajaxInjected.enquiry = {listByDealer: tools.ajax};
            });
            it('should get enquiries', function(done){
                var model = new Model({dealer: 'dealer'});
                assert(!tools.ajax.calledOnce, 'no ajax call on create');
                assert(model.refresh() === model);
                assert(tools.ajax.calledOnce, 'ajax call on refresh');
                assert(tools.ajax.args[0][0] === 'dealer', 'dealer id sent to ajax');
                tools.ajaxPromise.resolve('enquiries');
                tools.ajaxPromise.promise.then(function(){
                    assert(model.items() === 'enquiries', 'enquiries set');
                    done();
                });
            });
        });

        describe('new', function(){
            it('should make a new enquiry', function(){
                var model = new Model();
                model.new('enquiry');
                assert(model.item().title() === undefined, 'new enquiry created');
            });
            it('should make a new enquiry with a dealer', function(){
                var model = new Model({dealer: 'dealer'});
                model.new('enquiry');
                assert(model.item().dealer === 'dealer', 'new enquiry created with dealer');
            });
        });
        describe('get', function(){
            beforeEach(function(){
                tools.ajaxInjected.enquiry = {get: tools.ajax};
            });
            it('should get enquiry', function(done){
                var model = new Model();
                assert(!tools.ajax.calledOnce, 'no ajax call on create');
                model.get('enquiry')();
                assert(tools.ajax.calledOnce, 'ajax call on create');
                assert(tools.ajax.args[0][0] === 'enquiry');
                assert(model.item() === undefined);
                tools.ajaxPromise.resolve('enquiry!');
                tools.ajaxPromise.promise.then(function(){
                    assert(model.item() === 'enquiry!', 'enquiry set');
                    done();
                });
            });
        });
        describe('post', function(){
            beforeEach(function(){
                tools.ajaxInjected.enquiry = {post: tools.ajax};
            });
            it('should post enquiry', function(done){
                var model = new Model();
                assert(!tools.ajax.calledOnce, 'no ajax call on create');
                model.post(function(){ return 'enquiry'; })();
                assert(tools.ajax.calledOnce, 'ajax call on post');
                assert(tools.ajax.args[0][0] === 'enquiry');
                assert(model.item() === undefined);
                tools.ajaxPromise.resolve('enquiry!');
                tools.ajaxPromise.promise.then(function(){
                    assert(model.item() === 'enquiry!', 'enquiry set');
                    done();
                });
            });
        });
        describe('put', function(){
            beforeEach(function(){
                tools.ajaxInjected.enquiry = {put: tools.ajax};
            });
            it('should put enquiry', function(done){
                var model = new Model();
                assert(!tools.ajax.calledOnce, 'no ajax call on put');
                model.put(function(){return 'enquiry'; })();
                assert(tools.ajax.calledOnce, 'ajax call on create');
                assert(tools.ajax.args[0][0] === 'enquiry');
                assert(model.item() === undefined);
                tools.ajaxPromise.resolve('enquiry!');
                tools.ajaxPromise.promise.then(function(){
                    assert(model.item() === 'enquiry!', 'enquiry set');
                    done();
                });
            });
        });
        describe('delete', function(){
            beforeEach(function(){
                tools.ajaxInjected.enquiry = {'delete': tools.ajax};
            });
            it('should delete enquiry', function(done){
                var model = new Model();
                model.refresh = sinon.spy();
                assert(!tools.ajax.calledOnce, 'no ajax call on create');
                model.item(1);
                model['delete']('enquiry')(); /* eslint dot-notation: 0*/
                assert(tools.ajax.calledOnce, 'ajax call on delete');
                assert(tools.ajax.args[0][0] === 'enquiry');
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
