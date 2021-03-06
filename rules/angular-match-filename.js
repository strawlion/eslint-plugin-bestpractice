'use strict';

const path = require('path');

const angularUtils = require('../utils/angular-utils');


'use strict';

module.exports = {
    meta: {
        docs: {
            description: 'enforce naming files after contained angular components',
            category: 'Stylistic Issues',
            recommended: false,
        },
        schema: []
    },
    create,
};

const fileEnding = '.js';
const componentTypeToSuffix = {
    directive: 'component',
    component: 'component',
    filter: 'filter',
};

const validComponentSet = new Set(['directive', 'component', 'factory', 'service', 'filter', 'value', 'constant', 'controller']); 

function create(context) {
    const filename = path.basename(context.getFilename());

    let componentInfos = [];
    return {
        CallExpression: gatherAngularComponentInfos,
        'Program:exit': validateFilename,
    };

    function validateFilename(node) {

        if (componentInfos.length && componentInfos.every(doesNotMatchFilename)) { 
            const expectedNames = componentInfos.reverse().map(component => `"${component.expectedName}"`);
            context.report(node, `Filename must be${expectedNames.length > 1 ? ' one of ' : ' ' }${expectedNames.join(', ')}`);
        }

        componentInfos = [];
    }

    function doesNotMatchFilename(componentInfo) {
        return componentInfo.expectedName !== filename;
    }

    function gatherAngularComponentInfos(node) {
        if (!angularUtils.isAngularComponent(node) || !angularUtils.isMemberExpression(node.callee) || !validComponentSet.has(node.callee.property.name)) {
            return;
        }

        const componentName = node.arguments[0].value;
        const componentType = componentTypeToSuffix[node.callee.property.name];

        componentInfos.push({
            expectedName: componentName + (componentType ? `.${componentType}` : '') + fileEnding,
            name: componentName,
            node,
        });
    }
};