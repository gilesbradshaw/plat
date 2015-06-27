'use strict';

//mocks http requests.
define([], function(){
    var mockHttp = {
        sbv: function(sbvid, server){
            server = mockHttp.server || server;
            if(server)
            {
                var respondData = {
                        name: 'sbv',
                        id: 1
                    };
                server.respondWith(
                    'GET',
                    '/sbv/' + sbvid,
                    [
                        200,
                        {
                            'Content-Type': 'application/json'
                        },
                        JSON.stringify(respondData)
                    ]);
                server.respond();
            }
        },
        headings: function(server){
            server = mockHttp.server || server;
            if(server)
            {
                var respondData = [
                    {
                        name: 'Heading1',
                        id: 1
                    },
                    {
                        name: 'Heading2',
                        id: 2
                    }
                ];
                server.respondWith(
                    'POST',
                    '/headings',
                    [
                        200,
                        {
                            'Content-Type': 'application/json'
                        },
                        JSON.stringify(respondData)
                    ]);
                server.respond();
            }
        },
        products: function(name, server){
            server = mockHttp.server || server;
            if(server)
            {
                var respondData = [
                    {
                        name: 'P1_' + name,
                        id: 1
                    },
                    {
                        name: 'P2_' + name,
                        id: 2
                    }
                ];
                server.respondWith(
                    'POST',
                    '/products/' + name,
                    [
                        200,
                        {
                            'Content-Type': 'application/json'
                        },
                        JSON.stringify(respondData)
                    ]);
                server.respond();
            }
        },
        product: function(product, server){
            server = mockHttp.server || server;
            if(server)
            {
                var respondData = [
                    {
                        name: 'V1_' + product.name,
                        id: 1
                    },
                    {
                        name: 'V2_' + product.name,
                        id: 2
                    }
                ];
                server.respondWith(
                    'POST',
                    '/product',
                    [
                        200,
                        {
                            'Content-Type': 'application/json'
                        },
                        JSON.stringify(respondData)
                    ]);
                server.respond();
            }
        }
    };
    return mockHttp;
});
