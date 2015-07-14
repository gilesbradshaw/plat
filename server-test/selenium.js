'use strict';

// Use webdriverjs to create a Selenium Client
var client = require('webdriverjs').remote({
    desiredCapabilities: {
        // You may choose other browsers
        // http://code.google.com/p/selenium/wiki/DesiredCapabilities
        browserName: 'phantomjs'
    },
    // webdriverjs has a lot of output which is generally useless
    // However, if anything goes wrong, remove this to see more details
    logLevel: 'silent'
});

describe('Test example.com', function(){
    this.timeout(15000);
    before(function(done) {
        client.init().url('http://example.com', done);
    });

    describe('Check homepage', function(){
        it('should see the correct title', function(done) {
            client.getTitle(function(err, title){ /*eslint handle-callback-err:0*/
                expect(title).to.have.string('Example Domain');
                done();
            });
        });

        it('should see the body', function(done) {
            client.getText('p', function(err, p){
                expect(p).to.have.string(
                    'for illustrative examples in documents..'
                );
                done();
            });
        });
    });

    after(function(done) {
        client.end();
        done();
    });
});
