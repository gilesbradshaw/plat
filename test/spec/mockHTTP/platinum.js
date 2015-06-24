'use strict';

define([], function(){
    return function(server){
        var respondData = [
            {
                name: 'hey1',
                id: 1
            },
            {
                name: 'hey',
                id: 2
            }
        ];
        server.respondWith(
            'POST',
            '/todo/42/items',
            [
                200,
                {
                    'Content-Type': 'application/json'
                },
                JSON.stringify(respondData)
            ]);
        server.respond();
    };
});
