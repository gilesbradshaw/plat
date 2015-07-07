'use strict';

describe('category', function() {
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
            tools.injector.require(['components/category/viewModel'], function(_Model) {
                Model = _Model;
                done();
            });
        });

        describe('list', function(){
            beforeEach(function(){
                tools.ajaxInjected.category = {list: tools.ajax};
            });
            it('should set params to constructor parameter', function(){
                assert((new Model('params')).params === 'params');
            });
            it('should get categories', function(done){
                var model = new Model();
                assert(!tools.ajax.calledOnce, 'no ajax call on create');
                assert(model.refresh() === model);
                assert(tools.ajax.calledOnce, 'ajax call on refresh');
                tools.ajaxPromise.resolve('categories');
                tools.ajaxPromise.promise.then(function(){
                    assert(model.items() === 'categories', 'categories set');
                    done();
                });
            });
        });
        describe('new', function(){
            it('should make a new category', function(){
                var model = new Model();
                model.new('category');
                assert(model.item().title() === undefined, 'new category created');
            });
        });
        describe('get', function(){
            beforeEach(function(){
                tools.ajaxInjected.category = {get: tools.ajax};
            });
            it('should get category', function(done){
                var model = new Model();
                assert(!tools.ajax.calledOnce, 'no ajax call on create');
                model.get('category')();
                assert(tools.ajax.calledOnce, 'ajax call on create');
                assert(tools.ajax.args[0][0] === 'category');
                assert(model.item() === undefined);
                tools.ajaxPromise.resolve('category!');
                tools.ajaxPromise.promise.then(function(){
                    assert(model.item() === 'category!', 'category set');
                    done();
                });
            });
        });
        describe('post', function(){
            beforeEach(function(){
                tools.ajaxInjected.category = {post: tools.ajax};
            });
            it('should post category', function(done){
                var model = new Model();
                assert(!tools.ajax.calledOnce, 'no ajax call on create');
                model.post(function(){
                    return {
                        title: function(){return 'category'; }
                    };
                })();
                assert(tools.ajax.calledOnce, 'ajax call on post');
                assert(tools.ajax.args[0][0].title === 'category');
                assert(model.item() === undefined);
                tools.ajaxPromise.resolve('category!');
                tools.ajaxPromise.promise.then(function(){
                    assert(model.item() === 'category!', 'category set');
                    done();
                });
            });
        });
        describe('put', function(){
            beforeEach(function(){
                tools.ajaxInjected.category = {put: tools.ajax};
            });
            it('should put category', function(done){
                var model = new Model();
                assert(!tools.ajax.calledOnce, 'no ajax call on put');
                model.put(function(){return 'category'; })();
                assert(tools.ajax.calledOnce, 'ajax call on create');
                assert(tools.ajax.args[0][0] === 'category');
                assert(model.item() === undefined);
                tools.ajaxPromise.resolve('category!');
                tools.ajaxPromise.promise.then(function(){
                    assert(model.item() === 'category!', 'category set');
                    done();
                });
            });
        });
        describe('delete', function(){
            beforeEach(function(){
                tools.ajaxInjected.category = {'delete': tools.ajax};
            });
            it('should delete category', function(done){
                var model = new Model();
                model.refresh = sinon.spy();
                assert(!tools.ajax.calledOnce, 'no ajax call on create');
                model.item(1);
                model['delete']('category')(); /* eslint dot-notation: 0*/
                assert(tools.ajax.calledOnce, 'ajax call on delete');
                assert(tools.ajax.args[0][0] === 'category');
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
