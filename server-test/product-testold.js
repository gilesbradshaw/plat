'use strict';
describe('product', function() {
    var tools;
    beforeEach(function(done){
        requirejs(['testTools'], function(_tools){
            tools = _tools();
            done();
        });
    });
    describe('component', function() {
        // Load modules with requirejs before tests
        var ViewModel;
        beforeEach(function(done) {
            tools.injector.require(['components/productold/viewModel'], function(_ViewModel) {
                ViewModel = _ViewModel;
                done(); // We can launch the tests!
            });
        });
        it('should set params to constructor parameter', function(){
            assert((new ViewModel('params')).params === 'params');
        });
        it('should call get parameters when product set and set parameters to result', function(done){
            tools.ajaxInjected.parameters = {list: tools.ajax};
            var product = {name: 'prod'};
            var viewModel = new ViewModel();
            viewModel.product(product);
            assert(tools.ajax.calledOnce, 'get Parameters called');
            assert(tools.ajax.args[0][0] === product, 'getproduct called with product');
            tools.ajaxPromise.resolve('parameters');
            tools.ajaxPromise.promise.then(function(){
                assert(viewModel.parameters() === 'parameters', 'parameters set');
                done();
            });
        });
        it('should post a product when getProduct called and set items to result', function(done){
            tools.ajaxInjected.product = {post: tools.ajax};
            var product = {name: 'prod'};
            var viewModel = new ViewModel();
            viewModel.getProduct(product)();
            assert(tools.ajax.calledOnce, 'post product called');
            assert(tools.ajax.args[0][0] === product, 'post product called with product');
            tools.ajaxPromise.resolve('items');
            tools.ajaxPromise.promise.then(function(){
                assert(viewModel.items() === 'items', 'items set');
                done();
            });
        });
    });
});
