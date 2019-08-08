'use strict';

var rule = require('../rules/limit-destructured-arg-depth');
var RuleTester = require('eslint').RuleTester;

var ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 6 }});

ruleTester.run('limit-destructured-arg-depth', rule, {
    valid: [
        { code: 'function fn() {}' },
        { code: 'function fn({}) {}' },
        { code: 'function fn({}, {}, []) {}' },
        { code: 'function fn({}) {}', options: [{ max: 1 }] },
        { code: 'function fn({ cat: {} }, {}) {}', options: [{ max: 2 }] },


        { code: 'function fn() {}' },
        { code: 'function fn([]) {}' },
        { code: 'function fn([,]) {}' },
        { code: 'function fn([]) {}', options: [{ max: 1 }] },
        { code: 'function fn([[hi]]) {}', options: [{ max: 2 }] },
    ],
    invalid: [
        { code: 'function fn({ cat: {} }) {}', errors: [{ message: 'Can only destructure arguments at most 1 level deep' }] },
        { code: 'function fn({ cat: {} }) {}', options: [{ max: 1}], errors: [{ message: 'Can only destructure arguments at most 1 level deep' }] },
        { code: 'function fn({ cat: { dog: {} } }, {}) {}', options: [{ max: 2 }], errors: [{ message: 'Can only destructure arguments at most 2 levels deep' }] },


        { code: 'function fn([[cat]]) {}', errors: [{ message: 'Can only destructure arguments at most 1 level deep' }] },
        { code: 'function fn([[cat]]) {}', options: [{ max: 1 }], errors: [{ message: 'Can only destructure arguments at most 1 level deep' }] },
        { code: 'function fn([[[cat]]]) {}', options: [{ max: 2 }], errors: [{ message: 'Can only destructure arguments at most 2 levels deep' }] },
    ]
});
