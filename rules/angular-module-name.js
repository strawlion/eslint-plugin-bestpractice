
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
        if (!angularUtils.isAngularModuleDeclaration(node) || !context.getFilename().includes(options.basePath)) {
            return;
        }

        const moduleName = node.arguments[0].value;

        const filePath = path.relative(options.basePath, context.getFilename());
        const filePathInfo = path.parse(filePath)
        const directoryPortion = filePathInfo.dir.split('/').join('.');
        const expectedModuleName = `${directoryPortion}${directoryPortion.length ? '.' : '' }${filePathInfo.base.split('.')[0]}`;
        if (moduleName !== expectedModuleName) {
            context.report(node, `Module name must be "${expectedModuleName}"`);
        }

    }
};