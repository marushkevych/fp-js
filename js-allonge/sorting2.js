var Q = require('q');

function sort(arr, sorted){
	sorted = sorted || [];
	if(arr.length == 0) return Q.when(sorted);

	var deferred = Q.defer();

	setTimeout(function () {
		insert(sorted, arr.pop());
		deferred.resolve(sort(arr, sorted));
	}, 0)

	return deferred.promise;
}

// just an example
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
for(var i=10000; i>0; i--){
	arr.push(i);
}
sort(arr).then(function(sorted){
	console.log(sorted);
});
// console.log(arr.sort())
