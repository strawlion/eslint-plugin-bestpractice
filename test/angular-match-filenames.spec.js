'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../rules/angular-match-filenames');
var RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------
const commonFalsePositives = [
    'describe("", function () { });',
    'it("", function() {})',
    'dump();inject();module();',
    '"use strict";angular.module("")',
    'mocha.run();',
    'controller = el.controller();',
    {code: 'angular.module("m", [])', filename: 'm.js'},
    {code: 'angular.module("").factory("s", function () {});', filename: 's.js'}
];


const eslintTester = new RuleTester();
eslintTester.run('angular-match-filenames', rule, {
    valid: [
    {
        filename: 'anything.js',
        code: 'angular.module("myModule", []);'
    }, 
    {
        filename: 'some.filter.js',
        code: 'app.filter("some", function() {});'
    }, 
    {
        filename: 'some.filter.js',
        code: `angular.module('some.filter', []).filter("some", function() {});`
    }, 
    {
        // basic controller
        filename: 'SomeController.js',
        code: 'app.controller("SomeController", function() {});'
    }, 
    {
        // basic controller
        filename: 'SomeController.js',
        code: `angular.module('some.controller', []).controller("SomeController", function() {});`
    }, 
    {
        // basic service
        filename: 'myUtils.js',
        code: 'app.service("myUtils", function() {});'
    },
    {
        // basic service
        filename: 'myUtils.js',
        code: `angular.module('some.module', []).service("myUtils", function() {});`
    },
    {
        // basic factory service
        filename: 'myUtils.js',
        code: 'app.factory("myUtils", function() {});'
    }, 
    {
        // basic service
        filename: 'myUtils.js',
        code: `angular.module('some.module', []).factory("myUtils", function() {});`
    },
    {
        // basic directive
        filename: 'beautiful.component.js',
        code: 'app.directive("beautiful", function() {});'
    },
    {
        // basic directive
        filename: 'beautiful.component.js',
        code: 'angular.module("some.module", []).directive("beautiful", function() {});'
    }, 
    {
        // basic component
        filename: 'beautiful.component.js',
        code: 'app.component("beautifulComponent", {});'
    }, 
    {
        // basic directive
        filename: 'beautiful.component.js',
        code: 'angular.module("some.module", []).component("beautiful", function() {});'
    },
    {
        filename: 'beautiful.component.js',
        code: 'angular.module("some.module", []).component("beautiful", function() {}).component("notBeautiful", function() {})',
    },
    {
        filename: 'notBeautiful.component.js',
        code: 'angular.module("some.module", []).component("beautiful", function() {}).component("notBeautiful", function() {})',
    },
    ].concat(commonFalsePositives),
    invalid: [{
        filename: 'src/app/filters.js',
        code: 'app.filter("something", function() {});',
        errors: [{message: 'Filename must be "something.filter.js"'}]
    },
    {
        filename: 'src/app/notSomething.directive.js',
        code: 'app.directive("something", function() {});',
        errors: [{message: 'Filename must be "something.component.js"'}]
    }, 
    {
        filename: 'src/app/notSomething.directive.js',
        code: `app.directive("something", function() {}).directive('someOtherThing', function() {})`,
        errors: [{message: 'Filename must be one of "something.component.js", "someOtherThing.component.js"'}]
    }, 
    {
        filename: 'src/app/notSomething.directive.js',
        code: 'app.component("something", function() {});',
        errors: [{message: 'Filename must be "something.component.js"'}]
    }, 
    {
        filename: 'src/app/notSomething.directive.js',
        code: `angular.module('something').component("something", function() {});`,
        errors: [{message: 'Filename must be "something.component.js"'}]
    }, 
    ]
});