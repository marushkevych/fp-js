'use strict';
let R = require('ramda');

function buyCoffee(cc){
  let cup = Coffee(10);
  return [cup, Charge(cc, cup.price)];
}

function combine(charge1, charge2){
  if(!charge1) return charge2;

  if(charge1.cc === charge2.cc){
    return Charge(charge1.cc, charge1.amount + charge2.amount);
  }
  throw new Error('Can not combine charges with different CCs');
}

function buyCoffees(cc, n){
  let purchases = R.times(()=>buyCoffee(cc), n);
  let unzipped = R.transpose(purchases)
  return [
      unzipped[0],
      R.reduce(combine, null, unzipped[1])
  ]
}

function Coffee(price){
  return {
    price
  };
}

function Charge(cc, amount){
  return {
    cc,
    amount
  };
}

function CredirCard(id){
  return {id};
}

let groupByCC = R.groupBy( R.path(['cc', 'id']));

function coalesce(charges){
  let grouped =  R.values(groupByCC(charges));
  return grouped.map(R.reduce(combine, null))
}

//let result = buyCoffee(cc);
//console.log(result)
let cc = CredirCard(123);
let purchases1 = buyCoffees(cc, 1);
console.log('purchases1', purchases1)

let purchases2 = buyCoffees(cc, 2);
console.log('purchases2', purchases2)

let purchases3 = buyCoffees(CredirCard(456), 3);
console.log('purchases3', purchases3)

let coalesced = coalesce([purchases1[1], purchases2[1], purchases3[1]]);
console.log('coalesced', coalesced)
