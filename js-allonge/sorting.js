var Q = require('q');

function sort(arr){
	if(arr.length == 1){
		// throw new Error();
		return Q.when(arr);
	} 
	// console.log(arr);

	var deferred = Q.defer();

	setTimeout(function () {
		sort(arr.slice(1)).then(function(sorted){
			insert(sorted, arr[0]);
			deferred.resolve(sorted);
		});
	}, 0)

	// console.log('exiting', arr)
	return deferred.promise;
}

function insert(arr, item){
	for(var i = 0; i < arr.length; i++){
		if(item < arr[i]){
			arr.splice(i, 0, item);
			return;
		}
	}

	arr.push(item);
}

var arr = [];
for(var i=100000; i>0; i--){
	arr.push(i);
}
sort(arr).then(function(sorted){
	console.log(sorted);
});
// console.log(arr.sort())
