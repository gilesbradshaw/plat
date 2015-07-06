'use strict';
describe('platinum compare and select', function() {
    var tools;
    beforeEach(function(done){
        requirejs(['testTools'], function(_tools){
            tools = _tools();
            done();
        });
    });
    describe('component', function() {
        var ViewModel;
        beforeEach(function(done) {
            tools.injector.mock('app.platinum.headings', sinon.spy());
            tools.injector.require(['components/compare-and-select/viewModel'], function(_ViewModel) {
                ViewModel = _ViewModel;
                done();
            });
        });
        it('should set params to constructor parameter and get products', function(done){
            tools.ajaxInjected.products = {post: tools.ajax};
            var viewModel = new ViewModel('params');
            assert(viewModel.params === 'params');
            tools.ajaxPromise.resolve('products');
            tools.ajaxPromise.promise.then(function(){
                assert(viewModel.products() === 'products', 'products set');
                done();
            });
        });
        it('should create three product categories when created', function(){
              tools.ajaxInjected.products = {post: tools.ajax};
              var model = new ViewModel();
              assert(model.categories().length === 3, 'three product categories created');
        });

        it('should post get products when refreshed then create products', function(done){
            tools.ajaxInjected.products = {post: tools.ajax};
            var viewModel = new ViewModel('params');
            var a = new tools.Ajax();
            tools.ajaxInjected.products = {post: a.ajax};
            viewModel.refresh();
            a.promise.resolve('products');
            a.promise.promise.then(function(){
                assert(viewModel.products() === 'products', 'products set');
                done();
            });
        });
    });
});
