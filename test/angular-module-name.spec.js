'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../rules/angular-module-name');
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
eslintTester.run('angular-module-name', rule, {
    valid: [
    {
        filename: 'anything.js',
        code: 'angular.module("anything", []);'
    },
    {
        filename: 'something.filter.js',
        code: 'angular.module("something", []);'
    },
    {
        filename: 'camelCase.js',
        code: 'angular.module("camelCase", []);'
    },
    {
        filename: 'spinal-case.directive.js',
        code: 'angular.module("spinal-case", []);'
    },
    {
        filename: 'some/dir/spinal-case.directive.js',
        code: 'angular.module("some.dir.spinal-case", []);'
    },
    {
        filename: 'some/dir/camelCase.directive.js',
        code: 'angular.module("some.dir.camelCase", []);'
    },
    {
        filename: 'some/dir/camelCase.directive.js',
        code: 'angular.module("dir.camelCase", []);',
        options: [{ basePath: 'some' }],
    },
    {
        filename: 'camelCase.directive.js',
        code: 'angular.module("camelCase", []);',
        options: [{ basePath: 'some' }],
    },
    ].concat(commonFalsePositives),
    invalid: [

{
        filename: 'anything.js',
        code: 'angular.module("any-thing", []);',
        errors: [{message: 'Module name must be "anything"'}]
    },
    {
        filename: 'something.filter.js',
        code: 'angular.module("something.filter.js", []);',
        errors: [{message: 'Module name must be "something"'}]
    },
    {
        filename: 'camelCase.js',
        code: 'angular.module("camelCasi", []);',
        errors: [{message: 'Module name must be "camelCase"'}]
    },
    {
        filename: 'spinal-case.directive.js',
        code: 'angular.module("spinalcase", []);',
        errors: [{message: 'Module name must be "spinal-case"'}]
    },
    {
        filename: 'some/dir/spinal-case.directive.js',
        code: 'angular.module("some.dr.spinal-case", []);',
        errors: [{message: 'Module name must be "some.dir.spinal-case"'}]
    },
    ]
});