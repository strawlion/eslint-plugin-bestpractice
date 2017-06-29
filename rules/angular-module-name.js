
'use strict';

const path = require('path');

const angularUtils = require('../utils/angular-utils');


'use strict';

module.exports = {
    meta: {
        docs: {
            description: 'enforce naming modules after folder path to file',
            category: 'Stylistic Issues',
            recommended: false,
        },
        schema: [
            {
                type: 'object',
                properties: {
                    basePath: {
                        type: 'string',
                    }
                },
                additionalProperties: false,
            }
        ]
    },
    create,
};

function create(context) {
    const options = context.options[0] || { basePath: '' };

    return {
        CallExpression: gatherAngularModuleInfos,
    };

    function gatherAngularModuleInfos(node) {
        if (!angularUtils.isAngularModuleDeclaration(node) || !path.resolve(context.getFilename()).includes(options.basePath)) {
            return;
        }

        const moduleName = node.arguments[0].value;

        const filePath = path.relative(options.basePath, path.resolve(context.getFilename()));
        const filePathInfo = path.parse(filePath)
        const fileName = filePathInfo.base.split('.')[0];
        const directorySegments = filePathInfo.dir.split('/');

        // Ignore final containing folder if it matches component name. For example, someComponent/someComponent.component.js -> 'someComponent'
        const directoryEndIndex = directorySegments[directorySegments.length - 1] === fileName ? -1 : directorySegments.length;
        const directoryPortion = directorySegments.slice(0, directoryEndIndex).join('.');

        const expectedModuleName = `${directoryPortion}${directoryPortion.length ? '.' : '' }${fileName}`;
        if (moduleName !== expectedModuleName) {
            context.report(node, `Module name must be "${expectedModuleName}" to match folder hierarchy`);
        }

    }
};