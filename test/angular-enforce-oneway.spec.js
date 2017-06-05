'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../rules/angular-enforce-oneway');
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
eslintTester.run('angular-enforce-oneway', rule, {
    valid: [
    {
        code: 'angular.module("anything", []).directive("someDirective", function () { return { scope: { property: "<" } } });',
    },
    {
        code: 'function doSomething() { return { scope: { property: "=" } }; }',
    },
    {
        code: 'var someVar = { scope: { property: "=" } };',
    }
    ].concat(commonFalsePositives),
    invalid: [
    {
        code: 'angular.module("anything", []).directive("someDirective", function () { return { scope: { property: "=" } } });',
        errors: [{message: 'Directive properties must use oneway bindings, \'<\''}]
    },
    {
        code: 'angular.module("anything", []).directive("someDirective", function () { return { scope: { property: "&" } } });',
        errors: [{message: 'Directive properties must use oneway bindings, \'<\''}]
    },
    {
        code: 'angular.module("anything", []).directive("someDirective", function () { return { scope: { property: "@" } } });',
        errors: [{message: 'Directive properties must use oneway bindings, \'<\''}]
    },
    // {
    //     filename: 'anything.js',
    //     code: 'angular.module("any-thing", []);',
    //     errors: [{message: 'Module name must be "anything" to match folder hierarchy'}]
    // },
    ]
});