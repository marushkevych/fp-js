// Given array of Band objects,
// transform each band to
// - replace country with Canada
// - remove dots from band name
// - capitalize band name
// - strip all the other fields

const bands = [
  {'name': 'sunset rubdown', 'country': 'UK', 'active': false},
  {'name': 'women', 'country': 'Germany', 'active': false},
  {'name': 'a silver mt. zion', 'country': 'Spain', 'active': true}
]

const updateCountry = transform('country', () => 'Canada' )
const removeDotsFromName = transform('name', name => name.replace('.', ''))
const capitalizeName = transform('name', titleCase)

const result = bands.map(compose(updateCountry,
                       removeDotsFromName,
                       capitalizeName
                    ))


console.log(result)


function titleCase(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function compose(...fs) {
  return function(val) {
    return fs.reduce((acc, f) => {
      return f.call(null, acc)
    }, val)
  }
}

function transform (key, fn) {
  return function (obj) {
    return assign(obj, key, fn.call(null, obj[key]))
  }
}

function assign(obj, key, value) {
  const copy = Object.assign({}, obj)
  copy[key] = value
  return copy
}
