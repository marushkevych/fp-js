// two args curry

function curry2(f){
	return function(a, b){
		if(a && b == null){
			return function(b){
				return f(a,b);
			}
		}

		return f(a,b)
	}
}

function multiply(a,b){
	return a*b;
}

var multiplyBy2 = curry2(multiply)(2);

// console.log(multiplyBy2(3))
// console.log(multiplyBy2(5))
// console.log(curry2(multiply)(2,4));

// CURRY ANY NUMBER OF ARGS
var unboundSlice = Array.prototype.slice;
var slice = Function.prototype.call.bind(unboundSlice);

function curry(f){
	return function(){
		var numberOfMissingArgs = f.length - arguments.length;


		if(numberOfMissingArgs > 0){
			var providedArgs = slice(arguments);
			return function(){
				var allArgs = [].concat(providedArgs, slice(arguments));
				console.log('all args', allArgs)
				return f.apply(null, allArgs);
			};

		}

		return f.apply(null, arguments);
	}
}

function concat(s1, s2, s3){
	return s1+s2+s3;
}

// console.log(concat('foo', 'bar', 'bla'));

// console.log(curry(concat)('foo')('bar', 'bla'));
// console.log(curry(concat)('foo','bar')('bla'));

function curryPLus(f){
	return function(){

		return doCurry(slice(arguments));

		// recurcive function
		function doCurry(providedArgs){
			var numberOfMissingArgs = f.length - providedArgs.length;
			
			if(numberOfMissingArgs > 0){
				console.log('called with', providedArgs);
				return function(){
					var allArgs = [].concat(providedArgs, slice(arguments));
					console.log('all args', allArgs)
					return doCurry(allArgs);
				};
			}

			return f.apply(null, providedArgs);
		}

	}
}


var concatWithFooBar = curryPLus(concat)('foo')('bar');
console.log(concatWithFooBar('bla'));

