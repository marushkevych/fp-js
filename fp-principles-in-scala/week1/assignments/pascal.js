
function pascal(col, row) {


	if(col === 0 || row === col){
		return 1;
	}

	return pascal(col-1, row-1) + pascal(col, row-1);

}


console.log(pascal(0,2))
console.log(pascal(1,2))
console.log(pascal(1,3))
console.log(pascal(2,4))