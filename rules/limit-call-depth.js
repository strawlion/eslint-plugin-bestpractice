'use strict';

module.exports = {
    meta: {
        docs: {
            description: 'enforce maximum number of inlined function calls',
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
        CallExpression: validateCallExpressionDepth,
    };

    function validateCallExpressionDepth(node) {
        var expressionDepth = getCallExpressionDepth(node);
        if (expressionDepth > options.max) {
            context.report(node, `Can only nest up to ${options.max} function call${options.max === 1 ? '' : 's'}`);
        }
    }

    function getCallExpressionDepth(node) {
        let currentNode = node.parent;
        let numCallExpressions = 0;
        while (currentNode) {
            if (!isCallExpression(currentNode)) {
                break;
            }
            numCallExpressions++;
            currentNode = currentNode.parent;
        }
        return numCallExpressions;
    }

    function isCallExpression(node) {
        return node.type === 'CallExpression';
    }
}