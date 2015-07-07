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
        // Load modules with requirejs before tests
        var ViewModel;
        beforeEach(function(done) {
            tools.injector.require(['components/categoryold/viewModel'], function(_ViewModel) {
                ViewModel = _ViewModel;
                done(); // We can launch the tests!
            });
        });
        it('should set params to constructor parameter', function(){
            assert((new ViewModel('params')).params === 'params');
        });
        it('should have an observable category', function(){
            assert((new ViewModel('params')).category);
            console.log('look into this!!!!!');
            //assert(ko.isObservable((new ViewModel('params')).category));
        });
        it('should filter products by category', function(){
            var model = new ViewModel({
                products: function(){
                    return [
                        {category: 'cat'},
                        {category: 'cat1'}
                    ];
                }
            });
            assert(model.products().length === 0);
            model.category('cat');

            assert(model.products().length === 1);
            assert(model.products()[0].category === 'cat');
        });
    });
});
