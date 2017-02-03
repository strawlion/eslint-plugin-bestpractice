'use strict';

var rule = require('../rules/function-declaration-at-bottom');
var RuleTester = require('eslint').RuleTester;

var ruleTester = new RuleTester();

ruleTester.run('function-declaration-at-bottom', rule, {
    valid: [
        { code: 'function fn() {};' },
        { code: 'function fn() { return; function inner() {} };' },
        { code: 'function fn() { function inner() {} };' },
        { code: 'function fn() { return; function inner() { return; function innerInner(){} } }' },
    ],
    invalid: [
        { code: 'function fn() { function inner() {} return; };', errors: [{ message: 'Function declarations must be declared at the bottom of the containing scope' }] },
        { code: 'function fn() { function inner() {} var hi = 5; };', errors: [{ message: 'Function declarations must be declared at the bottom of the containing scope' }] },
        { code: 'function fn() { return; function inner() { function innerInner(){} return; } };', errors: [{ message: 'Function declarations must be declared at the bottom of the containing scope' }] },
    ]
});