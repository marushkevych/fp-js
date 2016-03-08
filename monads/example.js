var person = {
    "name":"Homer Simpson", 
    "address": {
        "street":"123 Fake St.",
        "city":"Springfield",
        state:'New York'
    }
};


//if (person != null && person["address"] != null) {
//    var state = person["address"]["state"];
//    if (state != null) {
//        console.log(state);
//    }
//    else {
//        console.log("State unknown");
//    }
//}




function Maybe(value){
    console.log('maybe called with', value)

    value = value || "unknown";
    
    return {
        bind: function(f){
            // execute provided callback
            var newValue = f(value);

            // wrap result in new monad (chain)
            return Maybe(newValue);
        }
    };
}

Maybe(person).bind(function(person){
    return person.address;
}).bind(function(address){
    return address.state;
}).bind(console.log);



// Three laws of monad:
// --------------------
var x = 5;
var fn = function(n){return n + 1;};
var gn = function(n){return n + 2;};

//Left identity
Maybe(x).bind(fn) == Maybe(fn(x)); // for all x, fn

Maybe(x).bind(fn).bind(console.log);
Maybe(fn(x)).bind(console.log);

//Right identity
Maybe(x).bind(function(x){return x;}) == Maybe(x); // for all x

Maybe(x).bind(function(x){return x;}).bind(console.log);
Maybe(x).bind(console.log);

//Associativity
Maybe(x).bind(fn).bind(gn) == Maybe(x).bind(function(x) {
  return gn(fn(x));
}); // for all x, fn, gn

Maybe(x).bind(fn).bind(gn).bind(console.log);
Maybe(x).bind(function(x) {
  return gn(fn(x));
}).bind(console.log);


Maybe(x).bind(Maybe).bind(function(x){
    x.bind(console.log)
});

console.log(Maybe(x) == Maybe(x).bind(Maybe));