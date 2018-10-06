var people = [
  {'name': 'Mary', 'height': 160},
  {'name': 'Isla', 'height': 80},
  {'name': 'Sam'}
]

console.log(averageHeight(people))

function averageHeight(people) {

  var heights = people
    .filter(getHeight)
    .map(getHeight)

  if(heights.length > 0) {
    return heights.reduce(function(acc, val) {
      return acc + val
    })/heights.length
  }

}


function getHeight(person) {
  return person.height
}
