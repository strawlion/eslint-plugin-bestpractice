'use strict';

const utils = require('../utils/utils');

module.exports = {
    meta: {
        docs: {
            description: 'enforce maximum number of properties for destructured arguments',
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
    const options = context.options[0] || { max: 3 };

    return {
        FunctionDeclaration: validateMaxNumDestructuredArgs,
        FunctionExpression: validateMaxNumDestructuredArgs,
        ArrowFunctionExpression: validateMaxNumDestructuredArgs,
    };

    function validateMaxNumDestructuredArgs(node) {
        const maxNumDestructuredArgParams = getMaxNumDestructuredArgProperties(node);
        if (maxNumDestructuredArgParams <= options.max) {
            return;
        }

        context.report(node, `Can not destructure more than ${options.max} ${options.max === 1 ? 'property' : 'properties' } for an arg`);
    }

    function getMaxNumDestructuredArgProperties(node) {
        const childNodes = node.params || node.elements || node.properties;
        const depths = childNodes.filter(utils.isObjectOrArrayPattern)
                               .map(getMaxNumDestructuredArgProperties);
        const numDestructuredArgProperties = node.params ? 0 : childNodes.length;

        return Math.max(...depths, numDestructuredArgProperties);
    }

}