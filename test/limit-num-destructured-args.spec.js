'use strict';

var rule = require('../rules/limit-num-destructured-args');
var RuleTester = require('eslint').RuleTester;

var ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 6 }});

ruleTester.run('limit-num-destructured-args', rule, {
    valid: [
        { code: 'function fn() {}' },
        { code: 'function fn({}) {}' },
        { code: 'function fn({}) {}', options: [{ max: 1 }] },
        { code: 'function fn({}, {}) {}', options: [{ max: 2 }] },

        { code: 'function fn() {}' },
        { code: 'function fn([]) {}' },
        { code: 'function fn([]) {}', options: [{ max: 1 }] },
        { code: 'function fn([], []) {}', options: [{ max: 2 }] },
    ],
    invalid: [
        { code: 'function fn({}) {}', options: [{ max: 0 }], errors: [{ message: 'Can not use destructuring for function parameters' }] },
        { code: 'function fn({}, {}) {}', options: [{ max: 1 }], errors: [{ message: 'Can only destructure at most 1 parameter' }] },

        { code: 'function fn([]) {}', options: [{ max: 0 }], errors: [{ message: 'Can not use destructuring for function parameters' }] },
        { code: 'function fn([], []) {}', options: [{ max: 1 }], errors: [{ message: 'Can only destructure at most 1 parameter' }] },
    ]
});