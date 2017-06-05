'use strict';

module.exports = {
    rules: {
        'angular-enforce-oneway': require('./rules/angular-enforce-oneway'),
        'angular-match-filename': require('./rules/angular-match-filename'),
        'angular-module-name': require('./rules/angular-module-name'),
        'function-declaration-at-bottom': require('./rules/function-declaration-at-bottom'),
        'limit-call-depth': require('./rules/limit-call-depth'),
        'limit-destructured-arg-depth': require('./rules/limit-destructured-arg-depth'),
        'limit-num-destructured-arg-properties': require('./rules/limit-num-destructured-arg-properties'),
        'limit-num-destructured-args': require('./rules/limit-num-destructured-args'),
        'limit-num-inlined-call-args': require('./rules/limit-num-inlined-call-args')
    }
};
