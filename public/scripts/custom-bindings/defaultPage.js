'use strict';
define(['knockout'], function(ko){
    ko.virtualElements.allowedBindings.defaultPage = true;
    ko.bindingHandlers.defaultPage = {
        init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext){
            var visibleChildPages = ko.pureComputed(function(){
                return bindingContext.$page.isVisible() && bindingContext.$page.children().reduce(function(prev, current){
                    return prev || (current.isVisible() && !current.val('isSubDefault'));
                }, false);
            });
            return ko.bindingHandlers.ifnot.init(element, function(){ return visibleChildPages; }, allBindingsAccessor, viewModel, bindingContext);
        }
    };
});
