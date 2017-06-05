module.exports = {
    isFunctionType,
    isObjectOrArrayPattern,
    getNodeDepth,
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

function getNodeDepth(node) {
    var depth = 0;
    var parent = node.parent;
    while (parent) {
        depth++
        parent = parent.parent;
    }
    return depth;
}