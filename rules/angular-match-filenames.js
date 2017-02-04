'use strict';

const path = require('path');

const angularUtils = require('../utils/angular-utils');

module.exports = (function() {
    const fileEnding = '.js';
    const componentTypeToSuffix = {
        directive: 'component',
        component: 'component',
        filter: 'filter',
    };

    return function(context) {
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
            if (!angularUtils.isAngularComponent(node) || !angularUtils.isMemberExpression(node.callee)) {
                return;
            }
            
            const componentName = node.arguments[0].value;
            const componentType = componentTypeToSuffix[node.callee.property.name];
            if (!componentType) {
                return;
            }
            componentInfos.push({
                expectedName: componentName + '.' + componentType + fileEnding,
                name: componentName,
                type: componentType,
                node,
            });
        }
    };


}());