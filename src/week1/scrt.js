// square root
function scrt(x) {

	return improve(1);

	function improve(result) {
		console.log(result)
		let quotient = x / result;
		if(goodEnough(quotient, result)){
			return result;
		}
		return improve((result + quotient) / 2);
	}

	function goodEnough(a,b){
		var diff = Math.abs(a - b);
		return diff < 0.0001;
	}

}

console.log('final result', scrt(9))