'use strict';

var rule = require('../rules/limit-num-destructured-arg-properties');
var RuleTester = require('eslint').RuleTester;

var ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 6 }});

ruleTester.run('limit-num-destructured-arg-properties', rule, {
    valid: [
        { code: 'function fn() {}' },
        { code: 'function fn({ prop1 }) {}' },
        { code: 'function fn({ prop1, prop2, prop3 }) {}' },
        { code: 'function fn({ prop1, prop2, prop3 }) {}', options: [{ max: 3 }] },
        { code: 'function fn({ prop1, prop2, prop3, prop4 }) {}', options: [{ max: 4 }] },

        { code: 'function fn([]) {}' },
        { code: 'function fn([,]) {}' },
        { code: 'function fn([[]]) {}' },
        { code: 'function fn([[], [], []]) {}' },
        { code: 'function fn([[], [], []]) {}', options: [{ max: 3 }] },
        { code: 'function fn([[], [], [], []]) {}', options: [{ max: 4 }] },
    ],
    invalid: [
        { code: 'function fn({ prop1, prop2, prop3, prop4 }) {}', errors: [{ message: 'Can not destructure more than 3 properties for an arg' }] },
        { code: 'function fn({ prop1, prop2, prop3 }) {}', options: [{ max: 2 }], errors: [{ message: 'Can not destructure more than 2 properties for an arg' }] },
        { code: 'function fn({ prop1, prop2, prop3, prop4 }) {}', options: [{ max: 3 }], errors: [{ message: 'Can not destructure more than 3 properties for an arg' }] },

        { code: 'function fn([[], [], [], []]) {}', errors: [{ message: 'Can not destructure more than 3 properties for an arg' }] },
        { code: 'function fn([[], [], []]) {}', options: [{ max: 2 }], errors: [{ message: 'Can not destructure more than 2 properties for an arg' }] },
        { code: 'function fn([[], [], [], []]) {}', options: [{ max: 3 }], errors: [{ message: 'Can not destructure more than 3 properties for an arg' }] },
    ]
});
