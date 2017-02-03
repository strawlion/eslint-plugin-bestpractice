'use strict';

const utils = require('../utils/utils');

module.exports = {
    meta: {
        docs: {
            description: 'enforce maximum number of destructured arguments',
            category: 'ECMAScript 6',
            recommended: false,
        },
        schema: [
            {
                type: 'object',
                properties: {
                    max: {
                        type: 'number',
                    }
                },
                additionalProperties: false,
            }
        ]
    },
    create,
};


function create(context) {
    const options = context.options[0] || { max: 1 };

    return {
        FunctionDeclaration: validateMaxNumDestructuredArgs,
        FunctionExpression: validateMaxNumDestructuredArgs,
        ArrowFunctionExpression: validateMaxNumDestructuredArgs,
    };

    function validateMaxNumDestructuredArgs(node) {
        const numDestructuredParams = getNumDestructuredArgs(node);
        if (numDestructuredParams <= options.max) {
            return;
        }

        const errorMessage = options.max ? `Can only destructure at most ${options.max} parameter${options.max === 1 ? '': 's'}`
                                         : 'Can not use destructuring for function parameters';
        context.report(node, errorMessage);
    }

    function getNumDestructuredArgs(node) {
        return node.params.filter(utils.isObjectOrArrayPattern).length;
    }

}