'use strict';

define(['jquery', 'knockout', 'mockHttp'], function($, ko, mockHttp){
    var viewModel = function(){
        this.headings = ko.observableArray();
        this.getHeadings();
    };
    viewModel.prototype.getHeadings = function(){
        var self = this;
        $.ajax({
            method: 'POST',
            contentType: 'application/json',
            url: '/headings',
            success: function (data) {
                self.headings(data);
            }
        });
        mockHttp.headings();
    };
    return viewModel;
});
