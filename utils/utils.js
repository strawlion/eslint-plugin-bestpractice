module.exports = {
    isFunctionType,
    isObjectOrArrayPattern,
};


function isFunctionType(node) {
    return  node.type === 'FunctionDeclaration' ||
            node.type === 'FunctionExpression'  ||
            node.type === 'ArrowFunctionExpression';
}

function isObjectOrArrayPattern(node) {
    return  node.type === 'ObjectPattern' ||
            node.type === 'ArrayPattern';
}