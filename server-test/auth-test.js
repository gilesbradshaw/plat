'use strict';

describe('auth', function() {
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
            tools.injector.require(['components/auth/viewModel'], function(_Model) {
                Model = _Model;
                done();
            });
        });
        describe('new', function(){
            it('should make a new user', function(){
                var model = new Model();
                model.new();
                assert(model.item().username() === undefined, 'new user created with blank name');
                assert(model.item().password() === undefined, 'new user created with blank password');
            });
        });
        describe('get', function(){
            beforeEach(function(){
                tools.ajaxInjected.auth = {get: tools.ajax};
            });
            it('should get user', function(done){
                var model = new Model();
                assert(!tools.ajax.calledOnce, 'no ajax call on create');
                model.get();
                assert(tools.ajax.calledOnce, 'ajax call on create');
                assert(model.user() === undefined);
                tools.ajaxPromise.resolve('giles!');
                tools.ajaxPromise.promise.then(function(){
                    assert(model.user() === 'giles!', 'user got');
                    done();
                });
            });
        });
        describe('signin', function(){
            beforeEach(function(){
                tools.ajaxInjected.auth = {signin: tools.ajax};
            });
            it('should signin a new user', function(done){
                var model = new Model();
                model.new();
                model.item().username('giles');
                model.item().password('secret');
                assert(!tools.ajax.calledOnce, 'no ajax call on create');
                model.signin();
                assert(!model.item().password(), 'password cleared on sign in');
                assert(tools.ajax.calledOnce, 'ajax call on signon');
                assert(tools.ajax.args[0][0] === 'giles');
                assert(tools.ajax.args[0][1] === 'secret');

                assert(model.user() === undefined);
                tools.ajaxPromise.resolve('giles!');
                tools.ajaxPromise.promise.then(function(){
                    assert(model.user() === 'giles!', 'giles signed in');
                    assert(new Model().user() === 'giles!', 'user is shared');
                    done();
                });
            });
        });
        describe('signout', function(){
            beforeEach(function(){
                tools.ajaxInjected.auth = {signout: tools.ajax};
            });
            it('should signin a new user', function(done){
                var model = new Model();
                model.new();
                model.user('user');
                assert(!tools.ajax.calledOnce, 'no ajax call on create');
                model.signout();
                assert(tools.ajax.calledOnce, 'ajax call on signout');
                assert(model.user() === 'user');
                tools.ajaxPromise.resolve();
                tools.ajaxPromise.promise.then(function(){
                    assert(!model.user(), 'user signed out');
                    done();
                });
            });
        });
    });
});
