'use strict';
//headings view model - fetches headings for products - what each row represents.

define(['ajax', 'knockout'], function(ajax, ko){
    var viewModel = function(){
        this.headings = ko.observableArray();
        this.getHeadings();
    };
    viewModel.prototype.getHeadings = function(){
        var self = this;
        ajax.headings.post().then( function(data){
            self.headings(data);
        });
    };
    return viewModel;
});
