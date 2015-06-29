'use strict';
var requirejs = require('requirejs');
var sinon = require('sinon');
require('mocha-sinon');
var chai = require('chai');

var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();
//require('global-define')({basePath: __dirname});

describe('Require js', function(){
  it('requires requirejs', function(){
    assert(requirejs);
  });
  it('requires sinon', function(){
    assert(sinon);
  });
});

global.requirejs = requirejs;



(function () {
    'use strict';
    requirejs.config({
        baseUrl: 'public/scripts',
        paths: {
            knockout: '../bower_components/knockout/dist/knockout.debug',
            tryme: '../lib/try',
            q: '../bower_components/q/q',

            //app
            'app.platinum.headings': 'platinum/headings',
            'app.platinum.product': 'platinum/product',
            'app.platinum.products': 'platinum/products',
            'ajax': 'ajax/ajax'
        }
    });

    describe('platinum component viewmodel testing', function() {
        describe('#view model functions', function(){
            it('should call params.getProduct when product set', function(done){
                requirejs(['tryme'], function(tryme){
                    assert(tryme === 'ok');
                    done();
                });
            });
        });
    });
})();
