'use strict';

define([
    'knockout',
    'ajax'
], function(ko, ajax){
    var Auth = function(params) {
        this.item = ko.observable();
        this.user= ko.observable();
    };
    Auth.prototype.new = function(){
        this.item({
            username: ko.observable(),
            password: ko.observable()
        });
    };
    Auth.prototype.signin = function(){
        var self = this;
        ajax.auth.signin(this.item().username(), this.item().password())
            .then(function(user){
                self.user(user);
            });
        return this;
    };
    return Auth;
});
