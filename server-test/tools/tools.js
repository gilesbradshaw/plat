'use strict';

define([
    'q',
    'squirejs'
], function(Q, Squire){
    return function(){
        var ret = {
            Ajax: function(){
                this.promise = Q.defer();
                this.ajax = sinon.stub().returns(this.promise.promise);
            },
            injector: new Squire()
        };
        var a = new ret.Ajax();
        ret.ajaxPromise = a.promise;
        ret.ajax = a.ajax;
        ret.ajaxInjected = {};
        ret.injector.mock('ajax', ret.ajaxInjected);
        return ret;
    };
});
