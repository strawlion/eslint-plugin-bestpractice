'use strict';

module.exports = {
    meta: {
        docs: {
            description: 'enforce placing function declarations at the bottom of the containing scope',
            category: 'Stylistic Issues',
            recommended: false,
        },
        schema: []
    },
    create,
};


function create(context) {

    return {
        FunctionDeclaration: validateFunctionDeclarationBelowReturn,
    };

    function validateFunctionDeclarationBelowReturn(node) {
        const siblingNodes = node.parent.body || [];

        if (!siblingNodes) {
            return;
        }

        let hasEncounteredNode = false;
        for (const siblingNode of siblingNodes) {
            if (siblingNode === node) {
                hasEncounteredNode = true;
            }

            if (hasEncounteredNode && siblingNode.type !== 'FunctionDeclaration' && siblingNode.type !== 'EmptyStatement') {
                context.report(node, 'Function declarations must be declared at the bottom of the containing scope');
                return;
            }
        }
    }


}