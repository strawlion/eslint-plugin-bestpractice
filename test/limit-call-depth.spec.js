'use strict';

var rule = require('../rules/limit-call-depth');
var RuleTester = require('eslint').RuleTester;

var ruleTester = new RuleTester();

ruleTester.run('limit-call-depth', rule, {
    valid: [
        { code: 'function fn() {}; fn();' },
        { code: 'function fn() {}; fn();', options: [{ max: 0 }] },
        { code: 'function fn() {}; fn();', options: [{ max: 1 }] },
        { code: 'function fn() {}; fn(fn());', options: [{ max: 1 }] },
        { code: 'function fn() {}; fn(fn(), fn());', options: [{ max: 1 }] },
        { code: 'function fn() {}; fn(fn(fn()));', options: [{ max: 2 }] },
        { code: 'function fn() {}; fn(5, fn(fn()));', options: [{ max: 2 }] },
        { code: 'var obj = { fn: function () {} }; obj.fn()', options: [{ max: 0 }] },
    ],
    invalid: [
        { code: 'function fn() {}; fn(fn());', options: [{ max: 0 }], errors: [{ message: 'Can only nest up to 0 function calls' }] },
        { code: 'function fn() {}; fn(fn(fn()));', options: [{ max: 0 }], errors: [{ message: 'Can only nest up to 0 function calls' }, { message: 'Can only nest up to 0 function calls' }] },
        { code: 'function fn() {}; fn(fn(), fn());', options: [{ max: 0 }], errors: [{ message: 'Can only nest up to 0 function calls' }, { message: 'Can only nest up to 0 function calls' }] },
        { code: 'function fn() {}; fn(fn(fn()));', options: [{ max: 1 }], errors: [{ message: 'Can only nest up to 1 function call' }] },
        { code: 'function fn() {}; fn(fn(fn(fn())));', options: [{ max: 2 }], errors: [{ message: 'Can only nest up to 2 function calls' }] },
        { code: 'function fn() {}; fn(5, fn(fn(fn())));', options: [{ max: 2 }], errors: [{ message: 'Can only nest up to 2 function calls' }] },
    ]
});