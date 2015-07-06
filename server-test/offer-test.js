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
        var headings;
        beforeEach(function(done) {
            headings = sinon.stub();
            tools.injector.mock('app.platinum.headings', headings);
            tools.injector.mock('ajax', {sbv: {get: tools.ajax}});
            tools.injector.require(['components/offer/viewModel'], function(_Model) {
                Model = _Model;
                done();
            });
        });
        it('should set params to constructor parameter', function(){
            tools.ajaxInjected.products = {post: tools.ajax};
            var viewModel = new Model('params');
            assert(viewModel.params === 'params');
        });
        it('should create headings', function(){
            new Model(); /*eslint no-new:0 */
            assert(headings.calledOnce);
        });
        it('should get sbv when sbvid set', function(done){
            var model = new Model(1);
            assert(tools.ajax.callCount === 1, 'get sbv ajax called');
            tools.ajaxPromise.resolve('sbvtest');
            tools.ajaxPromise.promise.then(function(){
                assert(model.sbv() === 'sbvtest', 'sbv set');
                done();
            });
        });
    });
});
