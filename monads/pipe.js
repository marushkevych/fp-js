
function pipe(f1, f2){
	return function (){
		return f2(f1.apply(null, arguments));
	};
}


function runMultipleQueries(queries) {
	var results = [];
	queries.forEach(doQuery);
	return results;

	function doQuery(query) {
		var pr = getData(query)
		pr.then(results.push.bind(results));
		// pr.resolve();
	}
}

function log(value) {
	console.log(value);
}


function getData(query){
	var result;
	var promise = {
		then: function(f){
			this.f = f;
			if(result) f(result)
		},
		resolve: function(){
			result = query;
			if(this.f) this.f(result);
		}
	}
	// promise.resolve();

	return promise;
}

runMultipleQueries([1,2,3,4]).forEach(log);



angular.module('product', []).controller('ProductCtrl', function ProductCtrl($http, $q) {

	var vm = this;

	function loadProduct(productId) {
		return $http.get('/api/product/' + productId).success(function (productData) {
			return $http.get('/api/productReviews/' + productId).success(function (productReviews) {
				return {
					product: productData,
					reviews: productReviews
				};
			});
		});
	}

	loadProduct(1).then(function (product) {
		vm.product = product;
	});

});
