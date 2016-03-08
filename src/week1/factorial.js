function factorial(n, acc = 1) {
    "use strict";
    if (n <= 1) 
    	return acc;
    else
    	return factorial(n - 1, n * acc);
}

// Stack overflow in most implementations today,
// but safe on arbitrary inputs in ES2015
console.log(factorial(4))