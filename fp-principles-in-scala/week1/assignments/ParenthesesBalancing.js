let Immutable = require('immutable');

console.log(balance('(if (zero? x) max (/ 1 x))'))
console.log(balance('I told him (that it’s not (yet) done). (But he wasn’t listening)'))
console.log(balance(':-)'))
console.log(balance('())('))


function balance(string){

	return loop(Immutable.List(string), 0);

	function loop(list, acc){
		if(acc < 0) return false; 

		if(list.isEmpty()) return acc === 0;

		return loop(list.rest(), acc + score(list.first()));
	}

}

function score(ch){
	switch(ch){
		case '(':
			return 1;
		case ')':
			return -1;
	}
	return 0;
}
