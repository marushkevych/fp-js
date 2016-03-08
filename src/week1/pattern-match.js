var match = require('pattern-match');

var ast = {
    type: 'Return',
    callee: 'foo',
    args: [1,2],
    arg: 'argument'
};
 
match(ast, (when) => {
    when({
        type: 'FunctionCall',
        callee: match.var('callee'),
        args: match.var('args')
    }, ({ callee, args }) => {
        console.log('FunctionCall', callee, args);
    });
 
    when({
        type: 'Assignment',
        lhs: match.var('lhs'),
        rhs: match.var('rhs')
    }, ({ lhs, rhs }) => {
        console.log('Assignment', lhs, rhs);
    });
 
    when({
        type: 'Return',
        arg: match.var('arg')
    }, ({ arg }) => {
        console.log('Return', arg);
    });
});

