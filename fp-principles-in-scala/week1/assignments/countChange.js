let Immutable = require('immutable');
let assert = require('assert');

// countChange(4, [1,2]) should return three combinations:
// 1+1+1+1
// 1+1+2
// 2+2
// assert.equal(3, countChange(4, [1,2]));

console.log('result', countChange(5, [3,1,2]));
console.log('result', countChange(100, [1,5,10,25]));


function countChange(money, coins) {

	const coinsList = Immutable.List(coins);

	var count = 0;

	iterate(money, Immutable.List());

	return count;

	function iterate(change, solution){

		if(change < 0){
			return;
		}

		if(change === 0) {
			console.log('solution', solution);
			count += 1;
			return;
		}

		loop(coinsList);
	
		// loop through coins array and try to append each coin to current solution
		function loop(list) {

			if(list.isEmpty()){
				return;
			}

			let head = list.first();

			// avoid duplicates by appending only values greater or equals
			if(solution.isEmpty() || solution.last() <= head){
				iterate(change - head, solution.push(head));
			}

			loop(list.rest());
		}
	}
}