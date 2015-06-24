'use strict';

define(['jquery', 'knockout'], function($, ko){
    var viewModel = {
        ok: ko.observable('ok!!!'),
        result: ko.observable(),
        get: function(id){
            $.ajax({
                method: 'POST',
                data: 'Data',
                url: '/todo/' + id + '/items',
                success: function (data) {
                    viewModel.result(data);
                }
            });
        }
    };
    return viewModel;
});
