'use strict';

const utils = require('../utils/utils');

module.exports = {
    meta: {
        docs: {
            description: 'enforce maximum depth of destructured arguments',
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
        FunctionDeclaration: validateDestructuredArgDepth,
        FunctionExpression: validateDestructuredArgDepth,
        ArrowFunctionExpression: validateDestructuredArgDepth,
    };

    function validateDestructuredArgDepth(node) {
        const maxDestructuredArgDepth = getMaxDestructuredArgDepth(node);
        if (maxDestructuredArgDepth <= options.max) {
            return;
        }

        const errorMessage = options.max ? `Can only destructure arguments at most ${options.max} level${options.max > 1 ? 's': ''} deep`
                                         : 'Can not use destructuring for function parameters';
        context.report(node, errorMessage);
    }

    function getMaxDestructuredArgDepth(node) {
        const childNodes = node.params || node.elements || node.properties.map(property => property.value);
        var depths = childNodes.filter(utils.isObjectOrArrayPattern)
                               .map(getMaxDestructuredArgDepth);
        return (depths.length ? Math.max(...depths) : 0) + (node.params ? 0 :  1);
    }

}