
function runStepOfRace(state) {
  return {
    carPositions: moveCars(state.carPositions),
    time: state.time -1
  }
}

function moveCars(carPositions) {
  return carPositions.map( position => Math.random() > 0.3 ? position + 1 : position)
}

function outputCar(position, acc) {
  acc = acc || ''
  if(position === 0) {
    return acc + '\n'
  }
  return outputCar(position - 1, acc + '-')
}

// dirty functions

function paint(carPositions) {
  carPositions.forEach(position => process.stdout.write(outputCar(position)))
  process.stdout.write('\n')
}

function play(state) {
  paint(state.carPositions)
  if(state.time) play(runStepOfRace(state))
}

// start

play({
  time: 5,
  carPositions:[1, 1, 1]
})
