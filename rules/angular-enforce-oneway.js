
'use strict';

const utils = require('../utils/utils');

module.exports = {
    meta: {
        docs: {
            description: 'enforce use of oneway bindings',
            category: 'Stylistic Issues',
            recommended: false,
        },
        schema: []
    },
    create,
};

function create(context) {

    return {
        Literal: validateIsOnewayBinding,
    };


    function validateIsOnewayBinding(node) {
        if (node.value === '<' ||
            utils.getNodeDepth(node) <= 8 ||
            getPropertyNode(node).type !== 'Property' ||
            (getDdoNode(node).key && getDdoNode(node).key.name !== 'scope') ||
            getReturnStatementNode(node).type !== 'ReturnStatement' ||
            (getDirectionDefinitionNode(node).type === 'CallExpression' && getDirectionDefinitionNode(node).callee.property.name !== 'directive')) {
            return;
        }
        context.report(node, `Directive properties must use oneway bindings, '<'`);
    }

    function getPropertyNode(node) {
        return node.parent;
    }

    function getDdoNode(node) {
        return getPropertyNode(node).parent.parent;
    }

    function getReturnStatementNode(node) {
        return getDdoNode(node).parent.parent;
    }

    function getDirectionDefinitionNode(node) {
        return getDdoNode(node).parent.parent.parent;
    }
}