const R = require('ramda');

/*
 * Working through aricle "Understanding Transducers in JavaScript"
 * https://medium.com/@roman01la/understanding-transducers-in-javascript-3500d3bd9624 
 */

// map implemented using reduce
//------------------------------
const mapReducer = f => (acc, value) => {
  acc.push(f(value))
  return acc
}

let res = [1,2,3,4,5].reduce(mapReducer(x => x + 1), [])
console.log(res)


// fiter implemented using reduce
//--------------------------------
const filterReducer = predicate => (acc, value) => {
  if(predicate(value)) {
    acc.push(value)
  }
  return acc
}

res = [1,2,3,4,5].reduce(filterReducer(x => x % 2 === 0), [])
console.log(res)


// Let’s extract reducing function, so it can be also passed from the outside:
//-----------------------------------------------------------------------------------

// reducing function
// acc -> value -> acc
const push = (acc, value) => {
  acc.push(value)
  return acc
}

const mapping = f => reducing => (acc, value) => {
  return reducing(acc, f(value))
}

res = [1,2,3,4,5].reduce(mapping(x => x + 1)(push), [])
console.log(res)

const filtering = predicate => reducing => (acc, value) => {
  if(predicate(value)) {
    return reducing(acc, value)
  }
  return acc
}

res = [1,2,3,4,5].reduce(filtering(x => x % 2 === 0)(push), [])
console.log(res)


// mapping and filtering have the same type.
// Now we can compose them by applying only filrst arg:
//---------------------------------------------------------
const incrementReducerFactory = mapping(x => x + 1)

const filterEvenReducerFactory = filtering(x => x % 2 === 0)

const incrementAndFilterEven = R.compose(incrementReducerFactory, filterEvenReducerFactory)

res = [1,2,3,4,5].reduce(incrementAndFilterEven(push), [])
console.log(res)

const filterEvenAndIncrement = R.compose(filterEvenReducerFactory, incrementReducerFactory)

res = [1,2,3,4,5].reduce(filterEvenAndIncrement(push), [])
console.log(res)


// Transducers
//------------
// transducer accepts a reducing function, and returns another reducing function
// reducing function has type: acc -> value -> acc

// incrementReducerFactory, filterEvenReducerFactory, incrementAndFilterEven, filterEvenAndIncrement are all transducers


const transduce = (transducer, reducing, initial, input) => R.reduce(transducer(reducing), initial, input);

console.log(transduce(incrementAndFilterEven, push, [], [1,2,3,4,5]))


// RAMDA
// In ramda, the transducer is a function that accepts a transformer object and returns a transformer object
// transformer object simply wraps reducing function (under "@@transducer/step" property)
// here is how to convert transducer taking reducign funciton, to tranducer taking transformer object:
const makeRamdaTransducer = transducer => nextTransformer => {
  return Object.assign({}, nextTransformer, {
    '@@transducer/step': transducer(nextTransformer['@@transducer/step'])
  })
};

console.log(
  R.into([], makeRamdaTransducer(incrementAndFilterEven), [1,2,3,4,5])
)


// transducer protocol
//---------------------

// const mapping = f => reducing => (acc, value) => {
//   return reducing(acc, f(value))
// }

var mapping2 = function(f) {
  return function(transformer) {
      return Map(f, transformer);
  };
};

var Map = function(f, transformer) {
  return {
     "@@transducer/init": function() { 
         return transformer["@@transducer/init"](); 
     },
     "@@transducer/result": function(result) { 
         return transformer["@@transducer/result"](result); 
     },
     "@@transducer/step": function(acc, value) {
         return transformer["@@transducer/step"](acc, f(value)); 
     }
  };
};

var filtering2 = function(predicate) {
  return function(transformer) {
      return Filter(predicate, transformer);
  };
};

var Filter = function(predicate, transformer) {
  return {
     "@@transducer/init": function() { 
         return transformer["@@transducer/init"](); 
     },
     "@@transducer/result": function(result) { 
         return transformer["@@transducer/result"](result); 
     },
     "@@transducer/step": function(acc, value) {
         return predicate(value) ? transformer["@@transducer/step"](acc, value) : acc; 
     }
  };
};

const mapAndFilter = R.compose(mapping2(x => x + 1), filtering2(x => x % 2 === 0))

console.log(
  R.transduce(mapAndFilter, R.flip(R.append), [], [1,2,3,4,5])
)

// or using into
console.log(
  R.into([], mapAndFilter, [1,2,3,4,5])
)
