(function () {
    'use strict';
    requirejs.config({
        baseUrl: 'public/scripts',
        paths: {
            knockout: '../bower_components/knockout/dist/knockout.debug',
            squirejs: 'lib/Squire',
            q: '../bower_components/q/q',
            testTools: '../../server-test/tools/tools',
            'app.component.ViewModel': 'components/ViewModel'
        }
    });
})();
