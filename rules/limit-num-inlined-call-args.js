'use strict';

module.exports = {
    meta: {
        docs: {
            description: 'enforce maximum number of arguments allowed to be supplied to inlined function calls',
            category: 'Stylistic Issues',
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
        CallExpression: validateMaxNumInlinedCallExpressionArgs,
    };

    function validateMaxNumInlinedCallExpressionArgs(node) {
        if (isCallExpression(node.parent) && node.arguments.length > options.max) {
            context.report(node, `Cannot inline function calls that contain more than ${options.max} argument${options.max === 1 ? '' : 's'}`);
        }
    }
    function isCallExpression(node) {
        return node.type === 'CallExpression';
    }
}