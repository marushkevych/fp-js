import fs from 'fs'

const output = fs.readFileSync('data.txt', 'utf8')
	.trim()
	.split('\n')
	.map( s => s.split('\t'))
	.reduce((res, item) => {
		let items = res[item[0]] || (res[item[0]] = [])
		items.push({
			name: item[1],
			price: item[2],
			quantity: item[3]
		})
		return res;
	}, {})

console.log(output)