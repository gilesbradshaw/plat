'use strict';
define( ['knockout'], function(ko){
   return function(params){
        this.params = params;
        this.value = ko.observable();
   };
});
