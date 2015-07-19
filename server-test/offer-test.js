'use strict';

describe('offer', function() {
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
            tools.injector.require(['components/offer/viewModel'], function(_Model) {
                Model = _Model;
                done();
            });
        });

        describe('list', function(){
            beforeEach(function(){
                tools.ajaxInjected.offer = {list: tools.ajax};
            });
            it('should set params to constructor parameter', function(){
                assert((new Model('params')).params === 'params');
            });
            it('should get offers', function(done){
                var model = new Model();
                assert(!tools.ajax.calledOnce, 'no ajax call on create');
                assert(model.refresh() === model);
                assert(tools.ajax.calledOnce, 'ajax call on refresh');
                tools.ajaxPromise.resolve('offers');
                tools.ajaxPromise.promise.then(function(){
                    assert(model.items() === 'offers', 'offers set');
                    done();
                });
            });
        });
        describe('list by enquiry', function(){
            beforeEach(function(){
                tools.ajaxInjected.offer = {listByEnquiry: tools.ajax};
            });
            it('should get offers', function(done){
                var model = new Model({enquiry: 'enquiry'});
                assert(!tools.ajax.calledOnce, 'no ajax call on create');
                assert(model.refresh() === model);
                assert(tools.ajax.calledOnce, 'ajax call on refresh');
                assert(tools.ajax.args[0][0] === 'enquiry', 'enquiry id sent to ajax');
                tools.ajaxPromise.resolve('offers');
                tools.ajaxPromise.promise.then(function(){
                    assert(model.items() === 'offers', 'offers set');
                    done();
                });
            });
        });

        describe('new', function(){
            it('should make a new offer', function(){
                var model = new Model();
                model.new('offer');
                assert(model.item().title() === undefined, 'new offer created');
            });
            it('should make a new offer with an enquiry', function(){
                var model = new Model({enquiry: 'enquiry'});
                model.new('offer');
                assert(model.item().enquiry === 'enquiry', 'new offer created with enquiry');
            });
        });
        describe('get', function(){
            beforeEach(function(){
                tools.ajaxInjected.offer = {get: tools.ajax};
            });
            it('should get offer', function(done){
                var model = new Model();
                assert(!tools.ajax.calledOnce, 'no ajax call on create');
                model.get('offer')();
                assert(tools.ajax.calledOnce, 'ajax call on create');
                assert(tools.ajax.args[0][0] === 'offer');
                assert(model.item() === undefined);
                tools.ajaxPromise.resolve('offer!');
                tools.ajaxPromise.promise.then(function(){
                    assert(model.item() === 'offer!', 'offer set');
                    done();
                });
            });
        });
        describe('post', function(){
            beforeEach(function(){
                tools.ajaxInjected.offer = {post: tools.ajax};
            });
            it('should post offer', function(done){
                var model = new Model();
                assert(!tools.ajax.calledOnce, 'no ajax call on create');
                model.post(function(){ return 'offer'; })();
                assert(tools.ajax.calledOnce, 'ajax call on post');
                assert(tools.ajax.args[0][0] === 'offer');
                assert(model.item() === undefined);
                tools.ajaxPromise.resolve('offer!');
                tools.ajaxPromise.promise.then(function(){
                    assert(model.item() === 'offer!', 'offer set');
                    done();
                });
            });
        });
        describe('put', function(){
            beforeEach(function(){
                tools.ajaxInjected.offer = {put: tools.ajax};
            });
            it('should put offer', function(done){
                var model = new Model();
                assert(!tools.ajax.calledOnce, 'no ajax call on put');
                model.put(function(){return 'offer'; })();
                assert(tools.ajax.calledOnce, 'ajax call on create');
                assert(tools.ajax.args[0][0] === 'offer');
                assert(model.item() === undefined);
                tools.ajaxPromise.resolve('offer!');
                tools.ajaxPromise.promise.then(function(){
                    assert(model.item() === 'offer!', 'offer set');
                    done();
                });
            });
        });
        describe('delete', function(){
            beforeEach(function(){
                tools.ajaxInjected.offer = {'delete': tools.ajax};
            });
            it('should delete offer', function(done){
                var model = new Model();
                model.refresh = sinon.spy();
                assert(!tools.ajax.calledOnce, 'no ajax call on create');
                model.item(1);
                model['delete']('offer')(); /* eslint dot-notation: 0*/
                assert(tools.ajax.calledOnce, 'ajax call on delete');
                assert(tools.ajax.args[0][0] === 'offer');
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
