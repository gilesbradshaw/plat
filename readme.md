#Simple application using knockout

[![Build Status](https://travis-ci.org/gilesbradshaw/plat.svg)](https://travis-ci.org/gilesbradshaw/plat)

to test 
    
    gulp serve:test

to run 

    gulp serve


Knockout js http://knockoutjs.com/ lets you implement the MVVM design pattern.  https://en.wikipedia.org/wiki/Model_View_ViewModel

Routes implemented with pagerjs

Requirejs which is a package for Asynchronous Module Definition.  Basically that lets you divide code up into modules which get loaded asynchronously and it manages all the dependencies for you between modules.  http://requirejs.org/

MVVM separates the view model from the view.  The view model knows nothing about the view so you can write unit tests for it and you don’t end up mixing concerns – eg updating the dom + managing a list.

The view binds to the view model.  Knockout lets you create an observable view model that means the view automatically updates when the view model changes.  You can write computed observables which depend on multiple other observables and update when they change.  There are a number of bindings which come with knockout but you can also write custom bindings to do pretty much anything.  I wrote lots on a previous project.  Knockout also lets you make components – these are re usable html ‘widgets’ with their own view models.

View model for a product https://github.com/gilesbradshaw/plat/blob/master/app/scripts/platinum/product.js it fetches a list of products and when you select one fetches it.  It’s written as a class and uses the prototype so you can create multiple ones with “new” and inherit from it.

View model for the headings –  what each row in a product means https://github.com/gilesbradshaw/plat/blob/master/app/scripts/platinum/headings.js

A component (markup + view model to display a product (drop down + product display) https://github.com/gilesbradshaw/plat/tree/master/app/scripts/components/product

The main script it’s mocking a server (the ajax calls) https://github.com/gilesbradshaw/plat/blob/master/app/scripts/main.js 

This is the main html file – the markup has bindings in  to bind it to the view model.

https://github.com/gilesbradshaw/plat/blob/master/app/index.html


Unit tests which test the view models – they use sinonjs which lets you make spies, stubs and mocks.
https://github.com/gilesbradshaw/plat/blob/master/test/spec/test.js

Squire allows mocking of requirejs dependencies.
