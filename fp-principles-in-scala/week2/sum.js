
const R = require('ramda');

// take the range of integers between a and b and summ the results of function applied to each integer
const sum =  R.curry((f, a, b) => {

	return loop(0, a);

	function loop(acc, a){
		if(a > b){
			return acc;
		}
		return loop(acc + f(a), a + 1); 
	}
});



const sumInts = sum(x => x);
const sumSquares = sum(x => x * x);
const sumCubes = sum(x => x * x * x);

console.log(sumInts(1, 4));
console.log(sumSquares(1, 4));
console.log(sumCubes(1, 4));
