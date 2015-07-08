'use strict';

define(
    [
        'knockout'
    ],
    function(ko){
        function ViewModel(params){
            this.params = params;
            this.item = ko.observable();
            this.items = ko.observableArray();
            this.id = ko.observable();
        }

        ViewModel.prototype.refresh = function(func){
            var self = this;
            (func ? func() : this.ajax.list())
                .then(function(items){
                    self.items(items);
                });
            return this;
        };
        ViewModel.prototype.post = function(item){
            var self = this;
            return function(){
                self.ajax.post(item())
                    .then(function(posted){
                        self.item(posted);
                        self.refresh();
                    });
            };
        };
        ViewModel.prototype.get = function(id){
            var self = this;
            return function(){
                self.ajax.get(id)
                    .then(function(got){
                        self.item(got);
                    });
            };
        };
        ViewModel.prototype.put = function(item){
            var self = this;
            return function(){
                self.ajax.put(item())
                    .then(function(put){
                        self.item(put);
                        self.refresh();
                    });
            };
        };
        ViewModel.prototype['delete'] = function(item){ /* eslint dot-notation: 0*/
            var self = this;
            return function(){
                self.ajax['delete'](item) /* eslint dot-notation: 0*/
                    .then(function(){
                        self.refresh();
                    });
            };
        };
        return ViewModel;
    }
);
