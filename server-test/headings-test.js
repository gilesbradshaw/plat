'use strict';
describe('headings', function() {
    var tools;
    beforeEach(function(done){
        requirejs(['testTools'], function(_tools){
            tools = _tools();
            done();
        });
    });
    describe('view model', function() {
        // Load modules with requirejs before tests
        var Model;
        beforeEach(function(done) {
            tools.injector.mock('ajax', {headings: {post: tools.ajax}});
            tools.injector.require(['platinum/headings'], function(_Model) {
                Model = _Model;
                done(); // We can launch the tests!
            });
        });

        it('should get headings', function(done){
            var model = new Model();
            var result = [1, 2];
            tools.ajaxPromise.resolve(result);
            tools.ajaxPromise.promise.then(function(){
                assert(model.headings() === result);
                done();
            });
        });
    });
});
