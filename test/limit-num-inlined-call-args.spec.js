'use strict';

var rule = require('../rules/limit-num-inlined-call-args');
var RuleTester = require('eslint').RuleTester;

var ruleTester = new RuleTester();

ruleTester.run('limit-num-inlined-call-args', rule, {
    valid: [
        { code: 'function fn() {}; fn();' },
        { code: 'function fn() {}; fn(fn());' },
        { code: 'function fn() {}; fn(fn());', options: [{ max: 0 }] },
        { code: 'function fn() {}; fn(fn(1));', options: [{ max: 1 }] },
        { code: 'function fn() {}; fn(fn(fn(1)));', options: [{ max: 1 }] },
        { code: 'function fn() {}; fn(fn(1), fn(1));', options: [{ max: 1 }] },
        { code: 'function fn() {}; fn(fn(1, 2));', options: [{ max: 2 }] },
    ],
    invalid: [
        { code: 'function fn() {}; fn(fn(1, 2));', errors: [{ message: 'Cannot inline function calls that contain more than 1 argument' }] },
        { code: 'function fn() {}; fn(fn(1));', options: [{ max: 0 }], errors: [{ message: 'Cannot inline function calls that contain more than 0 arguments' }] },
        { code: 'function fn() {}; fn(fn(1, 2));', options: [{ max: 0 }], errors: [{ message: 'Cannot inline function calls that contain more than 0 arguments' }] },
        { code: 'function fn() {}; fn(fn(1, 2));', options: [{ max: 1 }], errors: [{ message: 'Cannot inline function calls that contain more than 1 argument' }] },
        { code: 'function fn() {}; fn(fn(1, 2));', options: [{ max: 1 }], errors: [{ message: 'Cannot inline function calls that contain more than 1 argument' }] },
        { code: 'function fn() {}; fn(fn(fn(1, 2, 3)));', options: [{ max: 2 }], errors: [{ message: 'Cannot inline function calls that contain more than 2 arguments' }] },
    ]
});